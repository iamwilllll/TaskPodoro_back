import { Router } from 'express';
import {
    forgotPasswordMiddlewares,
    loginMiddlewares,
    registerMiddlewares,
    verifyUserMiddlewares,
    verifyPassTokenMiddlewares,
    resetPasswordMiddlewares,
} from '../../middlewares/index.js';

import {
    forgotPassword,
    loginController,
    logoutController,
    registerController,
    resetPassword,
    verifyPassTokenController,
    verifyUserController,
} from '../../controllers/index.js';

const authRouter: Router = Router();

//* auth controllers routes
authRouter.post('/register', registerMiddlewares, registerController);
authRouter.post('/verifyUser', verifyUserMiddlewares, verifyUserController);
authRouter.post('/login', loginMiddlewares, loginController);
authRouter.post('/logout', logoutController);

//* password controllers routes
authRouter.post('/forgotPassword', forgotPasswordMiddlewares, forgotPassword);
authRouter.post('/verifyPassToken', verifyPassTokenMiddlewares, verifyPassTokenController);
authRouter.post('/resetPassword', resetPasswordMiddlewares, resetPassword);

export default authRouter;
