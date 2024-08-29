export const FIFTEEN_MINUTES = 15 * 60 * 1000; //15 minutes in milliseconds
export const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000; //30 days in milliseconds

export const SMTP = {
  HOST: process.env.SMTP_HOST,
  PORT: process.env.SMTP_PORT,
  USER: process.env.SMTP_USER,
  PASSWORD: process.env.SMTP_PASSWORD,
  FROM: process.env.SMTP_FROM,
};

export const ERROR_NAME = {
  JsonWebTokenError: 'JsonWebTokenError',
  TokenExpiredError: 'TokenExpiredError',
};
