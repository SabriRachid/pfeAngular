import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';
import { User } from '../user';
@Injectable()
export class AuthenticationServiceService {

  private host = 'http://localhost:8080';
  private URL = 'http://localhost:8080/api';
  private jwtToken = null;
  public username;
  private roles: Array<any> ;
  public loggedInUser: User;
  public isAuthenticated = false ;
  private subject ;
  public logedUser;
  i: number;

  constructor(private http: HttpClient, private router: Router) { }

  login(user) {
    return this.http.post(this.host + '/login' , user, { observe: 'response'});
  }

  saveToken(jwt: string) {
    this.jwtToken = jwt;
    localStorage.setItem('token', jwt);
    const jwtHelper = new JwtHelper();
    this.roles = jwtHelper.decodeToken(this.jwtToken).roles;
     this.username = jwtHelper.decodeToken(this.jwtToken).sub;
    console.log(this.subject);

  }
  loadToken() {
       this.jwtToken = localStorage.getItem('token');
       this.isAuthenticated = true;
  }

  getUserByUsername() {
    if (this.jwtToken == null) {
      this.loadToken();
    }
     return this.http.get(this.URL + '/users/JWT/' + this.username, { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
  }
  getProfileByUsername() {
    if (this.jwtToken == null) {
      this.loadToken();
    }
     return this.http.get(this.URL + '/profiles/JWT/' + this.username, { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
  }

  getTacheByUsername() {
    if (this.jwtToken == null) {
      this.loadToken();
    }
     return this.http.get(this.URL + '/tasks/Auth/' + this.username, { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
  }

  getEventByUsername() {
    if (this.jwtToken == null) {
      this.loadToken();
    }
     return this.http.get(this.URL + '/events/Auth/' + this.username, { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
  }
getTotalTacheByUsername() {
  if (this.jwtToken == null) {
    this.loadToken();
  }
   return this.http.get(this.URL + '/tasks/total/' + this.username, { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
}

  logout() {
    this.jwtToken = null;
    this.isAuthenticated = false;
    localStorage.removeItem('token');
  }

   isAdmin() {
      for (const i of this.roles) {
        if ( i.authority === 'ROLE_ADMIN') {
          return true;
        }
      }
      return false;
  }
  isUser() {
    for (const i of this.roles) {
      if ( i.authority === 'ROLE_USER') {
        return true;
      }
    }
    return false;
}

  isLoggedIn(): boolean {
    if (this.isAuthenticated ) {
      return true;
    }
    return false;
  }
}
