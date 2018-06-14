import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../../service/user-service.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {
  id: number;
  user: any;
  messageForm: string;
  submited = false;
  submitedFormEmail = false;
  messageFormEmail: string;
  constructor(private router: Router, private activateRoute: ActivatedRoute, private userService: UserServiceService) { }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.params['id'];
    this.getUserById();
  }
  getUserById() {
    this.userService.getUserById(this.id).subscribe(data => {
      this.user = data;
    });
  }
  retour() {
    this.router.navigateByUrl('/parametrage');
  }
  activeCompteUser(user) {
    this.userService.activeCompte(user).subscribe(data => {
      console.log(data);
      this.getUserById();
      this.submitedFormEmail = true;
      this.messageFormEmail = 'Un Email d activation à été Envoyer a ' + this.user.email +  '   avec succéss .. !';
    }, err => {
      console.log(err);
    });
  }
  updateUser() {
    this.userService.updateUser(this.user).subscribe(data => {
      console.log(data);
      this.submited = true;
      this.messageForm = 'Compte de ' + this.user.nom + ' ' + this.user.prenom + '  à été modifier avec succéss .. !';
    }, err => {
      console.log(err);
      this.messageForm = 'Erreur ! mise a jour de : ' + this.user.nom + ' ' + this.user.prenom;
    });
  }
}
