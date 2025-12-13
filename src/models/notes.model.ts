import mongoose, { Schema, Types } from 'mongoose';
import { NotesI } from '../shared/types/notes.type.js';

const NotesSchema = new Schema<NotesI>(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, required: false, trim: true },
        task: { type: Types.ObjectId, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const NotesModel = mongoose.model<NotesI>('Notes', NotesSchema);
export default NotesModel;
