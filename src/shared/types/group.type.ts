import { Document, Types } from 'mongoose';

export interface GroupI extends Document {
    name: string;
    description: string;
    image: string;
    tasks: Types.ObjectId[];
    user: Types.ObjectId;
}
