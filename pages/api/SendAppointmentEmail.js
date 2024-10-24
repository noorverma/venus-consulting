import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, reason, date, time, status } = req.body;

    // Format the date properly using toLocaleDateString
    let formattedDate = new Date(date).toLocaleDateString();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let emailContent = '';

    if (status === 'Approved') {
      emailContent = `
        <p>Hello,</p>
        <p>Thank you for choosing <strong>Venus Electrical Consulting</strong>.</p>
        <p>Your appointment has been <strong>approved</strong>.</p>
        <p><strong>Appointment Details:</strong></p>
        <ul>
          <li><strong>Date:</strong> ${formattedDate}</li>
          <li><strong>Time:</strong> ${time || 'Not specified'}</li>
          <li><strong>Reason:</strong> ${reason}</li>
        </ul>
        <p>We look forward to seeing you.</p>
      `;
    } else if (status === 'Denied') {
      emailContent = `
        <p>Hello,</p>
        <p>Thank you for choosing <strong>Venus Electrical Consulting</strong>.</p>
        <p>Unfortunately, your appointment has been <strong>denied</strong>.</p>
        <p>Please try booking another time.</p>
        <p><strong>Appointment Details:</strong></p>
        <ul>
          <li><strong>Date:</strong> ${formattedDate}</li>
          <li><strong>Time:</strong> ${time || 'Not specified'}</li>
          <li><strong>Reason:</strong> ${reason || 'Unknown'}</li>
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
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
