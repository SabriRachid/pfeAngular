import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from '../../service/authentication-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthenticationServiceService , private router: Router) { }
  mode = 0;
  jwt: string;
  loggedIn = false;
  ngOnInit() {
  }
  onLogin(user) {
  this.authService.login(user).subscribe(resp => {
       this.jwt = resp.headers.get('Authorization');
       if (this.jwt != null) {
        console.log(resp.headers.get('Authorization'));
        this.authService.saveToken(this.jwt);
        this.authService.isAuthenticated = true;
        this.router.navigateByUrl('/home');
       } else {
        this.authService.isAuthenticated = false;
        this.router.navigateByUrl('/login');
       }
  }, err => {
      this.mode = 1;
  });
}
}
