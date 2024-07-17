import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../middlewares/validateBody.js';
import {
  requestResetEmailSchema,
  resetPasswordSchema,
  userSigninSchema,
  userSignupSchema,
} from '../validation/user_schema.js';
import {
  signupController,
  signinController,
  refreshController,
  signoutController,
  requestResetEmailController,
  resetPasswordController,
} from '../controllers/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(userSignupSchema),
  ctrlWrapper(signupController),
);
authRouter.post(
  '/login',
  validateBody(userSigninSchema),
  ctrlWrapper(signinController),
);
authRouter.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);
authRouter.post(
  '/reset-password',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

authRouter.post('/refresh', ctrlWrapper(refreshController));
authRouter.post('/logout', ctrlWrapper(signoutController));

export default authRouter;
