import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from '../../service/authentication-service.service';
import { Router } from '@angular/router';
import { TaskServiceService } from '../../service/task-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  loggedIn = true;
  notifNumber: number;
  constructor( private auth: AuthenticationServiceService, private router: Router, private tacheService: TaskServiceService) {
    this.getNotifTotal();
   }

  ngOnInit() {
  //  this.getNotifTotal();
   }

   getNotifTotal() {
    this.notifNumber = this.tacheService.notifArray.length;
   }
  deconnexion() {
    this.auth.logout();
    this.auth.isAuthenticated = false;
    this.router.navigateByUrl('/login');

  }
 }
