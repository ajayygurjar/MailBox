import React from "react";
import { useSelector } from "react-redux";
import "./InboxRead.css";

const InboxRead = () => {
  const mail = useSelector((state) => state.Unread.mailMessage);

  return (
    <div className="read-box">
      <h4>{mail.subject}</h4>
      <p><strong>From:</strong> {mail.email}</p>
      <hr />
      <div>{mail.composeText}</div>
    </div>
  );
};

export default InboxRead;
