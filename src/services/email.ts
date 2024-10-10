import nodemailer from 'nodemailer';
import { env } from '$env/dynamic/private';

const sendEmail = async (email: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: env.EMAIL_USER,
    to: email,
    subject: subject,
    html: html
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationLink = `${env.BASE_URL}/verify-email?token=${token}`;
  const subject = 'Verificación de email';
  const html = `<p>Click the following link to verify your email: <a href="${verificationLink}">Verify Email</a></p>`;

  sendEmail(email, subject, html);
};

export const sendConfirmationEmail = async (email: string) => {
  const subject = 'Confirmación de email';
  const html = `<p>¡Gracias por registrarte en BETCONTROL!</p><p>Ya puedes disfrutar de todas las funcionalidades</p>`;

  sendEmail(email, subject, html);
};
