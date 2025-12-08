import { Document, Types } from 'mongoose';

export interface NotesI extends Document {
    name: string;
    description: string;
    task: Types.ObjectId;
}
