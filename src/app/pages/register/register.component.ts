import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { UserServiceService } from '../../service/user-service.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
   message = 'Inscription reussite avec success';
   submited = false;
  constructor (private userService: UserServiceService , private router: Router ) { }

  ngOnInit() {
  }

  saveUser(valid: boolean) {
    if ( valid ) {
      this.userService.save(this.user).subscribe( data => {console.log(data); } , error => {
        console.log(error);
  });
       this.submited = true;
      console.log('no error');
    //  this.router.navigate(['app-login']);
      this.user = new User();
    } else {
      console.log('error');
    }


  }

}
