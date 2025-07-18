import express from 'express';
import multer from 'multer';
import bucket  from './gcsClient.js';

const uploadRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

uploadRouter.post(
  '/',
  upload.fields([
    { name: 'aadhaarDocument', maxCount: 1 },
    { name: 'panDocument', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const files = req.files;
      const urls = {};

      for (const field of ['aadhaarDocument', 'panDocument']) {
        if (files[field]) {
          const file = files[field][0];
          const blob = bucket.file(`${field}/${Date.now()}-${file.originalname}`);
          const blobStream = blob.createWriteStream({
            resumable: false,
            contentType: file.mimetype,
          });

          await new Promise((resolve, reject) => {
            blobStream.on('error', reject);
            blobStream.on('finish', resolve);
            blobStream.end(file.buffer);
          });

          urls[field] = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        }
      }

      // Save `urls.aadhaarDocument` and `urls.panDocument` to your DB as needed

      res.json({
        aadhaarUrl: urls.aadhaarDocument,
        panUrl: urls.panDocument,
        message: 'Files uploaded successfully!',
      });
    } catch (err) {
      console.error("Upload error:", err);
      res.status(500).json({ error: err.message });
    }
  }
);

export default uploadRouter;
