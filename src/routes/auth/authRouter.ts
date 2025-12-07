import { Router } from 'express';
import { registerMiddlewares, verifyUserMiddlewares } from '../../middlewares/index.js';
import { registerController, verifyUserController } from '../../controllers/index.js';

const authRouter: Router = Router();

//* controllers routes
authRouter.post('/register', registerMiddlewares, registerController);
authRouter.post('/verifyUser', verifyUserMiddlewares, verifyUserController);

export default authRouter;
