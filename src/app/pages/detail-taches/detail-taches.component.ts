import { Component, OnInit, Input } from '@angular/core';
import { Router , Params , ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../../service/user-service.service';
import { TaskServiceService } from '../../service/task-service.service';
import { Task } from '../../task';
import { AuthenticationServiceService } from '../../service/authentication-service.service';
import { Commentaire } from '../../comment';
import { Observable } from 'rxjs/Observable';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AttachementServiceService } from '../../service/attachement-service.service';
import { Attachement } from '../../attachement';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-detail-taches',
  templateUrl: './detail-taches.component.html',
  styleUrls: ['./detail-taches.component.css']
})
export class DetailTachesComponent implements OnInit {

  id: number;
  task: any;
  tache: Task ;
  nomTache: string;
  commentTache: any;
  submited = false;
  messageComment: string;
  commentaire: Commentaire = new Commentaire();
  progress: { percentage: number } = { percentage: 0 };
  fileUploads:  Observable<string[]>;
  selectedFiles: FileList;
  currentFileUpload: File;
  submitedTask = false;
  messageTask: string;
   allAttachement: any;
  attachementTache: any;
  attachement: Attachement =  new Attachement();
  taskById: any;
  notifMessage: string;
  notifArray = new Array();
  constructor(private auth: AuthenticationServiceService , private attachementService: AttachementServiceService,
    private router: Router, private activateRoute: ActivatedRoute, private tacheService: TaskServiceService) { }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.params['id'];
    this.tacheById();
     this.getAllAttachement();
     this.commentTacheByID();
     this.getAttachementByTacheID();
  }
  tacheById() {
    this.tacheService.getTaskById(this.id).subscribe( data => {
      this.task = data;
    });
  }
  commentTacheByID() {
    this.tacheService.getCommentByTacheId(this.id).subscribe(data => {
      this.commentTache = data;
    });
  }

  retour() {
    this.router.navigate(['/taches']);
  }
  upload() {
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
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  getAllAttachement() {
    this.attachementService.getAllAttachement().subscribe( data => {
      this.allAttachement = data;
      console.log(data);
    }, err => {
      console.log(err);
    });
  }
  getAttachementByTacheID() {
    this.attachementService.getAttachementByTache(this.id).subscribe(data => {
      this.attachementTache = data;
    });
  }
  saveAttachement() {
    this.attachement.tache =  this.task;
    this.attachementService.saveAttachement(this.attachement).subscribe(data => {
     // this.getAllAttachement();
      this.getAttachementByTacheID();
      console.log(data);
    }, err => {
      console.log(err);
    });
    this.attachement = new Attachement();
  }
  editTask() {
    this.tacheService.updateTask(this.task).subscribe(data => {
      console.log(data);
      this.submitedTask = true;
      this.messageTask = 'Tache modifié avec success ..';
      this.notifMessage = '#TACHE: ' + this.task.nomTache + ' à été modifié : '  + this.task.dateModification + ' ';
      this.tacheService.saveNotification(this.notifMessage);
      console.log(this.notifArray);
    }, err => {
      console.log(err);
    });
  }
  onDeleteAttachement(att) {
    this.attachementService.deleteAttachement(att.id).subscribe(() => {
      console.log('deleted  ... !!!' + att.id);
      this.getAttachementByTacheID();
      // this.router.navigateByUrl('/tache');
    });
  }
  downloadFileToSave(attachement) {
    this.tacheService.getFile(attachement.file).subscribe(res => {
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
  onNewComment(valid) {
    this.commentaire.tache = this.task;
    this.tacheService.saveComment(this.commentaire).subscribe( data => {
      console.log(data);
     this.submited = true;
     this.commentTacheByID();
     this.messageComment = 'Laissez un autre commentaire ...';
    }, err => {
      console.log(err);
    });
    this.commentaire = new Commentaire();
  }
}
