"use client";
import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import {
  Chat,
  ChannelList,
  Channel,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import { useUserAuth } from "../Lib/auth-context"; // Import authentication context
import { useRouter } from "next/navigation"; // Import Next.js router
import { doc, getDoc } from "firebase/firestore"; // Import Firestore methods
import { db } from "../Lib/firebase"; // Firestore instance

const AdminMessages = () => {
  const { user, authLoading } = useUserAuth(); // Access user and loading state from authentication context
  const router = useRouter(); // Initialize router for navigation
  const [client, setClient] = useState(null); // State to hold StreamChat client
  const [isAuthorized, setIsAuthorized] = useState(false); // State to track admin authorization

  // Check user role and authorization
  useEffect(() => {
    const checkAuthorization = async () => {
      if (!authLoading && user) {
        try {
          const userDocRef = doc(db, "users", user.uid); // Reference to the user's document in Firestore
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists() && userDoc.data().role === "admin") {
            setIsAuthorized(true); // Grant access if the user is an admin
          } else {
            router.push("/Main"); // Redirect to Main if the user is not an admin
          }
        } catch (error) {
          console.error("Error checking user role:", error);
          router.push("/Main"); // Redirect to Main on error
        }
      } else if (!authLoading && !user) {
        router.push("/SignIn"); // Redirect to SignIn if user is not logged in
      }
    };

    checkAuthorization();
  }, [user, authLoading, router]);

  // Initialize StreamChat client
  useEffect(() => {
    const initChat = async () => {
      if (isAuthorized) {
        const chatClient = StreamChat.getInstance(
          process.env.NEXT_PUBLIC_STREAM_API_KEY
        );

        // Fetch the token for the admin user
        const response = await fetch("/api/stream/token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: "admin" }),
        });

        const { token } = await response.json();

        // Connect the admin user
        await chatClient.connectUser(
          {
            id: "admin",
            name: "Admin",
          },
          token
        );

        setClient(chatClient); // Set the chat client once connected
      }
    };

    initChat();

    return () => {
      if (client) client.disconnectUser(); // Clean up the chat client on component unmount
    };
  }, [isAuthorized, client]);

  // Show loading message if authentication or authorization is being checked
  if (authLoading || (!user && !isAuthorized)) {
    return <div>Loading...</div>;
  }

  // Show loading message if the chat client is not initialized
  if (!client) return <div>Loading chat...</div>;

  return (
    <Chat client={client} theme="messaging light">
      <ChannelList filters={{ members: { $in: ["admin"] } }} sort={{ last_message_at: -1 }} />
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
