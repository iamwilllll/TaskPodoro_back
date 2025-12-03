import { Router } from 'express';
import authRouter from './auth/authRouter.js';

const appRouter: Router = Router();

appRouter.use('/api/auth', authRouter);

export default appRouter;
