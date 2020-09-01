import { Request, Response } from 'express';

import WatsonService from './../services/WatsonService';

const watsonService = new WatsonService();

class RecognizeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { img } = request.params;

    if (!img)
      return response.status(400).json();

    try {
      const result = await watsonService.recognizeImages(img);
      return response.status(200).json({ result: JSON.parse(result) });
    } catch (err) {
      return response.status(500).json({ message: err });
    }
  }
}

export default RecognizeController;