import { Request } from 'express';
import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname;
    cb(null, fileName);
  }
});

const uploads = multer({
  storage: storage,
  fileFilter: (req: Request, file: Express.Multer.File, cb) => {
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'application/zip') {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg, .jpeg and .zip format allowed!'));
    }
  }
});

export default uploads;