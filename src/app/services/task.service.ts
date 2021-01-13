import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { task } from '../tasks';
import { Task } from '../models/task';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap, debounceTime } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks: Task[] = [];
  tasks$: BehaviorSubject<Task[]> = new BehaviorSubject(null);
  onlyMyIssues$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  databaseURL = 'https://jira-clone-16d01-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) { }

  addTask(task: Task) {
    const tasks = this.tasks$.value;
    this.tasks$.next([...tasks, task]);
  }

  createTaskDB = (task: Task): Observable<any> =>
    this.http.post<Task>(this.databaseURL + '/tasks' + '.json', task);

  getTasks() {
    return this.http.get<Task[]>(this.databaseURL + '/tasks' + '.json').pipe(
      map((res) => {
        return res
          ? Object.keys(res).map((key) => ({ ...res[key], id: key }))
          : [];
      }),
      map((res: Task[]) => {
        this.tasks$.next(res);
        return res;
      })
    );
  }

  changeStatustDB(id, status) {
    const task = this.getTaskById(id);
    const tasks = this.changeStatus(this.tasks$.value, id, status);
    this.tasks$.next(tasks);
    return this.http.put(`${this.databaseURL}/tasks/${id}.json`, {
      ...task,
      status,
    });
  }

  getTaskById(id) {
    return this.tasks$.value.filter((t) => t.id === id)[0];
  }

  getTaskByIdDB(id) {
    return this.http.get<Task>(this.databaseURL + '/tasks/' + id + '.json').pipe(map(res => res));
  }

  changeStatus(tasks: any[], id: any, status: any) {
    return tasks.map((task) => {
      if (task.id === id) {
        task.status = status;
      }
      return task;
    });
  }

  toggleOnlyMyIssues() {
    const currentValue = this.onlyMyIssues$.value;
    this.onlyMyIssues$.next(!currentValue);
  }

  deleteTask(id: any) {
    const newTasks = this.filterById(this.tasks$.value, id);
    this.tasks$.next(newTasks);
    this.deleteDB(id).subscribe();
  }

  filterById(array: any[], id: any) {
    return array.filter((el: { id: any }) => el.id !== id);
  }

  deleteDB(id) {
    return this.http.delete<void>(`${this.databaseURL}/tasks/${id}.json`);
  }

  editTask(id: string, task: Task) {
    console.log(task);
    const newTasks = this.filterById(this.tasks$.value, id);
    this.tasks$.next([...newTasks, task])
    return this.http.put(`${this.databaseURL}/tasks/${id}.json`, { ...task });
  }
}
