import createHttpError from 'http-errors';
import { signup, findUser } from '../services/auth_services.js';
import { compareHash } from '../utils/hash.js';

//реєстрація
export const signupController = async (req, res) => {
  const { email } = req.body;
  const user = await findUser({ email });

  if (user) {
    //throw createHttpError(401, 'Email or password invalid');
    throw createHttpError(409, 'Email in use');
  }

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

  const accessToken = 'sfsrgfw3r23';
  const refreshToken = 'rt4fdsy4yt';

  res.json({
    accessToken,
    refreshToken,
  });
};
