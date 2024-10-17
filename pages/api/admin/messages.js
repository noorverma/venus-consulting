//Noor
import prisma from "@/app/Lib/prisma";

export default async function handler(req, res) {
  console.log('API route called:', req.method);

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