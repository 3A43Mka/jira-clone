import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteTaskConfirmComponent } from '../delete-task-confirm/delete-task-confirm.component';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  @Input() style: string;
  constructor(public dialog: MatDialog, private taskService: TaskService) { }

  ngOnInit(): void {
  }

  delete = () => {
    const dialogRef = this.dialog.open(DeleteTaskConfirmComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.deleteTask(this.task.id);
      }
    });
  }

}
