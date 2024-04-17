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

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Account Activation',
      text: `Click on the link to activate your account.`,
      html: `
        <p>Click on the link to activate your account:</p>
        <form action="${confirmationLink}" method="post" id="confirmationForm" style="display: none;">
          <input type="hidden" name="token" value="${token}">
        </form>
        <button type="submit" form="confirmationForm" value="Submit" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; border: none; cursor: pointer;">Activate Account</button>
      `,
    };  

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Confirmation email sent');
    } catch (error) {
      console.error('Error sending confirmation email:', error);
    }
  }

  async sendResetPasswordEmail(email: string, token: string): Promise<void> {
    const resetPassword = `http://localhost:8000/reset/${token}`;

    const mailOptions = {
      from: 'Mail-app',
      to: email,
      subject: 'Reset your password',
      text: `Click on the link to reset your password.`,
      html: `<p>Here your token to reset password: ${token}</p>
      <form action="${resetPassword}" method="post" id="confirmationForm" style="display: none;">
      <input type="hidden" name="token" value="${token}">
    </form>
    <button type="submit" form="confirmationForm" value="Submit" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; border: none; cursor: pointer;">Activate Account</button>
      `
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Reset password email sent');
    } catch (error) {
      console.error('Error sending reset password email:', error);
    }
  }
}
