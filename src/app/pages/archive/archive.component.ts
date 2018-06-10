import { Component, OnInit } from '@angular/core';
import { EventServiceService } from '../../service/event-service.service';
import { Router } from '@angular/router';
import { TaskServiceService } from '../../service/task-service.service';
import { FileUploadServiceService } from '../../service/file-upload-service.service';
import { ArchiveService } from '../../service/archive.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  archivedEvent: any;
  archivedTask: any;
  archivedDoc: any;
  totalArchiveTache: any;
  totalArchiveEvent: any;
  totalArchiveDocument: any;
  constructor(private taskService: TaskServiceService, private archService: ArchiveService,
    private fileUploadService: FileUploadServiceService,
    private eventService: EventServiceService , private router: Router) { }

  ngOnInit() {
    this.getAllEventArchived();
    this. getAllTaskArchived();
    this.getAllDocumentArchived();
    this.getTotalDocumentArchived();
    this.getTotalEventArchived();
    this.getTotalTacheArchived();
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
  getAllDocumentArchived() {
this.fileUploadService.getAllArchivedDocument().subscribe(data => {
  this.archivedDoc = data;
}, err => {
  console.log(err);
});
  }
getTotalTacheArchived() {
  this.archService.getTotalTacheArchive().subscribe(data => {
    this.totalArchiveTache = data;
  });
}

getTotalEventArchived() {
  this.archService.getTotalEventArchive().subscribe(data => {
    this.totalArchiveEvent = data;
  });
}

getTotalDocumentArchived() {
  this.archService.getTotalDocumentArchive().subscribe(data => {
    this.totalArchiveDocument = data;
  });
}
}
