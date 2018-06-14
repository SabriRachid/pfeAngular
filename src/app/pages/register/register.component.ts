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
  submited = false;
  message: string;
  constructor (private userService: UserServiceService , private router: Router ) { }

  ngOnInit() {
  }

  saveUser(valid) {

      this.userService.save(this.user).subscribe( data => {
        console.log(data);
        this.submited = true;
        this.message = 'Compte créer avec success ! Un Email  d activation vous sera envoyé';
      } , error => {
        this.message = 'Erreur';
  });
      this.user = new User();


  }

}
