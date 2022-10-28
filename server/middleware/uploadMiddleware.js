import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

const storage = multer.memoryStorage();

//check if file type is allowed
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//Crop images
export const processImage = async (file, width, height, fit) => {
  fs.access('./images', (error) => {
    if (error) {
      console.log(error);
    }
  });
  const filename = uuidv4() + Date.now() + path.extname(file.originalname);
  await sharp(file.buffer)
    .resize({ width: width, height: height, fit: fit })
    .toFile(`./images/${filename}`);
  return filename;
};

export const upload = multer({ storage, fileFilter });
