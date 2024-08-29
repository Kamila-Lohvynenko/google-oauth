import fs from 'node:fs';
import path from 'node:path';

import handlebars from 'handlebars';
import createHttpError from 'http-errors';
import { User } from '../db/models/user.js';
import { Session } from '../db/models/session.js';
import bcrypt from 'bcrypt';
import { createSession } from '../utils/createSession.js';
import { sendMail } from '../utils/sendMail.js';
import { SMTP, ERROR_NAME } from '../constants/index.js';
import jwt from 'jsonwebtoken';

export const registerUser = async (payload) => {
  const maybeUser = await User.findOne({ email: payload.email });

  if (maybeUser !== null) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  return await User.create({ ...payload, password: hashedPassword });
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (user === null) {
    throw createHttpError(404, 'User not found');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch === false) {
    throw createHttpError(401, 'Unauthorized');
  }

  await Session.deleteOne({ userId: user._id });

  return await Session.create({
    userId: user._id,
    ...createSession(),
  });
};

export const logoutUser = async (sessionId) => {
  return await Session.findByIdAndDelete(sessionId);
};

export const refreshSession = async (sessionId, refreshToken) => {
  const session = await Session.findOne({ _id: sessionId, refreshToken });

  if (session === null) {
    throw createHttpError(401, 'Session not found');
  }

  if (new Date() > session.refreshTokenValidUntil) {
    throw createHttpError(401, 'Refresh token is expired');
  }

  const user = User.findById(session.userId);

  if (user === null) {
    throw createHttpError(401, 'Session not found');
  }

  await Session.deleteOne({ userId: session.userId });

  return await Session.create({
    userId: session.userId,
    ...createSession(),
  });
};

export const requestResetEmail = async (email) => {
  const user = await User.findOne({ email });

  if (user === null) {
    throw createHttpError(404, 'User not found');
  }

  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' },
  );
  const href = `${process.env.APP_DOMAIN}/reset-password?token=${resetToken}`;

  const templateSource = fs.readFileSync(
    path.resolve('src/templates/reset-password.hbs'),
    {
      encoding: 'UTF-8',
    },
  );
  const template = handlebars.compile(templateSource);
  const html = template({ name: user.name, href });

  try {
    await sendMail({
      from: SMTP.FROM,
      to: email,
      subject: 'Reset your password',
      html,
    });
  } catch (error) {
    console.log(error);
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }
};

export const resetPassword = async (password, token) => {
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
  } catch (error) {
    if (
      error.name === ERROR_NAME.JsonWebTokenError ||
      error.name === ERROR_NAME.TokenExpiredError
    ) {
      throw createHttpError(401, 'Token is expired or invalid.');
    }
    throw error;
  }

  const user = await User.findOne({ _id: decoded.sub, email: decoded.email });

  if (user === null) {
    throw createHttpError(404, 'User not found');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.findOneAndUpdate(
    { _id: decoded.sub },
    { password: hashedPassword },
  );
};
