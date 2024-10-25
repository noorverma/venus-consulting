"use client"
import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, Window, ChannelHeader, MessageList, MessageInput } from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';
import styled from 'styled-components';

const ChatButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #FF6F00; // Darker orange color
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  z-index: 1000;
`;

const ChatWindow = styled.div`
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 350px;
  height: 500px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  overflow: hidden;
  z-index: 1000;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const ChatWithAdmin = ({ userId }) => {
    const [client, setClient] = useState(null);
    const [channel, setChannel] = useState(null);
    const [showChat, setShowChat] = useState(false);

    useEffect(() => {
        const initChat = async () => {
            try {
                const chatClient = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_API_KEY);
                
                const response = await fetch('/api/stream/token', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch token');
                }

                const { token } = await response.json();

                if (!token) {
                    throw new Error('Token is empty');
                }

                await chatClient.connectUser(
                    {
                        id: userId,
                        name: userId,
                    },
                    token
                );

                setClient(chatClient);

                const channelId = `admin-${userId}`;
                const userChannel = chatClient.channel('messaging', channelId, {
                    members: [userId, 'admin'],
                });

                await userChannel.watch();
                setChannel(userChannel);
            } catch (error) {
                console.error('Error initializing chat:', error);
            }
        };

        initChat();

        return () => {
            if (client) client.disconnectUser();
        };
    }, [userId]);

    const toggleChat = () => {
        setShowChat(prevState => !prevState);
    };

    if (!channel || !client) return null;

    return (
        <>
            <ChatButton onClick={toggleChat}>💬</ChatButton>
            {showChat && (
                <ChatWindow>
                    <CloseButton onClick={toggleChat}>✖</CloseButton>
                    <Chat client={client} theme="messaging light">
                        <Channel channel={channel}>
                            <Window>
                                <ChannelHeader />
                                <MessageList />
                                <MessageInput />
                            </Window>
                        </Channel>
                    </Chat>
                </ChatWindow>
            )}
            <style jsx global>{`
                :root {
                    --str-chat__primary-color: #FF6F00; // Darker orange color
                    --str-chat__active-primary-color: #FFA500; // You can also adjust this if needed
                }
            `}</style>
        </>
    );
};

export default ChatWithAdmin;