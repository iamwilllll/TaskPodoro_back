import { Router } from 'express';
import { registerMiddlewares } from '../../middlewares/index.js';
import { registerController } from '../../controllers/register.controller.js';

const authRouter: Router = Router();

//* controllers routes
authRouter.post('/register', registerMiddlewares, registerController);

export default authRouter;
