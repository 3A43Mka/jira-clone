import { Component, OnInit } from '@angular/core';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { Board } from '../models/board';
import { task } from '../tasks';
import { TaskService } from '../services/task.service';
import { BoardService } from '../services/board.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Task } from '../models/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  boardStyles;
  todoBoard: Board;
  inProgressBoard: Board;
  doneBoard: Board;

  constructor(
    private taskService: TaskService,
    private boardService: BoardService
  ) {
    this.todoBoard = this.boardService.todoBoard;
    this.inProgressBoard = this.boardService.inProgressBoard;
    this.doneBoard = this.boardService.doneBoard;
  }

  ngOnInit(): void {
    console.log('From service', this.taskService.tasks);
  }

  drop(event: CdkDragDrop<Task[]>) {
    this.boardService.drop(event);
  }
}
