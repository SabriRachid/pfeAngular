import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationServiceService } from '../../service/authentication-service.service';
import { Router } from '@angular/router';
import { TaskServiceService } from '../../service/task-service.service';
import { User } from '../../user';
import { Task } from '../../task';
import { Attachement } from '../../attachement';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { AttachementServiceService } from '../../service/attachement-service.service';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-taches',
  templateUrl: './taches.component.html',
  styleUrls: ['./taches.component.css']
})
export class TachesComponent implements OnInit {
  @Input() fileUpload: string;
isAdmin: boolean ;
submitForm = false;
selectedFiles: FileList;
currentFileUpload: File;
task: Task = new Task();
users: any;
motCle: string;
nom: string;
prenom: string;
tasks: any;
p: number ;
showFile = false;
fileUploads:  Observable<string[]>;

  progress: { percentage: number } = { percentage: 0 };
attachement: Attachement = new Attachement();
collection =  [];
  constructor(private attachementService: AttachementServiceService,
    private authService: AuthenticationServiceService, private router: Router, private taskSerive: TaskServiceService) { }

  ngOnInit() {
  //  this.isAdmin = this.authService.isAdmin();
this.getAllUserRole();
this.getAllTasks();
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  upload() {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.attachementService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
     if (event instanceof HttpResponse) {
        console.log('upload de fichier avec success!');

      }
    });
    this.selectedFiles = undefined;
  }

  onNewTask(valid: boolean) {

     this.taskSerive.saveTask(this.task).subscribe(data => {
     console.log(data);
    }, err => {
      console.log(err);
    });
    this.submitForm = true;
    this.task = new Task();
  }
  getAllUserRole() {
   return  this.taskSerive.getAllUserByRoleUser().subscribe(data => {
        this.users = data;
        console.log(data);
    } , err => {
      console.log(err);
    });
  }

  getAllTasks() {
    return this.taskSerive.getAllTasks().subscribe(data => {
      this.tasks = data ;
      console.log(data);
      this.p = 10;
      this.collection.push(data);
    }, err => {
      console.log(err);
    });
  }
  onDeleteTask(task) {
    this.taskSerive.deleteTask(task.id).subscribe( data => {
      console.log(task.id);
    } , err => {
      console.log(err);
    });
  }
  detailTache(task) {
 this.router.navigate(['/detailTache', task.id] );
  }
  saveAttachement() {

    this.attachementService.saveAttachement(this.attachement).subscribe(data => {
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

      }
    });

    this.selectedFiles = undefined;
  }
  showFiles(enable: boolean) {
    this.showFile = enable;

    if (enable) {
      this.fileUploads = this.attachementService.getFiles();
    }
  }
}
