import { Component, OnInit } from '@angular/core';
import { Router , Params , ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../../service/user-service.service';
import { TaskServiceService } from '../../service/task-service.service';
import { Task } from '../../task';
import { AuthenticationServiceService } from '../../service/authentication-service.service';
import { Commentaire } from '../../comment';
import { Observable } from 'rxjs/Observable';
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
  submitedTask = false;
  messageTask: string;
  constructor(private auth: AuthenticationServiceService ,
    private router: Router, private activateRoute: ActivatedRoute, private tacheService: TaskServiceService) { }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.params['id'];
     this.tacheService.getTaskById(this.id).subscribe( data => {
       this.task = data;
     });
     this.tacheService.getCommentByTacheId(this.id).subscribe(data => {
       this.commentTache = data;
     });
  }
  retour() {
    this.router.navigate(['/taches']);
  }
  onNewComment(valid) {
    this.commentaire.tache = this.task;
    this.tacheService.saveComment(this.commentaire).subscribe( data => {
      console.log(data);
     this.submited = true;
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
