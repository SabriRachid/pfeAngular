import { Component, OnInit } from '@angular/core';
import { FileUploadServiceService } from '../../service/file-upload-service.service';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { Document } from '../../document';
import {saveAs } from 'file-saver';
import { AuthenticationServiceService } from '../../service/authentication-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  selectedFiles: FileList;
  currentFileUpload: File;
  documents: any;
  documentsPrive: any;
  motCle: string;
  filename: any;
  document: Document = new Document();
  progress: { percentage: number } = { percentage: 0 };
  constructor(private fileUploadService: FileUploadServiceService, private router: Router,
     private auth: AuthenticationServiceService) { }

  ngOnInit() {
    this.getAllDocuments();
    this.getAllDocumentsPrivate();
  }

 selectFile(event) {
   this.selectedFiles = event.target.files;
 }
 upload() {
  this.progress.percentage = 0;
   this.currentFileUpload = this.selectedFiles.item(0);
   this.fileUploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
    if (event.type === HttpEventType.UploadProgress) {
      this.progress.percentage = Math.round(100 * event.loaded / event.total);
    } else if (event instanceof HttpResponse) {
      console.log('File is completely uploaded!');

    }
   });
   this.selectedFiles = undefined;
 }
 savedocument() {

   this.fileUploadService.saveDocument(this.document).subscribe(data => {
     console.log(data);
   }, err => {
     console.log(err);
   });
   this.document = new Document();
 }
 getAllDocuments() {
   this.fileUploadService.getAllDocument().subscribe(data => {
     this.documents = data;
     console.log(data);
   }, err => {
     console.log(err);
   });
 }

 getAllDocumentsPrivate() {
  this.fileUploadService.getAllDocumentPrivate().subscribe(data => {
    this.documentsPrive = data;
    console.log(data);
  }, err => {
    console.log(err);
  });
}

 onDownloadFile(document) {
 // window.open(window.URL.createObjectURL(data));
  this.fileUploadService.getDocumentByFileName(document.file).subscribe( data => {
   // this.filename = data;
   console.log(document.file);
   this.downloadFile(data);
  }, err => {
    console.log(err + 'error telechargement fichier');
    console.log(document.file);
  }, () => {
    console.log('ok');
  });
 }

  downloadFile(response: any): void {
  /* const blob = new Blob([data.blob()], { type: 'application/pdf' });
  const url = window.URL.createObjectURL(blob);
  window.open(url); */
  const contentDispo: string = response.headers.get('Content-Disposition');
  const parts: string[] = contentDispo.split('.');
    const file = parts[1].split('=')[1];
    const blob = new Blob([response.body], {type: 'application/pdf'});
    saveAs(blob, file);

}
onArchiveDoc(docm) {
  this.fileUploadService.archiveDoc(docm).subscribe(() => {
    console.log('Document  archived ... !!!');
    this.router.navigateByUrl('/archive');
  }, err => {
    console.log(err);
  });
}

}
