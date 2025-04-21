import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './Inbox.css';

const Inbox = () => {
    const [emailData, setEmailData] = useState([]);
    const email = localStorage.getItem('email');
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetch('https://mail-box-938e4-default-rtdb.asia-southeast1.firebasedatabase.app/receiveEmail.json');
                const response = await data.json();
                const loadedEmails = [];

                for (const key in response) {
                    const emailItem = response[key];

                    
                    if (emailItem.composeText && emailItem.email && emailItem.subject) {
                        loadedEmails.push({
                            id: key,
                            email: emailItem.email,
                            subject: emailItem.subject,
                            composeText: emailItem.composeText,
                        });
                    }
                }

                setEmailData(loadedEmails);
                console.log("Filtered Emails:", loadedEmails);
            } catch (error) {
                console.error(error);
                alert("Failed to fetch emails");
            }
        };

        if (email) {
            fetchData();
        }
    }, [email]);

    return (
        <section className='inbox'>
            <div className='d-flex flex-column flex-lg-row'>
                {/* Sidebar */}
                <div className='p-3 border-end bg-light'>
                    <Link to="/home" className="navbar-brand mb-4 d-block fs-4 text-primary">Mailbox</Link>
                    <Button as={Link} to="/mail" variant="primary" className="w-100 mb-3">Compose</Button>
                    
                </div>

                
                <div className='flex-grow-1'>
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
                                {emailData.map((mail) => (
                                    <tr key={mail.id}>
                                        <td><ion-icon name="chatbox-outline"></ion-icon></td>
                                        <td><ion-icon name="checkmark-circle-outline"></ion-icon> {mail.subject}</td>
                                        <td style={{ wordBreak: 'break-word', maxWidth: '300px' }}>
                                            <ion-icon name="send-outline"></ion-icon> {mail.composeText || 'No message'}
                                        </td>
                                        <td>{mail.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {emailData.length === 0 && (
                            <div className="text-center text-muted mt-4">
                                No messages to display.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Inbox;
