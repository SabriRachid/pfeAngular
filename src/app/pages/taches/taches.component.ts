import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AuthenticationServiceService } from '../../service/authentication-service.service';
import { Router } from '@angular/router';
import { TaskServiceService } from '../../service/task-service.service';
import { User } from '../../user';
import { Task } from '../../task';
import { Attachement } from '../../attachement';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { AttachementServiceService } from '../../service/attachement-service.service';
import { Observable } from 'rxjs/Observable';
import { saveAs } from 'file-saver';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-taches',
  templateUrl: './taches.component.html',
  styleUrls: ['./taches.component.css']
})
export class TachesComponent implements OnInit {
  @Input() fileUpload: string;
  @ViewChild('fo') public createAttachement: NgForm;
  isAdmin: boolean;
  submitFormTache = false;
  messageTache: string;
  selectedFiles: FileList;
  currentFileUpload: File;
  task: Task = new Task();
  users: any;
  motCle: string;
  nom: string;
  prenom: string;
  currentTask: any;
  tasks: any;
  TacheLoggedUser: any;
  p: number;
  showFile = false;
  fileUploads: Observable<string[]>;
  allAttachement: any;
  progress: { percentage: number } = { percentage: 0 };
  attachement: Attachement = new Attachement();
  collection = [];
  constructor(private attachementService: AttachementServiceService,
    private auth: AuthenticationServiceService, private router: Router, private taskSerive: TaskServiceService) { }

  ngOnInit() {
    //  this.isAdmin = this.authService.isAdmin();
    this.getAllUserRole();
    this.getAllTasks();
    this.getTacheByLoggedUser();
    this.getAllAttachement();
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  upload() {
    this.currentTask = this.task;
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

  onNewTask() {

    this.taskSerive.saveTask(this.task).subscribe(data => {
      console.log(data);
      this.submitFormTache = true;
      this.messageTache = 'Tache ajouter avec success ...';
      this.getAllTasks();
      this.currentTask = data;
      console.log('tache = ' + this.currentTask.id);
     this.router.navigate(['attachement', this.currentTask.id]);
    }, err => {
      console.log(err);
    });
   // this.router.navigate(['/taches', this.task]);
  }

  getAllUserRole() {
    return this.taskSerive.getAllUserByRoleUser().subscribe(data => {
      this.users = data;
      console.log(data);
    }, err => {
      console.log(err);
    });
  }

  getAllTasks() {
    return this.taskSerive.getAllTasks().subscribe(data => {
      this.tasks = data;
      console.log(data);
      this.p = 10;
      this.collection.push(data);
    }, err => {
      console.log(err);
    });
  }
  onDeleteTask(task) {
    this.taskSerive.deleteTask(task.id).subscribe(data => {
      console.log(task.id);
    }, err => {
      console.log(err);
    });
  }
  detailTache(task) {
    this.router.navigate(['/detailTache', task.id]);
  }
  saveAttachement() {
    this.attachement.tache = this.task;
    this.attachementService.saveAttachement(this.attachement).subscribe(data => {
      this.getAllAttachement();
      console.log(data);
    }, err => {
      console.log(err);
    });
    this.attachement = new Attachement();
  }
  uploadFile() {
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    this.attachementService.pushFileToStorageServer(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
        this.getAllAttachement();

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
    const blob = new Blob([response['body']], { type: response.headers.get('Content-Type') });
    /*   const url = window.URL.createObjectURL(blob);
      window.open(url); */
    saveAs(blob, filename);
  }
  showFiles(enable: boolean) {
    this.showFile = enable;

    if (enable) {
      this.fileUploads = this.attachementService.getFiles();
    }
  }
  getTacheByLoggedUser() {
    this.auth.getTacheByUsername().subscribe(data => {
      this.TacheLoggedUser = data;
    });
  }
  onArchivedTask(task) {
    this.taskSerive.archiveTask(task).subscribe(data => {
      console.log(data);
      this.getAllTasks();

    });
  }
  getAllAttachement() {
    this.attachementService.getAllAttachement().subscribe(data => {
      this.allAttachement = data;
      console.log(data);
    }, err => {
      console.log(err);
    });
  }

  onDeleteAttachement(att) {
    this.attachementService.deleteAttachement(att.id).subscribe(() => {
      console.log('deleted  ... !!!' + att.id);
      this.getAllAttachement();
      // this.router.navigateByUrl('/tache');
    });
  }
}
