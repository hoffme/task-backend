import { Request } from "express";

import TaskRepository from "../repositories/task";

import {HandlerResult} from "../api/utils/handler";

class TasksController {

    public static repository: TaskRepository;

    public static async Find(req: Request): Promise<HandlerResult> {
        const id = req.params.id;

        const task = await this.repository.FindById(id);

        return { data: task };
    }

    public static async Search(req: Request): Promise<HandlerResult> {
        const filter = req.body || {};

        const result = await this.repository.Search(filter);

        return { data: result };
    }

    public static async Create(req: Request): Promise<HandlerResult> {
        const params = req.body;

        const task = await this.repository.Create(params);

        return { data: task };
    }

    public static async Update(req: Request): Promise<HandlerResult> {
        const id = req.params.id;
        const params = req.body;

        const task = await this.repository.Update({ id, ...params });
        if (!task) return {
            code: 404,
            error: new Error('task not found')
        }

        return { data: task };
    }

    public static async Delete(req: Request): Promise<HandlerResult> {
        const id = req.params.id;

        const deleted = await this.repository.Delete(id);
        if (!deleted) return {
            code: 404,
            error: new Error('task not found')
        }

        return { data: true };
    }

}

export default TasksController;