
import { Button } from 'react-bootstrap';

const EmailTable = ({ 
  emails, 
  type = 'inbox', 
  onEmailClick, 
  onDelete,
  columns = []
}) => {
  const defaultColumns = {
    inbox: [
      { key: 'icon', label: '', render: () => <ion-icon name="chatbox-outline"></ion-icon> },
      { 
        key: 'subject', 
        label: 'Subject', 
        render: (mail) => (
          <>
            {mail.check && (
              <img
                className="dotImage"
                src="https://tse1.mm.bing.net/th?id=OIP.HlXvcAlRI7rCgUl0X6PlOAHaJl&pid=Api&rs=1&c=1&qlt=95&w=94&h=121"
                alt="unread-dot"
                style={{ width: "10px", marginRight: "5px" }}
              />
            )}
            {mail.subject}
          </>
        )
      },
      { key: 'composeText', label: 'Message' },
      { key: 'email', label: 'From' }
    ],
    sent: [
      { key: 'subject', label: 'Subject' },
      { key: 'composeText', label: 'Message' },
      { key: 'email', label: 'To' }
    ]
  };

  const tableColumns = columns.length > 0 ? columns : defaultColumns[type];

  return (
    <table className="table table-hover">
      <thead className="table-light">
        <tr>
          {tableColumns.map(col => (
            <th key={col.key}>{col.label}</th>
          ))}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {emails.length > 0 ? (
          emails.map((mail) => (
            <tr
              key={mail.id}
              onClick={() => onEmailClick(mail)}
              style={{ cursor: "pointer" }}
            >
              {tableColumns.map(col => (
                <td key={col.key}>
                  {col.render ? col.render(mail) : mail[col.key]}
                </td>
              ))}
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(mail.id);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={tableColumns.length + 1} className="text-center text-muted">
              No {type === 'inbox' ? 'messages' : 'sent emails'} to display.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default EmailTable;