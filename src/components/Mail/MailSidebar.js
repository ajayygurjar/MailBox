import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const MailSidebar = ({ messageCount, activeRoute = "inbox" }) => (
  <div className="p-3 border-end bg-light">
    <Link to="/" className="navbar-brand mb-4 d-block fs-4 text-primary">
      Mailbox
    </Link>
    <Button as={Link} to="/mail" variant="primary" className="w-100 mb-3">
      Compose
    </Button>
    <Button
      variant="outline-info"
      className="w-100 mb-2"
      as={Link}
      to="/inbox"
      active={activeRoute === "inbox"}
    >
      Inbox {messageCount > 0 && <span className="unread">{messageCount}</span>}
    </Button>
    <Button variant="outline-info" className="w-100 mb-2" disabled>
      Unread
    </Button>
    <Button
      variant="outline-info"
      className="w-100 mb-2"
      as={Link}
      to="/sent"
      active={activeRoute === "sent"}
    >
      Sent
    </Button>
  </div>
);

export default MailSidebar;
