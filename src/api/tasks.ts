import { Router } from 'express';

import TasksController from '../controllers/tasks';

import wrpHandler from './utils/handler';

const tasksRouter = Router();

tasksRouter.get(
  '/:id',
  wrpHandler((r) => TasksController.Find(r))
);

tasksRouter.post(
  '/search',
  wrpHandler((r) => TasksController.Search(r))
);

tasksRouter.post(
  '/',
  wrpHandler((r) => TasksController.Create(r))
);

tasksRouter.put(
  '/:id',
  wrpHandler((r) => TasksController.Update(r))
);

tasksRouter.delete(
  '/:id',
  wrpHandler((r) => TasksController.Delete(r))
);

export default tasksRouter;
