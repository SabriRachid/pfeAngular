import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { Task } from '../task';
@Injectable()
export class AttachementServiceService {

  private jwtToken = null;
  private url = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }

  pushFileToStorage(file: File ): Observable<HttpEvent<{}>> {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', 'http://localhost:8080/api/attachements/upload', formdata, {
      reportProgress: true,
      responseType: 'text',
      headers : new HttpHeaders( { 'Authorization' : this.jwtToken})
    }
    );
    return this.http.request(req);
  }
  loadToken() {
    this.jwtToken = localStorage.getItem('token');
  }
  saveAttachement(attachement) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.post(this.url + '/attachements', attachement,  { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
  }
  getAllAttachement() {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.url + '/attachements',  { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
  }
  deleteAttachement(id) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.delete(this.url + '/attachements/' + id ,
     { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
  }
  pushFileToStorageServer(file: File): Observable<HttpEvent<{}>> {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', 'http://localhost:8080/api/attachements/upload', formdata, {
      reportProgress: true,
      responseType: 'text',
      headers: new HttpHeaders({ 'Authorization': this.jwtToken })
    });
    return this.http.request(req);
  }
  getFiles(): Observable<any> {
    return this.http.get(this.url + '/attachements/getallfiles', { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
  }
getAttachementByTache(id) {
  if (this.jwtToken == null) {
    this.loadToken();
  }
  return this.http.get(this.url + '/attachements/tache/' + id , { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
}
}
