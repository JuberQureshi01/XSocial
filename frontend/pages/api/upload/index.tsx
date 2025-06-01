// pages/api/upload/index.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false, // Required for formidable
  },
};

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = formidable({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err || !files.file) {
      return res.status(400).json({ error: 'File upload error' });
    }

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
     fs.createReadStream(file.filepath);

    cloudinary.uploader.upload_stream({ folder: 'juber' }, (error, result) => {
      if (error || !result) {
        return res.status(500).json({ error: 'Cloudinary upload failed' });
      }
      // console.log(result)
      return res.status(200).json({ secure_url: result.secure_url });
    }).end(fs.readFileSync(file.filepath));
  });
}
