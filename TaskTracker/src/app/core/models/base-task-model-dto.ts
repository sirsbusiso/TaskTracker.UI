import { Priority, Status } from './task-enums-model';

export interface BaseTaskDto {
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  dueDate?: string;
  createdAt?: string;
}
