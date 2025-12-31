import { Task } from 'src/tasks/entities/task.entities/task.entities';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: true })
  password: string;

  @Column()
  username: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}

// id: uuid (primary key)
// email: string (unique)
// password: string (hashed)
// username: string
// createdAt: Date
// updatedAt: Date
// tasks: Task[] (one-to-many)
