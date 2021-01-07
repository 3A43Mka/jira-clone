import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ITodo, TodosService } from 'src/app/shared/todos.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  form: FormGroup;

  constructor(public todosService: TodosService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    })
  }

  submit() {
    const {title} = this.form.value

    const todo: ITodo = {
      title
    }

    this.todosService.create(todo).subscribe(todo => {
      console.log('added todo:', todo);
      this.form.reset()
    }, err => console.error(err))
  }

}
