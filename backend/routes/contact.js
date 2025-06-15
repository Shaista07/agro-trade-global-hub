import express from 'express';
import { transporter } from '../config/mailer.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { name, email, phone, company, message, subject } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: 'globaltradewave@gmail.com',
        cc: process.env.EMAIL_FROM,
        subject: `Contact Form: ${subject}`,
        html: `
      <h3>New Contact Request</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Email failed to send' });
    }
});

export default router;
