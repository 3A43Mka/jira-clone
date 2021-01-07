import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

export interface ITodo {
  id?: string
  title: string
}

interface CreateResponse {
  name: string
}

@Injectable({providedIn: 'root'})
export class TodosService {
  static url = 'https://jira-clone-16d01-default-rtdb.firebaseio.com/todos'

  constructor(private http: HttpClient) {
  }

  load(): Observable<ITodo[]> {
    return this.http
      .get<ITodo[]>(`${TodosService.url}.json`)
      .pipe(map(todos => {
        if (!todos) {
          return []
        }
        return Object.keys(todos).map(key => ({...todos[key], id: key}))
      }))
  }

  create(todo: ITodo): Observable<ITodo> {
    return this.http
      .post<CreateResponse>(`${TodosService.url}.json`, todo)
      .pipe(map(res => {
        return {...todo, id: res.name}
      }))
  }

  remove(todo: ITodo): Observable<void> {
    return this.http
      .delete<void>(`${TodosService.url}/${todo.id}.json`)
  }

}
