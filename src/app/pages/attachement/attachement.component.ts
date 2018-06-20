import { Component, OnInit } from '@angular/core';
import { Task } from '../../task';
import { Attachement } from '../../attachement';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AttachementServiceService } from '../../service/attachement-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskServiceService } from '../../service/task-service.service';
import { AuthenticationServiceService } from '../../service/authentication-service.service';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-attachement',
  templateUrl: './attachement.component.html',
  styleUrls: ['./attachement.component.css']
})
export class AttachementComponent implements OnInit {
  selectedFiles: FileList;
  currentFileUpload: File;
  task: any;
  id: number;
  tasks: any;
  taskById: any;
  attachementTache: any;
  allAttachement: any;
  progress: { percentage: number } = { percentage: 0 };
  attachement: Attachement = new Attachement();
  constructor(private attachementService: AttachementServiceService, private activateRoute: ActivatedRoute,
    private auth: AuthenticationServiceService, private router: Router, private taskSerive: TaskServiceService) { }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.params['id'];
    this.getAllTasks();
    this.getTaskbyId();
    this.getAttachementByTacheID();
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  upload() {

    this.currentFileUpload = this.selectedFiles.item(0);
    console.log(this.task);
    this.attachementService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');

      }
    });
    this.selectedFiles = undefined;
  }
  downloadAttToSave(attachement) {
    this.taskSerive.getFile(attachement.file).subscribe(res => {
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
  getAllAttachement() {
    this.attachementService.getAllAttachement().subscribe( data => {
      this.allAttachement = data;
      console.log(data);
    }, err => {
      console.log(err);
    });
  }
  saveAttachement() {
    this.attachement.tache =  this.taskById;
    this.attachementService.saveAttachement(this.attachement).subscribe(data => {
     // this.getAllAttachement();
      this.getAttachementByTacheID();
      console.log(data);
    }, err => {
      console.log(err);
    });
    this.attachement = new Attachement();
  }
  getAllTasks() {
    return this.taskSerive.getAllTasks().subscribe(data => {
      this.tasks = data;
      console.log(data);
    }, err => {
      console.log(err);
    });
  }
  getTaskbyId() {
    this.taskSerive.getTaskById(this.id).subscribe(data => {
      this.taskById = data ;
    });
  }
  onDeleteAttachement(att) {
    this.attachementService.deleteAttachement(att.id).subscribe(() => {
      console.log('deleted  ... !!!' + att.id);
      this.getAttachementByTacheID();

      // this.router.navigateByUrl('/tache');
    });
  }
  getAttachementByTacheID() {
    this.attachementService.getAttachementByTache(this.id).subscribe(data => {
      this.attachementTache = data;
    });
  }
}
