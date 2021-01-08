import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '../create-task/create-task.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(

    public dialog: MatDialog,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

  }
  logOut() {
    this.authService.logOut();
  }
  openDialog() {
    this.dialog.open(CreateTaskComponent);
  }
}
