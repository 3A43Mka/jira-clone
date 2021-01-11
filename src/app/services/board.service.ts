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
import { AuthService } from './auth.service';
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

  onlyMyIssues: boolean = false;
  userId = null;
  allTasks = [];

  constructor(private taskService: TaskService, private authService: AuthService ) {
    this.taskService.tasks$.subscribe((tasks: Task[]) => {
      if (tasks) {
        this.allTasks = tasks;
        if (this.allTasks) {
          this.todoBoard.items = this.filterTasks(this.allTasks, Status.Todo);
          this.inProgressBoard.items = this.filterTasks(this.allTasks, Status.InProgress);
          this.inReviewBoard.items = this.filterTasks(this.allTasks, Status.InReview);
          this.doneBoard.items = this.filterTasks(this.allTasks, Status.Done);
        }  
      }
    });

    this.authService.userId.subscribe((res) => {
      this.userId = res.uid;
    });

    this.taskService.onlyMyIssues$.subscribe((value: boolean) => {
      this.onlyMyIssues = value;
      this.todoBoard.items = this.filterTasks(this.allTasks, Status.Todo);
      this.inProgressBoard.items = this.filterTasks(this.allTasks, Status.InProgress);
      this.inReviewBoard.items = this.filterTasks(this.allTasks, Status.InReview);
      this.doneBoard.items = this.filterTasks(this.allTasks, Status.Done);
    });

    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      console.log(tasks);
    });
  }

  filterTasks = (tasks: Task[], status: any) => {
    if (!this.onlyMyIssues) {
      return tasks.filter((task) => task.status == status);
    } else {
      return tasks.filter((task) => (task.status == status) && (task.assignedTo) && (task.assignedTo.userId == this.userId));
    }
  }

  drop(event: CdkDragDrop<Task[]>) {
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
  return array.filter((el) => el.status !== status)[0].id;
}
