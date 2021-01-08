import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../models/task';
import { Status, Priority, Resolution, Type } from '../models/task-details';
import { TaskService } from '../services/task.service';
// const task: Task = {
//   name: 'Complete homework',
//   details: {
//     status: Status.Todo,
//     //type: Type.,
//     resolution: Resolution.Incomplete,
//     priority: Priority.Major,
//   },
//   description: "Make a JIRA-like app",
// }

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  @Input() style: string;
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

  delete = () => this.taskService.deleteTask(this.task.id);
}
