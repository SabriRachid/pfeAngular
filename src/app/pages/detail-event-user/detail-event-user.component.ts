import { Component, OnInit } from '@angular/core';
import { Router , Params , ActivatedRoute } from '@angular/router';
import { EventServiceService } from '../../service/event-service.service';
import { AuthenticationServiceService } from '../../service/authentication-service.service';
@Component({
  selector: 'app-detail-event-user',
  templateUrl: './detail-event-user.component.html',
  styleUrls: ['./detail-event-user.component.css']
})
export class DetailEventUserComponent implements OnInit {
  id: number;
  evenement: any;
  constructor(private auth: AuthenticationServiceService,
    private router: Router, private activateRoute: ActivatedRoute, private eventService: EventServiceService) { }

  ngOnInit() { this.id = this.activateRoute.snapshot.params['id'];
  this.eventService.getEventById(this.id).subscribe( data => {
    this.evenement = data;
  });
}
retour() {
  this.router.navigateByUrl('/evenement');
}

}
