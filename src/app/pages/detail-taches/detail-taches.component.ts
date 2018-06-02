import { Component, OnInit } from '@angular/core';
import { Router , Params , ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../../service/user-service.service';
import { TaskServiceService } from '../../service/task-service.service';
import { Task } from '../../task';
import { AuthenticationServiceService } from '../../service/authentication-service.service';
import { Commentaire } from '../../comment';

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
  commentaire: Commentaire = new Commentaire();
  constructor(private auth: AuthenticationServiceService ,
    private router: Router, private activateRoute: ActivatedRoute, private tacheService: TaskServiceService) { }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.params['id'];
     this.tacheService.getTaskById(this.id).subscribe( data => {
       this.task = data;
     });
  }
  retour() {
    this.router.navigate(['/taches']);
  }
  onNewComment(valid) {

    this.tacheService.saveComment(this.commentaire).subscribe( data => {
      console.log(data);
    }, err => {
      console.log(err);
    });
  }
}
