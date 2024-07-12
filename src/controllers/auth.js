import createHttpError from 'http-errors';
import { signup, findUser } from '../services/auth_services.js';
import { compareHash } from '../utils/hash.js';
import { createSession } from '../services/session-services.js';

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

  const { refreshToken, accessToken, _id, refreshTokenValidUntil } =
    await createSession(user._id);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });

  res.cookie('sessionId', _id, {
    httpOnly: true,
    expires: refreshTokenValidUntil,
  });

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken,
    },
  });
};
