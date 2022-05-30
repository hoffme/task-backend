import {DataSource, Repository} from "typeorm";

import TaskEntity from "../entity/task";

interface Task {
    id: string
    title: string
    completed: boolean
}

interface TaskSearchParams {
    page?: number
    limit?: number
}

interface TaskSearchResult {
    items: Task[]
    page: number
    limit: number
    pages: number
    total: number
}

interface TaskCreateParams {
    title: string
    completed: boolean
}

interface TaskUpdateParams {
    id: string
    title?: string
    completed?: boolean
}

class TaskRepository {

    private repo: Repository<TaskEntity>;

    constructor(source: DataSource) {
        this.repo = source.getRepository(TaskEntity);
    }

    public async FindById(id: string): Promise<Task | null> {
        const idParsed = parseInt(id);
        if (isNaN(idParsed)) return null;

        const task = await this.repo.findOneBy({ id: idParsed });

        return task ? TaskRepository.modelToJson(task) : null;
    }

    public async Search(params: TaskSearchParams): Promise<TaskSearchResult> {
        const page = (params.page || params.page >= 0) ? params.page : 0;
        const limit = (params.limit || params.limit > 0) ? params.limit : 10;

        const total = await this.repo.count();
        const pages = total === 0 ? 0 : (Math.floor(total / limit) + 1);

        const result = await this.repo.createQueryBuilder("task")
            .skip(page * limit)
            .take(limit)
            .getMany();

        const items = result.map(task => TaskRepository.modelToJson(task));

        return { items, page, limit, pages, total };
    }

    public async Create(params: TaskCreateParams): Promise<Task> {
        const task = new TaskEntity();
        task.title = params.title;
        task.completed = params.completed;

        const result = await this.repo.save(task);

        return TaskRepository.modelToJson(result);
    }

    public async Update(params: TaskUpdateParams): Promise<Task | null> {
        const idParsed = parseInt(params.id);
        if (isNaN(idParsed)) return null;

        const task = await this.repo.findOneBy({ id: idParsed });

        if (params.title !== undefined) task.title = params.title;
        if (params.completed !== undefined) task.completed = params.completed;

        const result = await this.repo.save(task);

        return TaskRepository.modelToJson(result);
    }

    public async Delete(id: string): Promise<boolean> {
        const result = await this.repo.delete(id);
        return result.affected && result.affected > 0;
    }

    private static modelToJson(model: TaskEntity): Task {
        return {
            id: model.id.toString(),
            title: model.title,
            completed: model.completed
        };
    }

}

export default TaskRepository;
export type {
    Task,
    TaskSearchParams,
    TaskSearchResult,
    TaskCreateParams,
    TaskUpdateParams
}