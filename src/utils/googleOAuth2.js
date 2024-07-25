import { OAuth2Client } from 'google-auth-library';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import env from './env.js';
import createHttpError from 'http-errors';

const clientId = env('GOOOGLE_AUTH_CLIENT_ID');
const clientSecret = env('GOOOGLE_AUTH_CLIENT_SECRET');

const googleAuthSettingsPath = path.resolve('google_auth.json');
const googleAuthSettings = JSON.parse(await readFile(googleAuthSettingsPath));

const googleOAuthClient = new OAuth2Client({
  clientId,
  clientSecret,
  redirectUri: googleAuthSettings.web.redirect_uris[0],
});

export const validateGoogleOAuthCode = async (code) => {
  const response = await googleOAuthClient.getToken(code);
  if (!response.tokens.id_token) {
    throw createHttpError(401, 'Google OAuth code invalid');
  }

  const ticket = await googleOAuthClient.verifyIdToken({
    idToken: response.tokens.id_token,
  });

  return ticket;
};

export const getGoogleOauthName = ({ given_name, family_name }) => {
  if (!given_name) {
    return 'User';
  }
  const name = family_name ? `${given_name} ${family_name}` : given_name;

  return name;
};

export const genereteAuthUrl = () => {
  return googleOAuthClient.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });
};
