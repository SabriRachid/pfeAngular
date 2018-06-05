import { Component, OnInit } from '@angular/core';
import { Router , Params , ActivatedRoute } from '@angular/router';
import { EventServiceService } from '../../service/event-service.service';
import { AuthenticationServiceService } from '../../service/authentication-service.service';


@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrls: ['./detail-event.component.css']
})
export class DetailEventComponent implements OnInit {
id: number;
evenement: any;
submited = false;
messageEvent: string;
  constructor( private auth: AuthenticationServiceService,
    private router: Router, private activateRoute: ActivatedRoute, private eventService: EventServiceService) { }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.params['id'];
    this.eventService.getEventById(this.id).subscribe( data => {
      this.evenement = data;
    });
  }
  retour() {
    this.router.navigateByUrl('/evenement');
  }
  updateEvent() {
    this.eventService.updateEvent(this.evenement).subscribe(data => {
      console.log(data);
      this.submited = true;
      this.messageEvent = 'Evenement Modifié avec success ...';
    }, err => {
      console.log(err);
    });
  }
}
