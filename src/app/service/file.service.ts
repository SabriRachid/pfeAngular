import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {saveAs } from 'file-saver';
import { HttpHeaders } from '@angular/common/http';
@Injectable()
export class FileService {
  private baseUrl = 'http://localhost:8080/api';
  private jwtToken = null;
  constructor(private http: Http) { }

  public getFile(filename): Observable<Blob> {
    const options = new HttpHeaders( { 'Authorization' : this.jwtToken});

    return this.http.get(this.baseUrl + '/documents/' + filename)
            .map((response: Response) => <Blob>response.blob());
}
loadToken() {
  this.jwtToken = localStorage.getItem('token');
}
}
