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
  messsageArchiveEvent: string;
  submitedArchiveEvent = false;
  submitedArchiveTache = false;
  messsageArchiveTache: string;
  submitedArchiveDoc = false;
  messsageArchiveDoc: string;
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
      this.getAllEventArchived();
      this.submitedArchiveEvent = true;
      this.messsageArchiveEvent = 'L évènement ' + event.nomEvenement + ' a été Supprimer ...! ';
    }, err => {
      console.log(err);
      this.messsageArchiveEvent = 'Erreur de supprission de L évènement ' + event.nomEvenement + ' ! ';
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
      this.submitedArchiveTache = true;
      this.getAllTaskArchived();
      this.messsageArchiveTache = ' la Tache ' + task.nomTache + ' a été Supprimer ...! ';
    } , err => {
      this.messsageArchiveEvent = 'Erreur de supprission de La Tache ' + task.nomTache + ' ! ';
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
  }, err => console.log(err));
}

getTotalEventArchived() {
  this.archService.getTotalEventArchive().subscribe(data => {
    this.totalArchiveEvent = data;
  }, err => console.log(err));
}

getTotalDocumentArchived() {
  this.archService.getTotalDocumentArchive().subscribe(data => {
    this.totalArchiveDocument = data;
  }, err => console.log(err));
}
deleteDocArchive(document) {
  this.fileUploadService.deleteDoc(document.id).subscribe(() => {
    console.log(document.id + 'deleted !!!');
    this.submitedArchiveDoc = true;
    this.getAllDocumentArchived();
    this.messsageArchiveDoc = ' la Document ' + document.nomDocument + ' a été Supprimer ...! ';
  } , err => {
    this.messsageArchiveEvent = 'Erreur de supprission de document ' + document.nomDocument + ' ! ';
    console.log(err);
  });
}
restoreDocument(doc) {
  this.fileUploadService.restoreDoc(doc).subscribe( data => {
    console.log(data);
    this.getAllDocumentArchived();
  }, err => {
    console.log(err);
  });
}
restoreTask(task) {
  this.taskService.restoreTask(task).subscribe( data => {
    console.log(data);
    this.getAllTaskArchived();
  }, err => {
    console.log(err);
  });
}
}
