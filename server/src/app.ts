import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

import routes from './routes';

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();
    this.Middleware();
    this.Routes();
  }

  private Middleware(): void {
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(morgan('tiny'));
    this.express.use('/images', express.static(path.join(__dirname, 'uploads')));
  }

  private Routes(): void {
    this.express.use('/api/v1', routes);
  }
}

export default new App().express;