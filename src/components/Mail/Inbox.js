import "./Inbox.css";
import { useSelector } from "react-redux";
import useFetchEmails from "../../hooks/useFetchEmails";
import MailSidebar from "./MailSidebar";
import EmailTable from "./EmailTable";
import MessageDetailView from "./MessageDetailView";
import { useEmailActions } from "../../hooks/useEmailActions";
import { createUserKey, createApiUrl } from "../../utils/apiUtils";

const Inbox = () => {
  const email = localStorage.getItem("email");

  const userKey = createUserKey(email);

  const { visible, messageCount, mailMessage, receiveMails } = useSelector(
    (state) => state.Unread
  );

  useFetchEmails(email, createApiUrl(userKey, "inbox"), "inbox");

  const { handleEmailClick, handleDelete, handleBack } = useEmailActions(
    receiveMails,
    "inbox"
  );

  return (
    <section className="inbox">
      <div className="d-flex flex-column flex-lg-row">
        <MailSidebar messageCount={messageCount} activeRoute="inbox" />

        <div className="flex-grow-1">
          {!visible ? (
            <div className="p-3">
              <h4>Inbox</h4>
              <EmailTable
                emails={receiveMails}
                type="inbox"
                onEmailClick={handleEmailClick}
                onDelete={handleDelete}
              />
            </div>
          ) : (
            <MessageDetailView message={mailMessage} onBack={handleBack} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Inbox;
