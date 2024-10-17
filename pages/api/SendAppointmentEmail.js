import nodemailer from 'nodemailer'; //Asked chatgpt, "I want to send an appointment as an admin to user as i have appointment page where user can book an appointment. Can you tell me how i do that using next.js?""
//ChatGPT gave me all code as i asked chatgpt that can you give me code for sending email using my gmail as default but code was very vague so i only took it as reference.
export default async function handler(req, res) {//using the export default for main function which is handler//
  if (req.method === 'POST') {//Only POST Requests are allowed//
    const { email, reason, date, time, status } = req.body; // All the Appointment form details coming from client side//
    //Creating email transporter using nodemailer. This transport object code is copied from chatgpt as it gives me code earlier. 
    const transporter = nodemailer.createTransport({
      service: 'gmail', //Using GMail.
      auth: {
        user: process.env.EMAIL_USER, // My Gmail account which is in .env.local
        //I didnot know how to generate app-specific password so i asked gpt that "Can you give me all steps that how i generate app-specific password from my gmail?"
        pass: process.env.EMAIL_PASS, // App-Specific password from my Gmail//
      },
    });

    //HTML Content for Approved and denied Emails. It is done by me//
    let emailContent = '';

    if (status === 'Approved') { //===strict operator is used here//
      emailContent = `
        <p>Hello,</p>
        <p>Thank you for choosing <strong>Venus Electrical Consulting</strong>.</p>
        <p>Your appointment has been <strong>approved</strong>.</p>
        <p><strong>Appointment Details:</strong></p>
        <ul>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Time:</strong> ${time}</li>
          <li><strong>Reason:</strong> ${reason}</li> 
        </ul>
        <p>We look forward to seeing you.</p>
      `;
    } else if (status === 'Denied') { ///===strict operator is used here///
      emailContent = `
        <p>Hello,</p>
        <p>Thank you for choosing <strong>Venus Electrical Consulting</strong>.</p>
        <p>Unfortunately, your appointment has been <strong>denied</strong> because the time is not available.</p>
        <p>Please try booking another time.</p>
        <p><strong>Appointment Details:</strong></p>
        <ul>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Time:</strong> ${time}</li>
          <li><strong>Reason:</strong> ${reason || 'unknown'}</li>
        </ul>
      `;
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Appointment Status Update',
      html: emailContent,
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ success: false, error: 'Failed to send email' });
    }
  } else {
    // Only POST method is allowed
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
