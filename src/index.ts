import AppDataSource from "./data-source";

import TasksController from "./controllers/tasks";

import TaskRepository from "./repositories/task";

import runServer from "./server";

AppDataSource
    .initialize()
    .then(() => {
        TasksController.repository = new TaskRepository(AppDataSource);

        runServer();
    })
    .catch(console.error)
