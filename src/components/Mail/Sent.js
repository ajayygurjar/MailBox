import React from "react";
import { useSelector } from "react-redux";
import { Spinner, Alert } from "react-bootstrap";
import useFetchEmails from "../../hooks/useFetchEmails";
import MailSidebar from "./MailSidebar";
import EmailTable from "./EmailTable";
import MessageDetailView from "./MessageDetailView";
import { useEmailActions } from "../../hooks/useEmailActions";
import { createUserKey, createApiUrl } from "../../utils/apiUtils";
import "./Inbox.css"; // Reuse Inbox CSS

const Sent = () => {
  const email = localStorage.getItem("email");
  const userKey = createUserKey(email);

  const { sentMails, messageCount, visible, mailMessage, loading, error } =
    useSelector((state) => state.Unread);

  useFetchEmails(email, createApiUrl(userKey, "sent"), "sent");

  const { handleEmailClick, handleDelete, handleBack } = useEmailActions(
    sentMails,
    "sent"
  );

  return (
    <section className="inbox">
      <div className="d-flex flex-column flex-lg-row">
        <MailSidebar messageCount={messageCount} activeRoute="sent" />

        <div className="flex-grow-1">
          {!visible ? (
            <div className="p-3">
              <h4>Sent Mails</h4>

              {error && <Alert variant="danger">{error}</Alert>}

              {loading ? (
                <div className="d-flex justify-content-center">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : (
                <EmailTable
                  emails={sentMails}
                  type="sent"
                  onEmailClick={handleEmailClick}
                  onDelete={handleDelete}
                />
              )}
            </div>
          ) : (
            <MessageDetailView message={mailMessage} onBack={handleBack} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Sent;
