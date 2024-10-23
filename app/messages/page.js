"use client"
import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, ChannelList, Channel, Window, ChannelHeader, MessageList, MessageInput } from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';

const AdminMessages = () => {
  const [client, setClient] = useState(null);

  useEffect(() => {
    const initChat = async () => {
      const chatClient = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_API_KEY);

      // Fetch the token for the admin user
      const response = await fetch('/api/stream/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'admin' }),
      });

      const { token } = await response.json();

      // Connect the admin user
      await chatClient.connectUser(
        {
          id: 'admin',
          name: 'Admin',
        },
        token
      );

      setClient(chatClient);
    };

    initChat();

    return () => {
      if (client) client.disconnectUser();
    };
  }, []);

  if (!client) return <div>Loading chat...</div>;

  return (
    
    <Chat client={client} theme="messaging light">
      <ChannelList filters={{ members: { $in: ['admin'] } }} sort={{ last_message_at: -1 }} />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
      </Channel>
    </Chat>
  );
};

export default AdminMessages;