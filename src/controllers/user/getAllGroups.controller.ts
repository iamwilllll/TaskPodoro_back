import { Request, Response } from 'express';
import { HttpError } from '../../errors/HttpError.js';
import GroupModel from '../../models/group.model.js';

export async function getAllGroupsController(req: Request, res: Response) {
    try {
        const token = req.userId;
        const allGroupsFound = await GroupModel.find({ user: token });

        res.json({ ok: true, message: 'The groups were successfully obtained', groups: allGroupsFound });
    } catch (err) {
        const error = err as HttpError;

        res.status(error.statusCode || 500).json({
            ok: false,
            message: error.message || 'Internal server error',
        });
    }
}
