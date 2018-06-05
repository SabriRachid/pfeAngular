import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';
@Injectable()
export class ProfileServiceService {
  private URL = 'http://localhost:8080/api';
  private jwtToken = null;
  constructor(private http: HttpClient) { }
  loadToken() {
    this.jwtToken = localStorage.getItem('token');
}

getAllProfile() {
  if (this.jwtToken == null) {
    this.loadToken();
  }
  return this.http.get(this.URL + '/profiles' , { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
}

editCompte(profile) {
  if (this.jwtToken == null) {
    this.loadToken();
  }
  return this.http.put(this.URL + '/profiles/compte/' + profile.id  , profile, {
    headers : new HttpHeaders( { 'Authorization' : this.jwtToken})} );
}
editInfo(profile) {
  if (this.jwtToken == null) {
    this.loadToken();
  }
  return this.http.put(this.URL + '/profiles/info/' + profile.id  , profile, {
    headers : new HttpHeaders( { 'Authorization' : this.jwtToken})} );
}

editPassword(profile) {
  if (this.jwtToken == null) {
    this.loadToken();
  }
  return this.http.put(this.URL + '/profiles/password/' + profile.id  , profile, {
    headers : new HttpHeaders( { 'Authorization' : this.jwtToken})} );
}
}
