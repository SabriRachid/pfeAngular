import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FileUploadServiceService {
  private jwtToken = null;
  private baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }
  loadToken() {
    this.jwtToken = localStorage.getItem('token');
}
  pushFileToStorage(file: File ): Observable<HttpEvent<{}>> {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', 'http://localhost:8080/api/document/upload', formdata, {
      reportProgress: true,
      responseType: 'text',
      headers : new HttpHeaders( { 'Authorization' : this.jwtToken})
    }
    );
    return this.http.request(req);
  }

  saveDocument(document) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.post(this.baseUrl + '/documents', document,  { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
  }

  getAllDocument() {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.baseUrl + '/documents/public',  { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
  }
getDocumentByFileName(file)  {
  if (this.jwtToken == null) {
    this.loadToken();
  }
  return this.http.get(this.baseUrl + '/documents/' + file, { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
}
getTotalDocument() {
  if (this.jwtToken == null) {
    this.loadToken();
  }
  return this.http.get(this.baseUrl + '/documents/totale', { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
}

getAllArchivedDocument() {
  if (this.jwtToken == null) {
    this.loadToken();
  }
  return this.http.get(this.baseUrl + '/documents/archives',  { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
}

archiveDoc(doc) {
  if (this.jwtToken == null) {
    this.loadToken();
  }
  return this.http.put(this.baseUrl + '/documents/archive/' + doc.id ,
  doc ,  { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
}

getAllDocumentPrivate() {
  if (this.jwtToken == null) {
    this.loadToken();
  }
  return this.http.get(this.baseUrl + '/documents/prive',  { headers : new HttpHeaders( { 'Authorization' : this.jwtToken})});
}
}

