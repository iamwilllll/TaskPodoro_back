import { Request, Response } from 'express';
import { HttpError } from '@/errors/HttpError.js';
import UserModel from '@/models/user.model.js';
import uploadBufferToCloudinary from '@/services/uploadImage.service.js';
import GroupModel from '@/models/group.model.js';

export async function createGroupController(req: Request, res: Response) {
    try {
        const findUser = await UserModel.findOne({ _id: req.userId });
        if (!findUser) throw new HttpError(404, "User doesn't exist");
        if (!req.file) throw new HttpError(400, 'Image is required');

        const groupCover = req?.file?.buffer;
        const { url } = await uploadBufferToCloudinary({ buffer: groupCover, name: `${req.body.name} ${Date.now()}` });
        const { name, description } = req.body;

        const newGroup = new GroupModel({ name, description, image: url, user: findUser._id });
        findUser.groups.push(newGroup._id);

        await Promise.all([newGroup.save(), findUser.save()]);
        res.json({ ok: true, message: 'Group create successful', data: newGroup });
    } catch (err) {
        const error = err as HttpError;
        return res.status(error.statusCode).json({ ok: false, message: error.message || 'Internal server error' });
    }
}
