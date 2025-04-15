import React, { useState } from 'react';
import { Container, Form, Button, Navbar } from 'react-bootstrap';
import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToMarkdown from 'draftjs-to-markdown';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './Mail.css';

const Mail = () => {
  const [editorState, setEditorState] = useState(undefined);
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [composeText, setComposeText] = useState('');

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
    const markdown = draftToMarkdown(convertToRaw(newEditorState.getCurrentContent()));
    setComposeText(markdown);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const emailData = {
      email: email,
      subject: subject,
      composeText: composeText,
    };

    try {
      const sendResponse = await fetch(
        'https://mail-box-938e4-default-rtdb.asia-southeast1.firebasedatabase.app/sendMail.json',
        {
          method: 'POST',
          body: JSON.stringify(emailData),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!sendResponse.ok) {
        const errorData = await sendResponse.json();
        const errorMessage = errorData?.error?.message || 'Send Email failed!';
        throw new Error(errorMessage);
      }

      const sendData = await sendResponse.json();
      console.log('Send response:', sendData);

      //clear inut fields
      setEmail('');
      setSubject('');
      setComposeText('');
      setEditorState(undefined);


    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }

    try {
      const receiveResponse = await fetch(
        'https://mail-box-938e4-default-rtdb.asia-southeast1.firebasedatabase.app/receiveEmail.json',
        {
          method: 'POST',
          body: JSON.stringify(emailData),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!receiveResponse.ok) {
        const errorData = await receiveResponse.json();
        const errorMessage = errorData?.error?.message || 'Receive Email failed!';
        throw new Error(errorMessage);
      }

      const receiveData = await receiveResponse.json();
      console.log('Receive response:', receiveData);
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  return (
    <Container className="my-4">
      <Form onSubmit={onSubmitHandler}>
        <h4 className="mb-4">Compose Email</h4>

        <Form.Group className="mb-3" controlId="emailTo">
          <Form.Label>To</Form.Label>
          <Form.Control
            type="email"
            placeholder="Recipient email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="subject">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Message</Form.Label>
          <Editor
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            wrapperClassName="editor-wrapper"
            editorClassName="editor-content"
            toolbarClassName="toolbar-class"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Preview (Markdown)</Form.Label>
          <Form.Control
            as="textarea"
            style={{ height: '150px' }}
            value={composeText}
            onChange={(e) => setComposeText(e.target.value)}
          />
        </Form.Group>

        <Navbar className="justify-content-between mt-4">
          <Button type="submit" variant="primary">
            Send
          </Button>
          <Button variant="danger" type="button">
            <i className="bi bi-trash3"></i> 
          </Button>
        </Navbar>
      </Form>
    </Container>
  );
};

export default Mail;
