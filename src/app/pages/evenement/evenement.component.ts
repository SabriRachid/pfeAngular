import { Component, OnInit } from '@angular/core';
import { EventServiceService } from '../../service/event-service.service';
import { Evenement } from '../../event';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.css']
})
export class EvenementComponent implements OnInit {

  evenement: Evenement = new Evenement();
  evenements: any;
  constructor(private eventService: EventServiceService) { }

  ngOnInit() {
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


}
