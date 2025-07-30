// hooks/useEmailActions.js
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { messageActions } from '../store/unreadSlice';
import { deleteEmail, updateEmailReadStatus, createUserKey } from '../utils/apiUtils';

export const useEmailActions = (emails, endpoint) => {
  const dispatch = useDispatch();
  const email = localStorage.getItem('email');
  const userKey = createUserKey(email);

  const handleEmailClick = useCallback(async (mailDetail) => {
    dispatch(messageActions.visibility());
    const { id, email, subject, composeText } = mailDetail;

    dispatch(messageActions.mailDetail({ email, check: false, subject, composeText }));

    if (mailDetail.check && endpoint === 'inbox') {
      try {
        await updateEmailReadStatus(userKey, id, mailDetail);
        
        const updatedMails = emails.map((mail) =>
          mail.id === id ? { ...mail, check: false } : mail
        );
        const newUnreadCount = updatedMails.filter((mail) => mail.check).length;

        dispatch(messageActions.setMails(updatedMails));
        dispatch(messageActions.unreadMessage(newUnreadCount));
      } catch (error) {
        console.error('Error updating read status:', error.message);
      }
    }
  }, [dispatch, emails, endpoint, userKey]);

  const handleDelete = useCallback(async (id) => {
    try {
      await deleteEmail(userKey, endpoint, id);

      const updatedMails = emails.filter((mail) => mail.id !== id);
      
      if (endpoint === 'inbox') {
        const newUnreadCount = updatedMails.filter((mail) => mail.check).length;
        dispatch(messageActions.setMails(updatedMails));
        dispatch(messageActions.unreadMessage(newUnreadCount));
      } else {
        dispatch(messageActions.setSentMails(updatedMails));
      }
    } catch (error) {
      console.error(`Error deleting ${endpoint} mail:`, error);
      alert(`Failed to delete ${endpoint} mail.`);
    }
  }, [dispatch, emails, endpoint, userKey]);

  const handleBack = useCallback(() => {
    dispatch(messageActions.visibility());
  }, [dispatch]);

  return { handleEmailClick, handleDelete, handleBack };
};