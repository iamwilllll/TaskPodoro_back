import { Router } from 'express';
import { registerMiddlewares, verifyUserMiddlewares } from '../../middlewares/index.js';
import { loginController, registerController, verifyUserController } from '../../controllers/index.js';
import { loginMiddlewares } from '../../middlewares/auth/login.middlewares.js';

const authRouter: Router = Router();

//* controllers routes
authRouter.post('/register', registerMiddlewares, registerController);
authRouter.post('/verifyUser', verifyUserMiddlewares, verifyUserController);
authRouter.post('/login',loginMiddlewares, loginController);

export default authRouter;
