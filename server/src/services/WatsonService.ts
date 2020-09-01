import fs from 'fs';
import path from 'path';

import visualRecognition from '../config/watson';

class WatsonService {
  async recognizeImages(image: string): Promise<string> {
    const filePath = path.join(__dirname, '..', 'uploads', image);

    const classifyParams = {
      imagesFile: fs.createReadStream(filePath),
      owners: ['me'],
      threshold: 0.6,
    };

    try {
      const response = await visualRecognition.classify(classifyParams);
      const json_results = JSON.stringify(response.result, null, 2);

      return json_results;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default WatsonService;