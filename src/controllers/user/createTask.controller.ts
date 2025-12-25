import { Request, Response } from 'express';
import { HttpError } from '@/errors/HttpError.js';
import GroupModel from '@/models/group.model.js';
import TaskModel from '@/models/task.model.js';

export async function createTaskController(req: Request, res: Response) {
    try {
        const findGroup = await GroupModel.findOne({ _id: req.params.groupId });
        if (!findGroup) throw new HttpError(404, "Group doesn't exist");

        const { name, description } = req.body;

        const newTask = new TaskModel({ name, description, group: req.params.groupId });
        findGroup.tasks.push(newTask._id);

        await Promise.all([newTask.save(), findGroup.save()]);
        res.json({ ok: true, message: 'Task create successful', data: newTask });
    } catch (err) {
        const error = err as HttpError;
        return res.status(error.statusCode).json({ ok: false, message: error.message || 'Internal server error' });
    }
}
