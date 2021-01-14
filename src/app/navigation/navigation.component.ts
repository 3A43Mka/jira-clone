import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  constructor(

    public dialog: MatDialog,
    private authService: AuthService,
    private taskService: TaskService,
  ) { }

  ngOnInit(): void {

  }

  toggleOnlyMyIssues(){
    this.taskService.toggleOnlyMyIssues();
  }
  logOut() {
    this.authService.logOut();
  }
  openDialog() {
    this.dialog.open(CreateTaskComponent);
  }
}
