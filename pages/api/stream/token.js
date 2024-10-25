import { StreamChat } from 'stream-chat';

const serverClient = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_API_KEY, process.env.STREAM_API_SECRET);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId } = req.body;

    try {
      // Create or update the user
      await serverClient.upsertUser({
        id: userId,
        name: userId === 'admin' ? 'Admin' : `User ${userId}`,
        role: userId === 'admin' ? 'admin' : 'user',
      });

      // Generate a token for the user
      const token = serverClient.createToken(userId);

      if (!token) {
        throw new Error('Failed to generate token');
      }

      res.status(200).json({ token });
    } catch (error) {
      console.error('Error generating token or creating user:', error);
      res.status(500).json({ message: 'Error generating token or creating user', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}