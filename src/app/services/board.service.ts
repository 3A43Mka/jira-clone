import { Injectable } from '@angular/core';
import { Board } from '../models/board';
import { task } from '../tasks';
import { TaskService } from './task.service';
import { Task } from '../models/task';
import { Status } from '../models/task-details';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
const boardStyles = {
  todo: { backgroundImage: 'linear-gradient(145deg, #b8adfe, #676bc2)' },
  inProgress: {
    color: '#09203f',
    backgroundImage: 'linear-gradient(145deg, #adcdfe, #a5b7d2)',
  },
  done: {
    color: '#09203f',
    backgroundImage: 'linear-gradient(145deg, #a8ff78, #78ffd6)',
  },
};
@Injectable({
  providedIn: 'root',
})
export class BoardService {
  boardStyles = boardStyles;
  todoBoard: Board = {
    title: Status.Todo,
    items: [],
    style: this.boardStyles.todo,
  };
  inProgressBoard: Board = {
    title: Status.InProgress,
    items: [],
    style: this.boardStyles.inProgress,
  };
  doneBoard: Board = {
    title: Status.Done,
    items: [],
    style: this.boardStyles.done,
  };

  constructor(private taskService: TaskService) {
    this.taskService.tasks$.subscribe((tasks: Task[]) => {
      if (tasks) {
        this.todoBoard.items = this.filterTasks(tasks, Status.Todo);
        this.inProgressBoard.items = this.filterTasks(tasks, Status.InProgress);
        this.doneBoard.items = this.filterTasks(tasks, Status.Done);
      }
    });

    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      console.log('In constructor tasks', tasks);
    });
  }

  filterTasks = (tasks: Task[], status: any) =>
    tasks.filter((task) => task.details.status == status);

  drop(event: CdkDragDrop<Task[]>) {
    const {
      todoQuantity,
      inProgressQuantity,
      doneQuantity,
    } = this.getQuantity();

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    console.log(event.previousContainer);
    console.log(event.container);
    const {
      todoQuantity: todoQ,
      inProgressQuantity: inPrQ,
      doneQuantity: doneQ,
    } = this.getQuantity();

    const newStatus = getNewStatus(
      todoQuantity,
      todoQ,
      inProgressQuantity,
      inPrQ,
      doneQuantity,
      doneQ
    );
    if (newStatus) {
      const itemId = getDraggedItemId(event.container.data, newStatus);
      this.taskService.changeStatustDB(itemId, newStatus).subscribe();

    }


    console.log(getDraggedItemId(event.container.data, newStatus));
  }

  getQuantity() {
    const todoQuantity = this.todoBoard.items.length;
    const inProgressQuantity = this.inProgressBoard.items.length;
    const doneQuantity = this.doneBoard.items.length;
    return { todoQuantity, inProgressQuantity, doneQuantity };
  }
}

function getNewStatus(todo1, todo2, inPr1, inPr2, done1, done2) {
  if (todo2 > todo1) {
    return Status.Todo;
  } else if (inPr2 > inPr1) {
    return Status.InProgress;
  } else if (done2 > done1) {
    return Status.Done;
  } else {
    return false;
  }
}

function getDraggedItemId(array, status) {
  return array.filter((el) => el.status !== status)[0].id;
}
