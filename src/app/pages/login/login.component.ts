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
  ngOnInit() {
  }
  onLogin(user) {
  this.authService.login(user).subscribe(resp => {
       this.jwt = resp.headers.get('Authorization');
      console.log(resp.headers.get('Authorization'));
      this.authService.saveToken(this.jwt);
      this.router.navigateByUrl('/home');
  }, err => {
      this.mode = 1;
  });
}
}
