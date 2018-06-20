import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { User } from '../../user';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from '../../service/user-service.service';
import { TaskServiceService } from '../../service/task-service.service';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from '../../service/authentication-service.service';
import * as jsPDF from 'jspdf';
@Component({
  selector: 'app-parametrage',
  templateUrl: './parametrage.component.html',
  styleUrls: ['./parametrage.component.css']
})
export class ParametrageComponent implements OnInit {
  motCle: string;
  motCleUser: string;
  users: any;
  managers: any ;
  p: number;
  collection =  [];
  collectionManager = [];
  page: number;
  password = '';
  totaleCompteNonActive: any;
  submited = false;
  messageManager: string;
  user: User = new User();
  @ViewChild('content') content: ElementRef;
  constructor(
    private auth: AuthenticationServiceService,
    private http: HttpClient,
    private userService: UserServiceService,
    private taskService: TaskServiceService,
    private router: Router ) {
      this.generer_password();
   }

  ngOnInit() {

    this.statistiqueCompte();
  this.getUserManager();
  this.getUser();

   }
   generer_password() {
    const ok = 'azertyupqsdfghjkmwxcvbn23456789AZERTYUPQSDFGHJKMWXCVBN';
            const longueur = 8;
            for (let i = 0; i < longueur; i++) {
             const wpos = Math.round(Math.random() * ok.length);
                this.password  = this.password + ok.substring(wpos, wpos + 1);
            }
    return this.password;
  }

  saveManager() {
   this.user.password = this.password;
    this.userService.saveManager(this.user).subscribe(data => {
      console.log(data);
      this.submited = true;
      this.messageManager = 'compte manager créer avec success ..';
      this.user = new User();
      this.getUserManager();
    } , err => {
      console.log(err);
    });
  }
   getUserManager() {
    return this.userService.getAllUserByRoleManager().subscribe(resp => {
      this.managers = resp ;
      this.page = 5;
      this.collectionManager.push(resp);
    } , err => {
      console.log(err);
    });
   }

   getUser() {
     return this.userService.getAllUserByRoleUser().subscribe(data => {
       this.users = data ;
       this.p = 10;
       this.collection.push(data);
       console.log(data);
     } , err => {
       console.log(err);
     });
   }

   statistiqueCompte() {
     return this.userService.getTotalCompteNonActive().subscribe( data => {
       this.totaleCompteNonActive = data ;
       console.log('total Compte non active :' + this.totaleCompteNonActive);
     });
   }
   detailUser(user) {
     this.router.navigate(['/detailUser', user.id]);
   }
   genererPDF() {
    const doc = new jsPDF();
    const specialElementHandlers = {
      '#editor': function(element, renderer) {
        return true;
      }
    };
    const content = this.content.nativeElement;
        doc.fromHTML(content.innerHTML, 15, 15, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });
    doc.save(this.user.nom + '' + this.user.prenom);
   }
}
