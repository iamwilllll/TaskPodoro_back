import mongoose, { Schema, Types } from 'mongoose';
import { GroupI } from '../shared/types/group.type.js';

const GroupSchema = new Schema<GroupI>({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: false, trim: false },
    image: { type: String, required: true, trim: true },
    tasks: [{ type: Types.ObjectId, ref: 'Tasks' }],
});

const GroupModel = mongoose.model<GroupI>('Groups', GroupSchema);
export default GroupModel;
