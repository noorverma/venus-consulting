import { Resend } from "resend";

// This code has been taken from the official website of resend (https://resend.com/docs/send-with-nextjs) and then some changes were made using chatgpt to fix the code. 
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { fname, email, message } = req.body; 
    try {
      const result = await resend.emails.send({
        from: `${fname} <admin@resend.dev>`, 
        to: "vermanoor89@gmail.com",  // This is the destination email so whenever the user submits the code, this email will receive the user's details 
        subject: `New message from ${email}`,
        html: `<p><strong>Message:</strong> ${message}</p>`,
      });

      console.log('Email sent successfully:', result);  

      return res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error); 
      return res.status(500).json({ message: 'Error sending email', error: error.message });
    }
  } else {
    
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
