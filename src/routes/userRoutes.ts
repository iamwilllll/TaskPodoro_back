import { Router } from 'express';
import multer from 'multer';

import { createGroupController, getUserController } from '../controllers/user/index.js';
import { createGroupMiddleware, verifyToken } from '../middlewares/index.js';

const upload = multer({ storage: multer.memoryStorage() });
const userRoutes: Router = Router();

userRoutes.get('/', verifyToken, getUserController);

userRoutes.post('/createGroup', verifyToken, upload.single('groupCover'), createGroupMiddleware, createGroupController);

export default userRoutes;
