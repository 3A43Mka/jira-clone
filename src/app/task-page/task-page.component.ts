import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';

import { UserService } from '../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  type,
  resolution,
  status,
  priority,
} from '../create-task/select-details';
import { Status, Priority, Resolution, Type } from '../models/task-details';
import { User } from '../models/user';
@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss'],
})
export class TaskPageComponent implements OnInit {
  taskId: string;
  task: Task;
  users: User[] = [];
  priorityOptions: { value: Priority }[] = priority;
  typeOptions: { value: Type }[] = type;
  statusOptions: { value: Status }[] = status;
  resolutionOptions: { value: Resolution }[] = resolution;
  editTaskForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.taskId = this.route.snapshot.paramMap.get('id');
      this.task = this.taskService.getTaskById(this.taskId);
      this.editTaskForm = new FormGroup({
        id: new FormControl(this.task.id),
        title: new FormControl(this.task.title, [Validators.required]),
        status: new FormControl(this.task.status),
        details: new FormGroup({
          type: new FormControl(this.task.details.type, [Validators.required]),
          priority: new FormControl(this.task.details.priority, [
            Validators.required,
          ]),
          resolution: new FormControl(this.task.details.resolution, [
            Validators.required,
          ]),
        }),
        date: new FormGroup({
          dueDate: new FormControl(this.task.date.dueDate, [Validators.required]),
          created: new FormControl(this.task.date.created),
        }),
        description: new FormControl(this.task.description),
        assignedTo: new FormControl(this.task.assignedTo),
        createdBy: new FormControl(this.task.createdBy),
        creatorName: new FormControl(this.task.creatorName),
      });
      this.userService.getUsers().subscribe((res) => {
        this.users = res;
      });
    });
  }

  editTask() {
    const editedTask = this.editTaskForm.value;
    this.taskService
      .editTask(this.taskId, editedTask)
      .subscribe((result) => {
        this.task = editedTask;
      });
  }

  onBack() {
    this.router.navigate(['/home/dashboard']);
  }
}
