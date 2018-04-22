import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from '../../service/user-service.service';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-parametrage',
  templateUrl: './parametrage.component.html',
  styleUrls: ['./parametrage.component.css']
})
export class ParametrageComponent implements OnInit {
  users: any;
  p: number;
  collection =  [];
  constructor( private http: HttpClient, private userService: UserServiceService ) {

   }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data ;
      this.p = 10;
      this.collection.push(data);

    });

  }


}
