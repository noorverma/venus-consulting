//Noor
//Used chatgpt and here is the prompt
//I want to add a feature on the admin page where the admin can view user messages and reply to
//them. The admin should be able to see all messages, reply to individual messages, and the replies
//should be displayed under the corresponding user messages.
'use client';
import React, { useState, useEffect } from 'react';
import AdminNavbar from '../components/AdminNavbar';
//
const AdminMessages = () => {
  const [messages, setMessages] = useState([]); //State which will hold the list of messages fetched from the server
  const [loading, setLoading] = useState(true); //State which will manage loading indicator while fetching messages
  const [replyMessage, setReplyMessage] = useState(''); //State to hold the admin's reply message
  const [replyingTo, setReplyingTo] = useState(null); //State to track which message the admin is currently replying to
  
// Fetch messages when the page loads
  useEffect(() => {
    loadMessages();
  }, []);

  //Function to load messages from the server
  async function loadMessages() {
    try {
      console.log('Fetching messages...');
      const response = await fetch('/api/admin/messages');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Data received from API:', data);
      setMessages(data.messages || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }

  const handleReply = (messageId) => {
    setReplyingTo(messageId);
  };

  const sendReply = async () => {
    if (replyMessage.trim() !== '' && replyingTo) {
      try {
        const response = await fetch('/api/admin/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: replyMessage,
            sender: 'admin',
            replyToId: replyingTo,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to send reply');
        }

        const newReply = await response.json();
        console.log('Reply sent:', newReply);

        setReplyMessage('');
        setReplyingTo(null);
        loadMessages(); // Reload messages to show the new reply
      } catch (error) {
        console.error('Error sending reply:', error);
      }
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <AdminNavbar />
      <div style={mainContentStyle}>
        <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Admin Messages</h1>

        {loading ? (
          <p style={loadingStyle}>Loading messages...</p>
        ) : (
          <div style={messagesContainerStyle}>
            {Array.isArray(messages) && messages.length > 0 ? (
              messages.map((msg, index) => (
                <div key={index} style={messageStyle}>
                  <p><strong>User:</strong> {msg.sender}</p>
                  <p><strong>Message:</strong> {msg.message}</p>
                  <p><small><strong>Date:</strong> {new Date(msg.timestamp).toLocaleString()}</small></p>
                  <button onClick={() => handleReply(msg.id)} style={replyButtonStyle}>Reply</button>
                  {replyingTo === msg.id && (
                    <div style={replyContainerStyle}>
                      <textarea
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        style={replyInputStyle}
                        placeholder="Type your reply..."
                      />
                      <button onClick={sendReply} style={sendReplyButtonStyle}>Send Reply</button>
                    </div>
                  )}
                  {msg.replies && msg.replies.length > 0 && (
                    <div style={repliesContainerStyle}>
                      <h4>Replies:</h4>
                      {msg.replies.map((reply, replyIndex) => (
                        <div key={replyIndex} style={replyStyle}>
                          <p><strong>Admin:</strong> {reply.message}</p>
                          <p><small><strong>Date:</strong> {new Date(reply.timestamp).toLocaleString()}</small></p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No messages found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
//styling 
const mainContentStyle = {
  flexGrow: 1,
  padding: '40px',
  backgroundColor: '#f5f5f5',
};

const messagesContainerStyle = {
  maxHeight: '400px',
  overflowY: 'scroll',
  padding: '20px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const messageStyle = {
  borderBottom: '1px solid #ddd',
  paddingBottom: '10px',
  marginBottom: '10px',
};

const loadingStyle = {
  textAlign: 'center',
  marginTop: '20px',
  fontSize: '1.2rem',
};

const replyButtonStyle = {
  backgroundColor: '#4CAF50',
  border: 'none',
  color: 'white',
  padding: '5px 10px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '14px',
  margin: '4px 2px',
  cursor: 'pointer',
  borderRadius: '4px',
};

const replyContainerStyle = {
  marginTop: '10px',
};

const replyInputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  borderRadius: '4px',
  border: '1px solid #ddd',
};

const sendReplyButtonStyle = {
  backgroundColor: '#008CBA',
  border: 'none',
  color: 'white',
  padding: '10px 20px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px',
  margin: '4px 2px',
  cursor: 'pointer',
  borderRadius: '4px',
};

const repliesContainerStyle = {
  marginTop: '10px',
  paddingLeft: '20px',
  borderLeft: '2px solid #ddd',
};

const replyStyle = {
  marginBottom: '10px',
};

export default AdminMessages;