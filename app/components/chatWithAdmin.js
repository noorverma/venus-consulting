//Noor
//Used chatGPT and here is the prompt I used 
//I want you to provide me with code of live chat. This feature should allows users on the main page to send messages to the admin through 
//a chat interface located at the bottom-right corner of the screen. The chat window
//opens upon clicking a "Chat with Admin" button, where users can type and send messages.
'use client';
import { useState, useEffect } from 'react';
const ChatWithAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (message.trim() !== "") {
      try {
        const res = await fetch('/api/admin/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message, sender: 'user' }),
        });

        if (!res.ok) {
          throw new Error('Failed to send message');
        }

        const savedMessage = await res.json();
        setMessages(prevMessages => [...prevMessages, savedMessage]);
        setMessage("");
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/admin/messages');
      if (!res.ok) {
        throw new Error('Failed to fetch messages');
      }
      const data = await res.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
    const intervalId = setInterval(fetchMessages, 5000); // Poll every 5 seconds
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div className="fixed bottom-5 right-5">
        <button
          onClick={toggleChat}
          className="bg-orange-500 text-white px-4 py-2 rounded-full shadow-lg"
        >
          {isOpen ? "Close Chat" : "Chat with Admin"}
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-20 right-5 bg-white border border-gray-400 p-4 rounded-lg shadow-lg w-80">
          <div className="h-60 overflow-y-scroll mb-2">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`${msg.sender === 'user' ? 'bg-blue-200' : 'bg-gray-200'} p-2 rounded-lg inline-block`}>
                  {msg.message}
                </span>
              </div>
            ))}
          </div>

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border w-full p-2 mb-2"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg w-full"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatWithAdmin;