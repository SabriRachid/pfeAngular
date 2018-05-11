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
tasks: any;
p: number ;
collection =  [];
  constructor(private authService: AuthenticationServiceService, private router: Router, private taskSerive: TaskServiceService) { }

  ngOnInit() {
  //  this.isAdmin = this.authService.isAdmin();
this.getAllUserRole();
this.getAllTasks();
  }

  onNewTask(valid: boolean) {
     this.taskSerive.saveTask(this.task).subscribe(data => {
     console.log(data);
    }, err => {
      console.log(err);
    });
    this.task = new Task();
  }
  getAllUserRole() {
   return  this.taskSerive.getAllUserByRoleUser().subscribe(data => {
        this.users = data;
        console.log(data);
    } , err => {
      console.log(err);
    });
  }

  getAllTasks() {
    return this.taskSerive.getAllTasks().subscribe(data => {
      this.tasks = data ;
      console.log(data);
      this.p = 10;
      this.collection.push(data);
    }, err => {
      console.log(err);
    });
  }
  onDeleteTask(task) {
    this.taskSerive.deleteTask(task.id).subscribe( data => {
      console.log(task.id);
    } , err => {
      console.log(err);
    });
  }

}
