import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class TaskEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    title: string

    @Column({ type: 'bool' })
    completed: boolean
}

export default TaskEntity;