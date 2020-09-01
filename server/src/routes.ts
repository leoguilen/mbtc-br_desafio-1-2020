import express from 'express';
import uploads from './config/multer';

import RecognizeController from './controllers/RecognizeController';
import UploadImageController from './controllers/UploadImageController';

const routes = express.Router();

const recognizeController = new RecognizeController();
const uploadImageController = new UploadImageController();

routes.get('/recognize/:img', recognizeController.handle);
routes.post('/upload', uploads.array('images'), uploadImageController.handle);

export default routes;