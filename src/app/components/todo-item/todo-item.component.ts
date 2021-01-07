import { Component, Input, OnInit } from '@angular/core';
import { ITodo } from 'src/app/shared/todos.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input()
  todo: ITodo;

  constructor() { }

  ngOnInit(): void {
  }

}
