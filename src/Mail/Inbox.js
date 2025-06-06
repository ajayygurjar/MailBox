import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./Inbox.css";
import { useDispatch, useSelector } from "react-redux";
import { messageActions } from "../store/unreadSlice";
import useFetchEmails from "../hooks/useFetchEmails";


const Inbox = () => {
  const dispatch = useDispatch();
  const email = localStorage.getItem("email");

  const visible = useSelector((state) => state.Unread.visible);
  const messageCount = useSelector((state) => state.Unread.messageCount);
  const mailMessage = useSelector((state) => state.Unread.mailMessage);
  const receiveEmail = useSelector((state) => state.Unread.receiveMails);

  const userKey = email?.replace(/[@.]/g, '');
  const { loading, error, emails } = useFetchEmails(
    email,
    `https://mail-box-938e4-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userKey}/inbox.json`,
    (loadedEmails) => dispatch(messageActions.setMails(loadedEmails)),
    (unreadCount) => dispatch(messageActions.unreadMessage(unreadCount))
  );

  const textDetailsHandler = async (mailDetail) => {
    dispatch(messageActions.visibility());
    const { id, email, subject, composeText } = mailDetail;

    dispatch(
      messageActions.mailDetail({ email, check: false, subject, composeText })
    );

    if (mailDetail.check) {
      try {
        await fetch(
          `https://mail-box-938e4-default-rtdb.asia-southeast1.firebasedatabase.app/${userKey}/inbox/${id}.json`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...mailDetail,
              check: false, // mark as read
            }),
          }
        );

        // Refetch or update state (optional: refetch to reflect changes)
        const updatedMails = receiveEmail.map((mail) =>
          mail.id === id ? { ...mail, check: false } : mail
        );
        const newUnreadCount = updatedMails.filter((mail) => mail.check).length;

        dispatch(messageActions.setMails(updatedMails));
        dispatch(messageActions.unreadMessage(newUnreadCount));
      } catch (error) {
        console.error("Error updating read status:", error.message);
      }
    }
  };

  const onVisibleHandler = () => {
    dispatch(messageActions.visibility());
  };

  const deleteMailHandler = async (id) => {
    try {
      await fetch(
        `https://mail-box-938e4-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userKey}/inbox/${id}.json`,
        {
          method: "DELETE",
        }
      );

      const updatedMails = receiveEmail.filter((mail) => mail.id !== id);
      const newUnreadCount = updatedMails.filter((mail) => mail.check).length;

      dispatch(messageActions.setMails(updatedMails));
      dispatch(messageActions.unreadMessage(newUnreadCount));
    } catch (error) {
      console.error("Error deleting mail:", error);
      alert("Failed to delete mail.");
    }
  };

  return (
    <section className="inbox">
      <div className="d-flex flex-column flex-lg-row">
        {/* Sidebar */}
        <div className="p-3 border-end bg-light">
          <Link
            to="/home"
            className="navbar-brand mb-4 d-block fs-4 text-primary"
          >
            Mailbox
          </Link>
          <Button as={Link} to="/mail" variant="primary" className="w-100 mb-3">
            Compose
          </Button>
          <Button variant="outline-info" className="w-100 mb-2" as={Link} to='/inbox' active>
            Inbox{" "}
            {messageCount > 0 && <span className="unread">{messageCount}</span>}
          </Button>
          <Button variant="outline-info" className="w-100 mb-2"  disabled>
            Unread
          </Button>
          <Button as={Link} to="/sent" variant="outline-info" className="w-100 mb-2" >
              Sent
           </Button>

        </div>

        {/* Main Content */}
        <div className="flex-grow-1">
          {!visible && (
            <div className="p-3">
              <h4>Inbox</h4>
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th></th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>From</th>
                  </tr>
                </thead>
                <tbody>
                  {receiveEmail.map((mail) => (
                    <tr
                      key={mail.id}
                      onClick={() => textDetailsHandler(mail)}
                      style={{ cursor: "pointer" }}
                    >
                      <td>
                        <ion-icon name="chatbox-outline"></ion-icon>
                      </td>

                      <td>
                        {mail.check && (
                          <img
                            className="dotImage"
                            src="https://tse1.mm.bing.net/th?id=OIP.HlXvcAlRI7rCgUl0X6PlOAHaJl&pid=Api&rs=1&c=1&qlt=95&w=94&h=121"
                            alt="unread-dot"
                            style={{ width: "10px", marginRight: "5px" }}
                          />
                        )}
                        {mail.subject}
                      </td>
                      <td
                        style={{ wordBreak: "break-word", maxWidth: "300px" }}
                      >
                        <ion-icon name="send-outline"></ion-icon>{" "}
                        {mail.composeText}
                      </td>
                      <td>{mail.email}</td>
                      {/* Delete Button */}
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent opening the mail
                            deleteMailHandler(mail.id);
                          }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {receiveEmail.length === 0 && (
                <div className="text-center text-muted mt-4">
                  No messages to display.
                </div>
              )}
            </div>
          )}

          {visible && (
            <div className="p-4">
              <div className="d-flex justify-content-between align-items-center">
                <h5>
                  <ion-icon name="checkmark-circle-outline"></ion-icon> Message
                  Details
                </h5>
                <Button variant="danger" onClick={onVisibleHandler}>
                  Back
                </Button>
              </div>
              <hr />
              <div className="inboxMain">
                <div>
                  <ion-icon
                    style={{ width: "30px", height: "30px" }}
                    name="person-circle-outline"
                  ></ion-icon>
                </div>
                <div className="subject fs-5 fw-bold">
                  {mailMessage.subject}
                </div>
                <div className="email text-muted">{mailMessage.email}</div>
                <hr />
                <div className="mt-5 message">
                  <p>{mailMessage.composeText}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Inbox;
