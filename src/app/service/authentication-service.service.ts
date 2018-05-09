import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';
@Injectable()
export class AuthenticationServiceService {

  private host = 'http://localhost:8080';
  private jwtToken = null;
  private roles: Array<any> ;
  public isAuthenticated = false ;
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
  }
  loadToken() {
       this.jwtToken = localStorage.getItem('token');
  }

  getTasks() {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get( this.host + '/tasks', { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
  }

  logout() {
    this.jwtToken = null;
    localStorage.removeItem('token');
  }

/*   isAdmin() {
      for (const i of this.roles) {
        if ( i.authority === 'ROLE_ADMIN') {
          return true;
        }
      }
      return false;
  } */
}
