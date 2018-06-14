import { Component, OnInit } from '@angular/core';
import { FileUploadServiceService } from '../../service/file-upload-service.service';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { Document } from '../../document';
import { saveAs } from 'file-saver';
import { AuthenticationServiceService } from '../../service/authentication-service.service';
import { Router } from '@angular/router';
import { FileService } from '../../service/file.service';
import {Observable} from 'rxjs/Observable';
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
  submitedFormDoc = false;
  messageFormDOc: string;
  document: Document = new Document();
  progress: { percentage: number } = { percentage: 0 };
  constructor(private fileUploadService: FileUploadServiceService, private router: Router,
    private auth: AuthenticationServiceService, private fileService: FileService) { }

  ngOnInit() {
    this.getAllDocuments();
    this.getAllDocumentsPrivate();
  }
  SaveDemo() {
    const file = new Blob(['hello world'], { type: 'text/csv;charset=utf-8' });
    saveAs(file, 'helloworld.csv');
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
      this.getAllDocuments();
      this.getAllDocumentsPrivate();
      this.submitedFormDoc = true;
      this.messageFormDOc = 'Document ajouter avec succéss .... ';
    }, err => {
      this.messageFormDOc = 'Erreur! Vérifier votre Document ... ';
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
  downloadFileToSave(document) {
    this.fileUploadService.getFile(document.file).subscribe(res => {
      this.saveToFileSystem(res);
    });
  }
  private saveToFileSystem(response) {
    console.log('file download response:', response);
    const contentDispositionHeader: string = response.headers.get('Content-Disposition');
    console.log(contentDispositionHeader);
    const parts: string[] = contentDispositionHeader.split(';');
    const filename = parts[1].split('=')[1];
    const blob = new Blob([response['body']], { type: response.headers.get('Content-Type')});
  /*   const url = window.URL.createObjectURL(blob);
    window.open(url); */
    saveAs(blob, filename);
  }
  downloadFile(response) {
 /*    const blob = new Blob([response.body], { type: response.headers.get('Content-Type')});
    console.log(blob);
    const contentDispo: string = response.headers.get('Content-Disposition');
    console.log(contentDispo);
    const parts: string[] = contentDispo.split('.');
    console.log(parts);
    const filename = parts[1].split('=')[1];
    saveAs(blob, filename); */
    console.log('file download response:', response);

    const contentDispositionHeader: string = response.headers.get('Content-Disposition');
    const parts: string[] = contentDispositionHeader.split(';');
    const filename = parts[1].split('=')[1];
    const blob = new Blob([response['body']], { type: response.headers.get('Content-Type')});
    /*var url= window.URL.createObjectURL(blob);
    window.open(url);*/
    saveAs(blob, 'search-csv.csv');
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
