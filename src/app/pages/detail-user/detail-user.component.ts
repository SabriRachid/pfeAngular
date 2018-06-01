import { Component, OnInit } from '@angular/core';
import { Router , Params , ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../../service/user-service.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {
  id: number;
  user: any;
  constructor( private router: Router, private activateRoute: ActivatedRoute, private userService: UserServiceService) { }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.params['id'];
    this.userService.getUserById(this.id).subscribe( data => {
      this.user = data;
    });
  }
  retour() {
    this.router.navigateByUrl('/parametrage');
  }

}
