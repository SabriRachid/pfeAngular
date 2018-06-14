import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Evenement } from '../event';
import { User } from '../user';
import { Observable } from 'rxjs/Observable';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class EventServiceService {
  private jwtToken = null;
  private event: Evenement;
  private baseURL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }
  loadToken() {
    this.jwtToken = localStorage.getItem('token');
}
  save(event) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.post(this.baseURL + '/events', event , { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
  }
  getAllEvent(): Observable<any> {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return  this.http.get(this.baseURL + '/events' , { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
  }

  deleteEvent(id) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
   return  this.http.delete(this.baseURL + '/events/' + id , { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
  }
  updateEvent(event): Observable<any> {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.put(this.baseURL + '/events/' + event.id, event,  { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
  }
  getEventById(id): Observable<any> {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.baseURL + '/events/' + id,  { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
  }

  getter() {
    return this.event;
  }
  setter(event: Evenement) {
    this.event = event;
  }

  getTotalEvent() {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.baseURL + '/events/totale',  { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});

  }

  archiveEvent(event) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.put(this.baseURL + '/events/archive/' + event.id , event,  {
      headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
  }

  getByArchiveTrue() {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.baseURL + '/events/archives' , {  headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
  }
  getEventUserProfile(id) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.baseURL + '/events/contact/' + id ,  {
      headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
  }
}
