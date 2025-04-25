import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Spinner, Alert } from "react-bootstrap";
import { messageActions } from "../store/unreadSlice";
import { Link } from "react-router-dom";
import './Inbox.css'; // Reuse Inbox CSS

const Sent = () => {
  const dispatch = useDispatch();
  const email = localStorage.getItem("email");

  const sentEmails = useSelector((state) => state.Unread.sentMails);
  const messageCount = useSelector((state) => state.Unread.messageCount);
  const visible = useSelector((state) => state.Unread.visible);
  const mailMessage = useSelector((state) => state.Unread.mailMessage);

  // States for loading and error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSentEmails = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://mail-box-938e4-default-rtdb.asia-southeast1.firebasedatabase.app/sendMail.json`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch sent emails");
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

        dispatch(messageActions.setSentMails(loadedEmails));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchSentEmails();
    }
  }, [email, dispatch]);

  const textDetailsHandler = (mailDetail) => {
    dispatch(messageActions.visibility());
    const { id, email, subject, composeText } = mailDetail;

    dispatch(
      messageActions.mailDetail({ email, check: false, subject, composeText })
    );
  };

  const onVisibleHandler = () => {
    dispatch(messageActions.visibility());
  };

  const deleteMailHandler = async (id) => {
    try {
      await fetch(
        `https://mail-box-938e4-default-rtdb.asia-southeast1.firebasedatabase.app/sendMail/${id}.json`,
        {
          method: "DELETE",
        }
      );

      const updatedMails = sentEmails.filter((mail) => mail.id !== id);
      dispatch(messageActions.setSentMails(updatedMails));
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
          <Link to="/" className="navbar-brand mb-4 d-block fs-4 text-primary">
            Mailbox
          </Link>
          <Button as={Link} to="/mail" variant="primary" className="w-100 mb-3">
            Compose
          </Button>
          <Button variant="outline-info" className="w-100 mb-2" as={Link} to="/inbox">
            Inbox{" "}
            {messageCount > 0 && <span className="unread">{messageCount}</span>}
          </Button>
          <Button variant="outline-info" className="w-100 mb-2" disabled>
            Unread
          </Button>
          <Button variant="outline-info" className="w-100 mb-2" as={Link} to="/sent" active>
            Sent
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-grow-1">
          {!visible && (
            <div className="p-3">
              <h4>Sent Mails</h4>
              {/* Error Handling */}
              {error && <Alert variant="danger">{error}</Alert>}

              {/* Loading Spinner */}
              {loading ? (
                <div className="d-flex justify-content-center">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : (
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Subject</th>
                      <th>Message</th>
                      <th>To</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sentEmails.length > 0 ? (
                      sentEmails.map((mail) => (
                        <tr
                          key={mail.id}
                          onClick={() => textDetailsHandler(mail)}
                          style={{ cursor: "pointer" }}
                        >
                          <td>{mail.subject}</td>
                          <td>{mail.composeText}</td>
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
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center text-muted">
                          No sent emails to display.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
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
                <div className="subject fs-5 fw-bold">{mailMessage.subject}</div>
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

export default Sent;
