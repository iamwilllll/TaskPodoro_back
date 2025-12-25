import mongoose, { Document, Schema, Types } from 'mongoose';

 enum TaskStatus {
    PENDING = 'pending',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
}

interface TaskI extends Document {
    name: string;
    description: string;
    notes: Types.ObjectId[];
    status: TaskStatus;
    group: Types.ObjectId;
}

const TaskSchema = new Schema<TaskI>(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, required: false, trim: true },
        status: { type: String, enum: Object.values(TaskStatus), default: TaskStatus.PENDING, required:false },
        group: { type: Types.ObjectId, required: true },
        notes: [{ type: Types.ObjectId, ref: 'Notes', required: false }],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const TaskModel = mongoose.model<TaskI>('Tasks', TaskSchema);
export default TaskModel;
