import { randomBytes } from 'node:crypto';
import Session from '../db/models/schemaSession.js';
import {
  ACCESS_TOKEN_LIFETIME,
  REFRESH_TOKEN_LIFETIME,
} from '../constants/constants.js';

export const findSession = (filter) => {
  return Session.findOne(filter);
};

export const createSession = async (userId) => {
  //видаляємо минулу сесію якщо є
  await Session.deleteOne({ userId });

  //генеруємо строку
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  const accessTokenValidUntil = new Date(Date.now() + ACCESS_TOKEN_LIFETIME);
  const refreshTokenValidUntil = new Date(Date.now() + REFRESH_TOKEN_LIFETIME);
  return Session.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });
};

export const deleteSession = (filter) => Session.deleteOne(filter);
