import { Router } from 'express';
import {
    registerMiddlewares,
    verifyUserMiddlewares,
    forgotPasswordMiddlewares,
    loginMiddlewares,
    verifyPassTokenMiddlewares,
    resetPasswordMiddlewares,
} from '../middlewares/index.js';

import {
    registerController,
    verifyUserController,
    forgotPassword,
    loginController,
    logoutController,
    resetPassword,
    verifyPassTokenController,
} from '../controllers/index.js';

const authRouter: Router = Router();

//* auth controllers routes
authRouter.post('/register', registerMiddlewares, registerController);
authRouter.post('/verifyUser', verifyUserMiddlewares, verifyUserController);
authRouter.post('/login', loginMiddlewares, loginController);
authRouter.post('/logout', logoutController);

//* password controllers routes
authRouter.post('/forgotPassword', forgotPasswordMiddlewares, forgotPassword);
authRouter.post('/verifyPassCode', verifyPassTokenMiddlewares, verifyPassTokenController);
authRouter.post('/resetPassword', resetPasswordMiddlewares, resetPassword);

export default authRouter;
