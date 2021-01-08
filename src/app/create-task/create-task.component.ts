import { Component, OnInit, Inject, OnDestroy } from '@angular/core';

import { TaskService } from '../services/task.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { type, resolution, status, priority } from './select-details';
import { Status, Priority, Resolution, Type } from '../models/task-details';
import { Task } from '../models/task';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { User } from 'firebase';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent implements OnInit, OnDestroy {
  createTaskForm: FormGroup;
  priorityOptions: { value: Priority }[] = priority;
  typeOptions: { value: Type }[] = type;
  statusOptions: { value: Status }[] = status;
  resolutionOptions: { value: Resolution }[] = resolution;
  user: User;
  userId: string;
  userSubscription: Subscription;

  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<CreateTaskComponent>,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.createTaskForm = new FormGroup({
      id: new FormControl('2'),
      title: new FormControl(null, [Validators.required]),
      createdBy: new FormControl(null),
      creatorName: new FormControl(null),
      details: new FormGroup({
        status: new FormControl(Status.Todo),
        type: new FormControl(null, [Validators.required]),
        priority: new FormControl(null, [Validators.required]),
        resolution: new FormControl(null, [Validators.required]),
      }),
      date: new FormGroup({
        dueDate: new FormControl(null, [Validators.required]),
        created: new FormControl(''),
      }),
      description: new FormControl(''),
    });
    this.userSubscription = this.authService.userId.subscribe((res) => {
      this.userId = res.uid;
      this.user = res;
      console.log(this.user);
    });
  }

  onSubmit() {
    const newTask: Task = this.createTaskForm.value;
    newTask.date.created = new Date();
    newTask.createdBy = this.userId;
    newTask.creatorName = this.user.displayName;
    console.log(this.createTaskForm.value);
    this.closeForm();
    this.taskService
      .createTaskDB(this.createTaskForm.value)
      .subscribe((res) => {
        newTask.id = res.name;
        this.taskService.addTask(newTask);
      });
  }

  closeForm = () => this.dialogRef.close();
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
