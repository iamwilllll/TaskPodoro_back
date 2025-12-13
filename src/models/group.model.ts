import mongoose, { Schema, Types } from 'mongoose';
import { GroupI } from '../shared/types/group.type.js';

const GroupSchema = new Schema<GroupI>(
    {
        user: { type: Types.ObjectId, ref: 'User' },
        name: { type: String, required: true, trim: true },
        description: { type: String, required: false, trim: false },
        image: { type: String, required: false, trim: true },
        tasks: [{ type: Types.ObjectId, ref: 'Tasks' }],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const GroupModel = mongoose.model<GroupI>('Groups', GroupSchema);
export default GroupModel;
