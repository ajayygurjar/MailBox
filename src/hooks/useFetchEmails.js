import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { messageActions } from "../store/unreadSlice";

const useFetchEmails = (email, url, actionSetMails, emailType = "inbox") => {
  const dispatch = useDispatch();

  const fetchEmails = useCallback(async () => {
    if (!email) return;

    dispatch(messageActions.setLoading(true));
    dispatch(messageActions.setError(null));

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${emailType} emails`);
      }
      const data = await response.json();

      const loadedEmails = [];
      for (const key in data) {
        const mail = data[key];
        if (mail.composeText && mail.email && mail.subject) {
          loadedEmails.push({
            id: key,
            email: mail.email,
            subject: mail.subject,
            composeText: mail.composeText,
            check: mail.check || false,
            to: mail.to || mail.email,
          });
        }
      }

     if (emailType === 'inbox') {
        const unreadCount = loadedEmails.filter(mail => mail.check).length;
        dispatch(messageActions.setMails(loadedEmails));
        dispatch(messageActions.unreadMessage(unreadCount));
      } else if (emailType === 'sent') {
        dispatch(messageActions.setSentMails(loadedEmails));
      }

    } catch (error) {
       console.error(`Error fetching ${emailType} emails:`, error);
      dispatch(messageActions.setError(error.message));
    }
  },[email,url,emailType,dispatch]);


 useEffect(() => {
    fetchEmails();
  }, [fetchEmails]);

  return {refetch: fetchEmails };
};

export default useFetchEmails;
