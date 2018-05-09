import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from '../../service/authentication-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-taches',
  templateUrl: './taches.component.html',
  styleUrls: ['./taches.component.css']
})
export class TachesComponent implements OnInit {
isAdmin: boolean ;
tasks;
  constructor(private authService: AuthenticationServiceService, private router: Router) { }

  ngOnInit() {
   this.isAdmin = this.authService.isAdmin();
    this.authService.getTasks().subscribe(data => {
      this.tasks = data;
        this.router.navigateByUrl('/');
    } , err => {

    });
  }

  onNewTask() {

  }

}
