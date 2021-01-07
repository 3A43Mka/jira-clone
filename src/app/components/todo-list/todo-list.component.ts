import { Component, OnInit } from '@angular/core';
import { ITodo, TodosService } from 'src/app/shared/todos.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos: ITodo[] = [];


  constructor(public todosService: TodosService) { }

  ngOnInit(): void {

    this.todosService.load().subscribe(todos => {
      this.todos = todos;
    });
  }

}
