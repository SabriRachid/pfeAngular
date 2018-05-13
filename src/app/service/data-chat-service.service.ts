import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';

@Injectable()
export class DataChatServiceService {
  private jwtToken = null;
  private baseUrl = 'http://localhost:8080/api/tasks';
  constructor(private http: HttpClient) { }
  loadToken() {
    this.jwtToken = localStorage.getItem('token');
}
getTotalTacheEncours() {
  if (this.jwtToken == null) {
    this.loadToken();
  }
  return this.http.get(this.baseUrl + '/encours' ,  { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
}

getTotalTacheNonCommence() {
  if (this.jwtToken == null) {
    this.loadToken();
  }
  return this.http.get(this.baseUrl + '/nonCommence' ,  { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
}

getTotalTacheTermine() {
  if (this.jwtToken == null) {
    this.loadToken();
  }
  return this.http.get(this.baseUrl + '/termine' ,  { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
}

getTotalTacheAnnule() {
  if (this.jwtToken == null) {
    this.loadToken();
  }
  return this.http.get(this.baseUrl + '/annule' ,  { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
}



}
