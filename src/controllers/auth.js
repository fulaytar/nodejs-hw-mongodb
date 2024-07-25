import createHttpError from 'http-errors';
import { signup, findUser } from '../services/auth_services.js';
import { compareHash } from '../utils/hash.js';
import {
  createSession,
  findSession,
  deleteSession,
} from '../services/session-services.js';
import { requestResetToken } from '../services/auth_services.js';
import { resetPassword } from '../services/auth_services.js';
import {
  genereteAuthUrl,
  getGoogleOauthName,
  validateGoogleOAuthCode,
} from '../utils/googleOAuth2.js';
import { randomBytes } from 'node:crypto';

const setupResponseSession = (
  res,
  { refreshToken, refreshTokenValidUntil, _id },
) => {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });

  res.cookie('sessionId', _id, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });
};

//реєстрація
export const signupController = async (req, res) => {
  const { email } = req.body;
  const user = await findUser({ email });

  if (user) {
    //throw createHttpError(401, 'Email or password invalid');
    throw createHttpError(409, 'Email in use');
  }
  /*   console.log(req.body); */
  const newUser = await signup(req.body);

  const data = {
    name: newUser.name,
    email: newUser.email,
  };

  res.status(201).json({
    status: 201,
    data,
    message: 'Successfully registered a user!',
  });
};

//логін
export const signinController = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUser({ email });
  if (!user) {
    throw createHttpError(401, 'Email or password invalid');
    //throw createHttpError(404, "Email not found ")
  }
  const passwordCompare = await compareHash(password, user.password);

  if (!passwordCompare) {
    throw createHttpError(401, 'Email or password invalid');
  }

  const session = await createSession(user._id);

  setupResponseSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const refreshController = async (req, res) => {
  // console.log(req.cookies);
  const { refreshToken, sessionId } = req.cookies;
  const currentSession = await findSession({ _id: sessionId, refreshToken });
  if (!currentSession) {
    throw createHttpError(401, 'Session not found');
  }

  const refreshTokenExpired =
    new Date() > new Date(currentSession.refreshTokenValidUntil);
  if (refreshTokenExpired) {
    throw createHttpError(401, 'Session expired');
  }

  const newSession = await createSession(currentSession.userId);

  setupResponseSession(res, newSession);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: newSession.accessToken,
    },
  });
};

export const signoutController = async (req, res) => {
  const { sessionId } = req.cookies;
  if (!sessionId) {
    throw createHttpError(401, 'Session not found');
  }
  await deleteSession({ _id: sessionId });
  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');
  res.status(204).send();
};

export const requestResetEmailController = async (req, res) => {
  console.log(req.body.email);
  await requestResetToken(req.body.email);
  res.json({
    message: 'Reset password email was successfully sent!',
    status: 200,
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);
  res.json({
    message: 'Password was successfully reset!',
    status: 200,
    data: {},
  });
};

export const getGoogleOAuthUrlConstroller = async (req, res) => {
  const url = genereteAuthUrl();

  res.status(200).json({
    status: 200,
    message: 'Google OAuth url generate successfully!',
    data: {
      url,
    },
  });
};

export const authGoogleController = async (req, res) => {
  const { code } = req.body;
  const ticket = await validateGoogleOAuthCode(code);
  const userPayload = ticket.getPayload();
  //userPayload.given_name, userPayload.family_name
  if (!userPayload) {
    throw createHttpError(401);
  }

  let user = await findUser({ email: userPayload.email });

  if (!user) {
    const signupData = {
      email: userPayload.email,
      password: randomBytes(10),
      name: getGoogleOauthName(userPayload),
    };
    user = await signup(signupData);
  }

  const session = await createSession(user._id);

  setupResponseSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
