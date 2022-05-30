import 'reflect-metadata';

import { DataSource } from 'typeorm';

import Task from './entity/task';

import config from './config';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.storage.host,
  port: config.storage.port,
  username: config.storage.user,
  password: config.storage.pass,
  database: config.storage.database,
  synchronize: true,
  logging: false,
  entities: [Task],
  migrations: [],
  subscribers: [],
});

export default AppDataSource;
