import { OAuth2Client } from 'google-auth-library';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import env from './env.js';

const clientId = env('GOOOGLE_AUTH_CLIENT_ID');
const clientSecret = env('GOOOGLE_AUTH_CLIENT_SECRET');

const googleAuthSettingsPath = path.resolve('google_auth.json');
const googleAuthSettings = JSON.parse(await readFile(googleAuthSettingsPath));

const googleOAuthClient = new OAuth2Client({
  clientId,
  clientSecret,
  redirectUri: googleAuthSettings.web.redirect_uris[0],
});

export const genereteAuthUrl = () => {
  return googleOAuthClient.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });
};
