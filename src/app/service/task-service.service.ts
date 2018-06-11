import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';
import {Observable} from 'rxjs/Observable';
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
    return this.http.get(this.host + '/roleUser' , { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
  }
  loadToken() {
    this.jwtToken = localStorage.getItem('token');
}

saveTask(task) {
  if (this.jwtToken == null) {
    this.loadToken();
  }
return this.http.post(this.hostTask + '/tasks', task , { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})} );
}
updateTask(task) {
  if (this.jwtToken == null) {
    this.loadToken();
  }
return this.http.put(this.hostTask + '/tasks/' + task.id, task , { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})} );
}
getAllTasks() {
  if (this.jwtToken == null) {
    this.loadToken();
  }
  return this.http.get( this.hostTask + '/tasks', { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
}

deleteTask(id) {
  if (this.jwtToken == null) {
    this.loadToken();
  }
return  this.http.delete(this.hostTask + '/tasks/' + id , { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
}

getTaskById(id): Observable<any> {
  if (this.jwtToken == null) {
    this.loadToken();
  }
  return this.http.get(this.hostTask + '/tasks/' + id, { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
}
saveComment(comment) {
  if (this.jwtToken == null) {
    this.loadToken();
  }
  return this.http.post(this.hostTask + '/tasks/comment' , comment , { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
}
getTotalTache() {
  if (this.jwtToken == null) {
    this.loadToken();
  }
  return this.http.get(this.hostTask + '/tasks/total' , { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});

}
getCommentByTacheId(id) {
  if (this.jwtToken == null) {
    this.loadToken();
  }
  return this.http.get(this.hostTask + '/tasks/comment/' + id, { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
}
getArchivedTache() {
  if (this.jwtToken == null) {
    this.loadToken();
  }
  return this.http.get(this.hostTask + '/tasks/archives' , { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});

}
archiveTask(task) {
  if (this.jwtToken == null) {
    this.loadToken();
  }
  return this.http.put(this.hostTask + '/tasks/archive/' + task.id , task,  {
    headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
}
restoreTask(task) {
  if (this.jwtToken == null) {
    this.loadToken();
  }
  return this.http.put(this.hostTask + '/tasks/restore/' + task.id , task,  {
    headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
}
}

