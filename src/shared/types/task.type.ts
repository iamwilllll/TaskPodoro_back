import { Document, Types } from 'mongoose';

export enum TaskStatus {
    PENDING = 'pending',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
}

export interface TaskI extends Document {
    name: string;
    description?: string;
    notes: Types.ObjectId[];
    status: TaskStatus;
    group: Types.ObjectId;
}
