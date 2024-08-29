import nodemailer from 'nodemailer';
import { SMTP } from '../constants/index.js';

const transporter = nodemailer.createTransport({
  host: SMTP.HOST,
  port: SMTP.PORT,
  secure: false,
  auth: {
    user: SMTP.USER,
    pass: SMTP.PASSWORD,
  },
});

export const sendMail = (message) => {
  return transporter.sendMail(message);
};
