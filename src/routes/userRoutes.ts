import { Router } from 'express';
import { getUserController } from '../controllers/user/index.js';

const userRoutes: Router = Router();

userRoutes.get('/', getUserController);

export default userRoutes;
