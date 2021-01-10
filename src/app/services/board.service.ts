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
  todo: { borderLeft: '6px solid lightgrey',
  backgroundColor: 'white',
},
  inProgress: {
    borderLeft: '6px solid lightblue',
    backgroundColor: 'white',
  },
  inReview: {
    borderLeft: '6px solid yellow',
    backgroundColor: 'white',
  },
  done: {
    borderLeft: '6px solid limegreen',
    backgroundColor: 'white',
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
  inReviewBoard: Board = {
    title: Status.InReview,
    items: [],
    style: this.boardStyles.inReview,
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
        this.inReviewBoard.items = this.filterTasks(tasks, Status.InReview);
        this.doneBoard.items = this.filterTasks(tasks, Status.Done);
      }
    });

    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      console.log(tasks);
    });
  }

  filterTasks = (tasks: Task[], status: any) =>
    tasks.filter((task) => task.status == status);

  drop(event: CdkDragDrop<Task[]>) {
    console.log("dropped!");
    const {
      todoQuantity,
      inProgressQuantity,
      inReviewQuantity,
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
    // console.log(event.previousContainer);
    // console.log(event.container);
    const {
      todoQuantity: todoQ,
      inProgressQuantity: inPrQ,
      inReviewQuantity: inRevQ,
      doneQuantity: doneQ,
    } = this.getQuantity();

    const newStatus = getNewStatus(
      todoQuantity,
      todoQ,
      inProgressQuantity,
      inPrQ,
      inReviewQuantity,
      inRevQ,
      doneQuantity,
      doneQ
    );
    if (newStatus) {
      const itemId = getDraggedItemId(event.container.data, newStatus);
      this.taskService.changeStatustDB(itemId, newStatus).subscribe();
    }
  }

  getQuantity() {
    const todoQuantity = this.todoBoard.items.length;
    const inProgressQuantity = this.inProgressBoard.items.length;
    const inReviewQuantity = this.inReviewBoard.items.length;
    const doneQuantity = this.doneBoard.items.length;
    return { todoQuantity, inProgressQuantity, inReviewQuantity, doneQuantity };
  }
}

function getNewStatus(todo1, todo2, inPr1, inPr2, inRev1, inRev2, done1, done2) {
  if (todo2 > todo1) {
    return Status.Todo;
  } else if (inPr2 > inPr1) {
    return Status.InProgress;
  } else if (inRev2 > inRev1) {
    return Status.InReview;
  } else if (done2 > done1) {
    return Status.Done;
  } else {
    return false;
  }
}

function getDraggedItemId(array, status) {
  console.log('NEW STATUS IS' + status);
  // console.log(array);
  array.map((el) => {
    console.log(el.status);
  })
  console.log('dragged is '+ JSON.stringify(array.filter((el) => el.status !== status)[0]));
  return array.filter((el) => el.status !== status)[0].id;
}
