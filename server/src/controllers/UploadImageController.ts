import { Request, Response } from 'express';

class RecognizeController {
  async handle(request: Request, response: Response): Promise<Response> {
    if (request.files.length < 1) {
      return response.status(400).json({ message: 'File is required' });
    }

    return response.status(200).json({
      message: 'Files saved with success',
      file: request.files
    });
  }
}

export default RecognizeController;