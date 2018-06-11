import { Component, OnInit } from '@angular/core';
import { Router , Params , ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../../service/user-service.service';
import { TaskServiceService } from '../../service/task-service.service';
import { Task } from '../../task';
import { AuthenticationServiceService } from '../../service/authentication-service.service';
import { Commentaire } from '../../comment';
import { Observable } from 'rxjs/Observable';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AttachementServiceService } from '../../service/attachement-service.service';
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
  constructor(private auth: AuthenticationServiceService , private attachementService: AttachementServiceService,
    private router: Router, private activateRoute: ActivatedRoute, private tacheService: TaskServiceService) { }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.params['id'];
     this.tacheService.getTaskById(this.id).subscribe( data => {
       this.task = data;
     });
     this.getAllAttachement();
     this.commentTacheByID();
  }
  commentTacheByID() {
    this.tacheService.getCommentByTacheId(this.id).subscribe(data => {
      this.commentTache = data;
    });
  }
  onDeleteAttachement(att) {
    this.attachementService.deleteAttachement(att).subscribe(() => {
      console.log('deleted  ... !!!' + att.id);
      this.router.navigateByUrl('/tache');
    });
  }
  retour() {
    this.router.navigate(['/taches']);
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
  getAllAttachement() {
    this.attachementService.getAllAttachement().subscribe( data => {
      this.allAttachement = data;
      console.log(data);
    }, err => {
      console.log(err);
    });
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
  editTask() {
    this.tacheService.updateTask(this.task).subscribe(data => {
      console.log(data);
      this.submitedTask = true;
      this.messageTask = 'Tache modifié avec success ..';
    }, err => {
      console.log(err);
    });
  }

}
