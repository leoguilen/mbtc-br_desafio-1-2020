import dotenv from 'dotenv';

import VisualRecognitionV3 from 'ibm-watson/visual-recognition/v3';
import { IamAuthenticator } from 'ibm-watson/auth';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const visualRecognition = new VisualRecognitionV3({
  serviceUrl: process.env.API_URL,
  version: '2018-03-19',
  authenticator: new IamAuthenticator({ apikey: process.env.API_KEY || '' })
});

export default visualRecognition;