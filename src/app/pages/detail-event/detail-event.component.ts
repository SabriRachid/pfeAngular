import { Component, OnInit } from '@angular/core';
import { Router , Params , ActivatedRoute } from '@angular/router';
import { EventServiceService } from '../../service/event-service.service';


@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrls: ['./detail-event.component.css']
})
export class DetailEventComponent implements OnInit {
id: number;
evenement: any;

  constructor(
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
}
