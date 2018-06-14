import { Component, OnInit } from '@angular/core';
import { Router , Params , ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../../service/user-service.service';
import { Profile } from '../../profile';
import { AuthenticationServiceService } from '../../service/authentication-service.service';
import { User } from '../../user';
import { TaskServiceService } from '../../service/task-service.service';
import { EventServiceService } from '../../service/event-service.service';

@Component({
  selector: 'app-detail-profile',
  templateUrl: './detail-profile.component.html',
  styleUrls: ['./detail-profile.component.css']
})
export class DetailProfileComponent implements OnInit {

  id: number;
  profile: any;
  profileUserLogged: any;
  profileTache: any;
  loggedUser: any;
  profileEvent: any;
  constructor(private router: Router, private activateRoute: ActivatedRoute, private auth: AuthenticationServiceService,
  private userSerive: UserServiceService, private taskService: TaskServiceService, private eventService: EventServiceService) { }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.params['id'];
   this.getProfileUser();
   this.getTacheUserProfile();
   this.getEventUserProfile();
  }
getProfileUser() {
  this.userSerive.getProfileUserById(this.id).subscribe( data => {
    this.profile = data;
  });
}
  retour() {
    this.router.navigateByUrl('/profile');
  }

  getTacheUserProfile() {
    this.taskService.getTacheUserProfile(this.id).subscribe(data => {
     this.profileTache = data;
     console.log(this.id);
     console.log(data);
    });
  }
  getEventUserProfile() {
    this.eventService.getEventUserProfile(this.id).subscribe(data => {
     this.profileEvent = data;
     console.log(this.id);
     console.log(data);
    });
  }

}
