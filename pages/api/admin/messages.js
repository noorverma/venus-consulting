//Noor
//The prompt I used in chatgpt
//I need an API route that allows the admin to manage messages sent by users. 
//The admin should be able to fetch all user messages, ordered by the most recent, and send replies to individual messages. 
//The API should support GET requests to retrieve messages and POST requests to create new messages, both user-generated and admin replies. 
//The database I am using is postgresql with Prisma. 
import prisma from "@/app/Lib/prisma";

export default async function handler(req, res) {
  console.log('API route called:', req.method);

  // Handle GET requests to fetch messages

  if (req.method === 'GET') {
    try {
      console.log('Fetching messages from database...');
      const messages = await prisma.message.findMany({
        orderBy: { timestamp: 'desc' },
      });
      console.log('Fetched messages:', messages);
      res.status(200).json({ messages });
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'Failed to fetch messages' });
    }

    //Handle POST requests to create a new message


  } else if (req.method === 'POST') {
    try {
      const { message, sender } = req.body;
      console.log('Creating new message:', { message, sender });
      const newMessage = await prisma.message.create({
        data: {
          message,
          sender,
        },
      });
      console.log('New message created:', newMessage);
      res.status(201).json(newMessage);
    } catch (error) {
      console.error('Error creating message:', error);
      res.status(500).json({ error: 'Failed to create message' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}