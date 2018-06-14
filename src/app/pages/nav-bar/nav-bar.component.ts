import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from '../../service/authentication-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  loggedIn = true;
  constructor( private auth: AuthenticationServiceService, private router: Router) { }

  ngOnInit() {
   }

  deconnexion() {
    this.auth.logout();
    this.auth.isAuthenticated = false;
    this.router.navigateByUrl('/login');

  }
 }
