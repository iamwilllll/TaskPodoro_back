import { Router } from 'express';
import multer from 'multer';

import {
    createGroupController,
    getUserController,
    getAllGroupsController,
    getGroupByIdController,
    createTaskController,
    changeTaskStatusController,
} from '@/controllers/user/index.js';
import { createGroupMiddleware, verifyToken } from '@/middlewares/index.js';

const upload = multer({ storage: multer.memoryStorage() });
const userRoutes: Router = Router();

userRoutes.get('/', verifyToken, getUserController);

userRoutes.post('/createGroup', verifyToken, upload.single('groupCover'), createGroupMiddleware, createGroupController);
userRoutes.get('/getAllGroups', verifyToken, getAllGroupsController);
userRoutes.get('/getGroupById/:id', verifyToken, getGroupByIdController);

userRoutes.post('/createTask/:groupId/createTask', verifyToken, createTaskController);
userRoutes.post('/changeTaskStatus/:taskId', verifyToken, changeTaskStatusController);


export default userRoutes;
