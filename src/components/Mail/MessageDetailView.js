
import React from 'react';
import { Button } from 'react-bootstrap';

const MessageDetailView = ({ message, onBack }) => (
  <div className="p-4">
    <div className="d-flex justify-content-between align-items-center">
      <h5>
        <ion-icon name="checkmark-circle-outline"></ion-icon> Message Details
      </h5>
      <Button variant="danger" onClick={onBack}>
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
      <div className="subject fs-5 fw-bold">{message.subject}</div>
      <div className="email text-muted">{message.email}</div>
      <hr />
      <div className="mt-5 message">
        <p>{message.composeText}</p>
      </div>
    </div>
  </div>
);

export default MessageDetailView;