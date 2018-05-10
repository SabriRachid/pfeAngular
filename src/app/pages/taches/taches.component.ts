import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from '../../service/authentication-service.service';
import { Router } from '@angular/router';
import { TaskServiceService } from '../../service/task-service.service';
import { User } from '../../user';
import { Task } from '../../task';

@Component({
  selector: 'app-taches',
  templateUrl: './taches.component.html',
  styleUrls: ['./taches.component.css']
})
export class TachesComponent implements OnInit {
isAdmin: boolean ;
task: Task = new Task();
users;
  constructor(private authService: AuthenticationServiceService, private router: Router, private taskSerive: TaskServiceService) { }

  ngOnInit() {
  //  this.isAdmin = this.authService.isAdmin();
this.getAllUserRole();
  }

  onNewTask(valid: boolean) {
     this.taskSerive.saveTask(this.task).subscribe(data => {
     console.log(data);
    }, err => {
      console.log(err);
    });
  }
  getAllUserRole() {
   return  this.taskSerive.getAllUserByRoleUser().subscribe(data => {
        this.users = data;
        console.log(data);
    } , err => {
      console.log(err);
    });
  }

}
