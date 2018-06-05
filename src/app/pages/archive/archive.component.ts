import { Component, OnInit } from '@angular/core';
import { EventServiceService } from '../../service/event-service.service';
import { Router } from '@angular/router';
import { TaskServiceService } from '../../service/task-service.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  archivedEvent: any;
  archivedTask: any;
  constructor(private taskService: TaskServiceService, private eventService: EventServiceService , private router: Router) { }

  ngOnInit() {
    this.getAllEventArchived();
    this. getAllTaskArchived();
  }
  getAllEventArchived() {
    this.eventService.getByArchiveTrue().subscribe(data => {
      this.archivedEvent = data;
      console.log(data);
    }, err => {
      console.log(err);
    });
  }
  deleteEventArchive(event) {
    this.eventService.deleteEvent(event.id).subscribe(() => {
      console.log(event.id + 'deleted !!!');
      this.router.navigateByUrl('/home');
    }, err => {
      console.log(err);
    });
  }
  getAllTaskArchived() {
    this.taskService.getArchivedTache().subscribe(data => {
      this.archivedTask = data;
      console.log(data);
    }, err => {
      console.log(err);
    });
  }
  deleteTaskArchive(task) {
    this.taskService.deleteTask(task.id).subscribe(() => {
      console.log(task.id + 'deleted !!!');
      this.router.navigateByUrl('/home');
    } , err => {
      console.log(err);
    });
  }
}
