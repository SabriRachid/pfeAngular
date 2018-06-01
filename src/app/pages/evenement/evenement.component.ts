import { Component, OnInit } from '@angular/core';
import { EventServiceService } from '../../service/event-service.service';
import { Evenement } from '../../event';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.css']
})
export class EvenementComponent implements OnInit {

  evenement: Evenement = new Evenement();
  evenements: any;
  event: any ;
  p: number;
  collection =  [];
  constructor(private eventService: EventServiceService, private router: Router) { }

  ngOnInit() {

    this.event = this.eventService.getter();
   this.getAllEvents();
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

  onDeleteEvent(event) {
    this.eventService.deleteEvent(event.id).subscribe( data => {
      console.log(event.id);

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
  detailEvenet(event) {
    this.router.navigate(['/detailEvent', event.id]);
  }

}
