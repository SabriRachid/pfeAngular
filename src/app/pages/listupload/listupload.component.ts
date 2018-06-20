import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FileUploadServiceService } from '../../service/file-upload-service.service';
import { TaskServiceService } from '../../service/task-service.service';
@Component({
  selector: 'app-listupload',
  templateUrl: './listupload.component.html',
  styleUrls: ['./listupload.component.css']
})
export class ListuploadComponent implements OnInit {

  constructor(private fileUploadService: FileUploadServiceService, private tacheService: TaskServiceService) { }
  notifMessage: string;
  ngOnInit() {
  }


}
