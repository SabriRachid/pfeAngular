import { Component, OnInit } from '@angular/core';
import { EventServiceService } from '../../service/event-service.service';
import { Evenement } from '../../event';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from '../../service/authentication-service.service';

@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.css']
})
export class EvenementComponent implements OnInit {

  evenement: Evenement = new Evenement();
  evenements: any;
  nomEvenement: string;
  event: any ;
  motCle: string;
  eventLoggedUser: any;
  p: number;
  collection =  [];
  constructor(private eventService: EventServiceService, private router: Router,
  private auth: AuthenticationServiceService) { }

  ngOnInit() {

    this.event = this.eventService.getter();
   this.getAllEvents();
   this.findEventByUser();
  }
getAllEvents() {
  this.eventService.getAllEvent().subscribe(data => {
    this.evenements = data;
  } , err => {
    console.log('erreur', err);
  });
}

  saveEvent(valid: boolean ) {
    this.eventService.save(this.evenement).subscribe(data => {
      console.log(data);
    }, err => {
      console.log('erreur', err);
    });
   this.evenement = new Evenement();

  }

  deleteEvent(event) {
    this.eventService.deleteEvent(event.id).subscribe( data => {
      console.log(event.id);
      this.router.navigateByUrl('/home');

    }, err => {
      console.log(err);
    });
this.getAllEvents();
this.router.navigateByUrl('/evenement');
  }
  onUpdateEvent(value) {
    this.eventService.updateEvent(value).subscribe(data => {
     // this.evenements = data;
      console.log(data);
    }, err => {
      console.log(err);
    });
  }

  findEventById(event) {
   this.eventService.getEventById(event);
  }
  detailEvent(event) {
    this.router.navigate(['/detailEvent', event.id]);
  }
  detailEventUser(event) {
    this.router.navigate(['/detailEventUser', event.id]);
  }
  findEventByUser() {
    this.auth.getEventByUsername().subscribe(data => {
      this.eventLoggedUser = data;
    });
  }
  onArchiveEvent(event) {
    this.eventService.archiveEvent(event).subscribe(data => {
      console.log(data);
      this.router.navigateByUrl('/archive');
    });
  }

}
