import { Request, Response } from 'express';
import { HttpError } from '@/errors/HttpError.js';
import TaskModel from '@/models/task.model.js';

enum TaskStatus {
    PENDING = 'pending',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
}

export async function changeTaskStatusController(req: Request, res: Response) {
    try {
        const { status } = req.body;

        if (!Object.values(TaskStatus).includes(status)) {
            return res.status(400).json({ message: 'Invalid state' });
        }

        const findTask = await TaskModel.findByIdAndUpdate(req.params.taskId, { status }, { new: true });
        if (!findTask) throw new HttpError(404, "Group doesn't exist");
        res.json({ ok: true, message: 'Task update successful', data: findTask });
    } catch (err) {
        const error = err as HttpError;
        return res.status(error.statusCode).json({ ok: false, message: error.message || 'Internal server error' });
    }
}
