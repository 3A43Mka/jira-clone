import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { auth } from 'firebase';
import { Subject, Observable } from 'rxjs';
import { User } from '../models/user';
import { Task } from '../models/task';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  databaseURL = 'https://jira-clone-16d01-default-rtdb.firebaseio.com/';
  constructor(private afAuth: AngularFireAuth, private http: HttpClient) {
  }
  signUpError = new Subject();

  async createUser(userData) {
    const { username, email, password } = userData;
    if (!username) {
      return this.signUpError.next("Username must be providen");
    }
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      await result.user.updateProfile({
        displayName: username,
      });
      this.addUserToDB({
        username,
        email,
        userId: result.user.uid,
      }).subscribe((res) => {
        console.log(res)
      });
    } catch (error) {
      this.signUpError.next(error.message);
    }
  }

  addUserToDB = (user: User): Observable<any> =>
    this.http.post<User>(this.databaseURL + '/users' + '.json', user);

  getUsers() {
    return this.http.get<User[]>(this.databaseURL + '/users' + '.json').pipe(
      map((res) => {
        return res
          ? Object.keys(res).map((key) => ({ ...res[key], id: key }))
          : [];
      })
    );
  }
}
