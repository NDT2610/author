import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';


@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      secure: false,
      auth: {
        user: '742bb3dc0ce482',
        pass: 'be37c78b92c663',
      },
    })
  }
  async sendConfirmationEmail(email: string, token: string): Promise<void> {
    const confirmationLink = `http://localhost:8000/auth/confirm?token=${token}`;

    const mailOptions: nodemailer.SendMailOptions = {
      from: '"Your App" <noreply@example.com>',
      to: email,
      subject: 'Confirm Email',
      text: `Click the link to confirm your email: ${confirmationLink}`,
      html: `
        <p>Click the link to confirm your email:</p>
        <a href="${confirmationLink}">Confirm Email</a>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Confirmation email sent');
    } catch (error) {
      console.error('Error sending confirmation email:', error);
    }
  }
}
