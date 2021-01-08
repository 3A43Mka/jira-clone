import { User } from './user';

export interface Task {
    id: string;
    title: string;
    details?: Details;
    created?: any;
    date?: Date;
    role?: Role;
    description?: string;
    createdBy?: string;
    assignedTo?: User;
    creatorName?: string;
}
interface Details {
    status: string;
    type?: string;
    resolution: string;
    priority: string;
}

interface Date {
    created: any;
    dueDate: any;
}

interface Role {
    assignee?: string;
    reporter: string;
}
