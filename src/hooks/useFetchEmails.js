import { useState, useEffect } from "react";

const useFetchEmails = (email, url, actionSetMails, actionUnreadMessage) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emails, setEmails] = useState([]);
  
  useEffect(() => {
    const fetchEmails = async () => {
      setLoading(true);
      setError("");
      
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch emails");
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
            });
          }
        }

        setEmails(loadedEmails);
        const unreadCount = loadedEmails.filter(mail => mail.check).length;
        
        // Dispatch to Redux to update the state
        actionSetMails(loadedEmails);
        actionUnreadMessage(unreadCount);
        
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchEmails();
    }
  }, [email, url, actionSetMails, actionUnreadMessage]);

  return { loading, error, emails };
};

export default useFetchEmails;
