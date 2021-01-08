import { Task } from './models/task';
import { Status, Priority, Resolution, Type } from './models/task-details';

const task: Task = {
    id: '1',
    title: 'Complete homework',
    details: {
        status: Status.Todo,
        //type: Type.,
        resolution: Resolution.Incomplete,
        priority: Priority.Major,
    },
    description: 'Make a JIRA-like app',
};

export { task };
