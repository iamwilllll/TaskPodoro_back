import mongoose, { Schema, Types } from 'mongoose';

import { TaskI, TaskStatus } from '../shared/types/task.type.js';

const TaskSchema = new Schema<TaskI>(
    {
        group: { type: Types.ObjectId, required: true },
        name: { type: String, required: true, trim: true },
        description: { type: String, required: false, trim: true },
        status: { type: String, enum: Object.values(TaskStatus), default: TaskStatus.PENDING },
        notes: [{ type: Types.ObjectId, ref: 'Notes', required: false }],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const TaskModel = mongoose.model<TaskI>('Tasks', TaskSchema);
export default TaskModel;
