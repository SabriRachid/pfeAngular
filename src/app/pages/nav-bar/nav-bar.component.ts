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
  constructor( private authService: AuthenticationServiceService, private router: Router) { }

  ngOnInit() {
  }

  deconnexion() {
    this.authService.logout();
    this.authService.isAuthenticated = false;
    this.router.navigateByUrl('/login');

  }
}
