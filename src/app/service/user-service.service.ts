import { Injectable } from '@angular/core';
import { User } from '../user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserServiceService {

 private baseURL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {  }



  save(user: User) {
    return this.http.post(this.baseURL + '/register', user);
  }
  getAllUsers() {
    return this.http.get(this.baseURL + '/users' );
  }

}
