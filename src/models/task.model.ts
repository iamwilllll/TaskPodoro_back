import mongoose, { Schema, Types } from 'mongoose';

import { TaskI, TaskStatus } from '../shared/types/task.type.js';

const TaskSchema = new Schema<TaskI>({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: false, trim: true },
    notes: [{ type: Types.ObjectId, ref: 'Notes', required: false }],
    group: { type: Types.ObjectId, required: true },
    status: { type: String, enum: Object.values(TaskStatus), default: TaskStatus.PENDING },
});

const TaskModel = mongoose.model<TaskI>('Tasks', TaskSchema);
export default TaskModel;
