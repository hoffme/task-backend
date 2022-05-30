import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import router from './api';

import config from "./config";

const runServer = () => {
  const app = express();

  app.use(morgan('dev'));
  app.use(cors({ origin: '*' }));

  app.use(express.urlencoded({ extended: false }))
  app.use(express.json());

  app.use('/api', router);

  app.listen(config.port, () => {
    console.log(`running on http://localhost:${config.port}`)
  });
}

export default runServer;