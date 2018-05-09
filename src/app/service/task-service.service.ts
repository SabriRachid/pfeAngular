import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class TaskServiceService {
  private host = 'http://localhost:8080/api/users';
  private hostTask = 'http://localhost:8080/api';
  private jwtToken = null;
  constructor(private http: HttpClient) { }

  getAllUserByRoleUser() {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.host + '/AllByRole' , { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
  }
  loadToken() {
    this.jwtToken = localStorage.getItem('token');
}

saveTask(task) {
return this.http.post(this.hostTask + '/tasks', task , { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})} );
}

}
