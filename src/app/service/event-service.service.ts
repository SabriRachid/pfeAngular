import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Evenement } from '../event';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class EventServiceService {
  private event: Evenement ;
  private baseURL = 'http://localhost:8080/api/events';

  constructor(private http: HttpClient) { }
  save(event: Evenement) {
    return this.http.post(this.baseURL, event);
  }
  getAllEvent() {
    return  this.http.get(this.baseURL);
  }
}
