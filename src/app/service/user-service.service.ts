import { Injectable } from '@angular/core';
import { User } from '../user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserServiceService {

 private baseURL = 'http://localhost:8080/api';
 private baseURLManager = 'http://localhost:8080/api/users';
 private jwtToken = null;

  constructor(private http: HttpClient) {  }

  loadToken() {
    this.jwtToken = localStorage.getItem('token');
}
  save(user: User) {
    return this.http.post(this.baseURL + '/register', user);
  }
  getAllUsers() {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.baseURL + '/users' , { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})} );
  }

  getAllUserByRoleUser() {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.baseURLManager + '/roleUser' , { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})} );
  }

  saveManager(user: User) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.post(this.baseURLManager + '/manager', user , { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})} );
  }
  getAllUserByRoleManager() {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.baseURLManager + '/roleManager' , { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
  }
  getTotalCompteNonActive() {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.baseURLManager + '/statistique', { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
  }
  getUserById(id) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.baseURL + '/users/' + id, { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
  }

}
