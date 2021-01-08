import { Task } from './task';

export interface Board {
    title: string,
    items: Task[],
    style: any,
}

