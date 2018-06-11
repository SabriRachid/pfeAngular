import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ArchiveService {
  private jwtToken = null;
  private url = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }
  loadToken() {
    this.jwtToken = localStorage.getItem('token');
  }
  getTotalTacheArchive() {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.url + '/tasks/totale/archive',  { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
  }
  getTotalEventArchive() {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.url + '/events/totale/archive',  { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
  }
  getTotalDocumentArchive() {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.url + '/documents/totale/archive',  { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
  }
}
