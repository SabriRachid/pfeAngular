import { Component, OnInit, Input } from '@angular/core';
import { Router , Params , ActivatedRoute } from '@angular/router';
import { FileUploadServiceService } from '../../service/file-upload-service.service';
import { AuthenticationServiceService } from '../../service/authentication-service.service';

@Component({
  selector: 'app-details-upload',
  templateUrl: './details-upload.component.html',
  styleUrls: ['./details-upload.component.css']
})
export class DetailsUploadComponent implements OnInit {
  id: number;
  document: Document[] = [];
  submited = false;
  messageDoc: string;
  constructor(private router: Router, private activateRoute: ActivatedRoute,
    private fileUploadService: FileUploadServiceService, private auth: AuthenticationServiceService) { }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.params['id'];
    this.getDocumentById();
  }
  getDocumentById() {
    this.fileUploadService.getDocumentById(this.id).subscribe(data => {
      this.document = data;
    });
  }
  retour() {
    this.router.navigateByUrl('/document');
  }
  updateDoc() {
    this.fileUploadService.updateDoc(this.document).subscribe(data => {
      console.log(this.document);
      this.submited = true;
      this.messageDoc = 'Document Modifié avec success ...';
    }, err => {
      console.log(err);
    });
  }

}
