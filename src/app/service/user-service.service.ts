import { Injectable } from '@angular/core';
import { User } from '../user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class UserServiceService {
private users: User;
 private baseURL = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }



  save(user: User) {
    return this.http.post(this.baseURL, user);
  }
  getAllUsers() {
    return this.http.get(this.baseURL);
  }

}
