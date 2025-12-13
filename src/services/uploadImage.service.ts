import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import config from '../config/config.js';
import { HttpError } from '../errors/HttpError.js';
import streamifier from 'streamifier';

type UploadBufferToCloudinaryProps = {
    buffer: Buffer;
    name: string;
};
export default async function uploadBufferToCloudinary({ buffer, name }: UploadBufferToCloudinaryProps) {
    const api_key = config.cloudinary.API_KEY;
    const api_secret = config.cloudinary.API_SECRET;

    if (!api_key || !api_secret) throw new HttpError(409, 'Internal server error on cloudinary keys');

    cloudinary.config({ cloud_name: 'dd52hrhu2', api_key, api_secret });

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({ folder: 'groups', public_id: name }, (error, result) => {
            if (error) reject(error);
            if (!result) return reject(new Error('Cloudinary returned empty result'));
            else resolve(result);
        });

        streamifier.createReadStream(buffer).pipe(uploadStream);
    });

    return result;
}
