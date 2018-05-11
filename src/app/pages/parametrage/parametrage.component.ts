import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from '../../service/user-service.service';
import { TaskServiceService } from '../../service/task-service.service';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
@Component({
  selector: 'app-parametrage',
  templateUrl: './parametrage.component.html',
  styleUrls: ['./parametrage.component.css']
})
export class ParametrageComponent implements OnInit {
  users: any;
  managers: any ;
  p: number;
  collection =  [];
  collectionManager = [];
  page: number;
  password = '';
  user: User = new User();
  constructor(
    private http: HttpClient,
    private userService: UserServiceService,
    private taskService: TaskServiceService,
    private router: Router ) {
      this.generer_password();
   }

  ngOnInit() {


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

  saveManager(valid: boolean) {
   this.user.password = this.password;
    this.userService.saveManager(this.user).subscribe(data => {
      console.log(data);
      this.user = new User();

      this.router.navigateByUrl('/parametrage');
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
}
