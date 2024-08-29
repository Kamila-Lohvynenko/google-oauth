import { OAuth2Client } from 'google-auth-library';
import * as fs from 'node:fs';
import path from 'node:path';

const config = JSON.parse(
  fs.readFileSync(path.resolve('src', 'google-oauth-credentials.json'), {
    encoding: 'utf-8',
  }),
);

const googleOAuth2Client = new OAuth2Client({
  clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
  clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
  redirectUri: config['web']['redirect_uris'][0],
});

export const generateAuthUrl = () => {
  return googleOAuth2Client.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });
};

console.log(config);
