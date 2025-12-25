import { Router } from 'express';
import authRouter from '@/routes/authRouter.js';
import userRoutes from '@/routes/userRoutes.js';

const appRouter: Router = Router();

appRouter.use('/api/auth', authRouter);
appRouter.use('/api/user', userRoutes);

export default appRouter;
