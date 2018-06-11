import { Component, OnInit } from '@angular/core';
import { ProfileServiceService } from '../../service/profile-service.service';
import { AuthenticationServiceService } from '../../service/authentication-service.service';
import { Profile } from '../../profile';
import { User } from '../../user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profiles: any;
  loggedUser: User[] = [];
  profileUserLogged: Profile[] = [];
  messageCompte: string;
  messageInfo: string;
  submited = false;
  submitedInfo = false;
  submitedPassword = false;
  nvpassword: string;
  messagePassword: string;
  constructor(private profileService: ProfileServiceService, private authService: AuthenticationServiceService) { }

  ngOnInit() {
    this.getAllProfile();
    this.getUserLoggedIn();
    this.getProfileUserLogged();
  }

  getAllProfile() {
    this.profileService.getAllProfile().subscribe( data => {
      this.profiles = data;
      console.log(data);
    });
  }

  detailProfile(profile) {
  }
  getUserLoggedIn() {
    this.authService.getUserByUsername().subscribe(data => {
      this.loggedUser = data ;
      console.log(data);
    }, err => {
      console.log(err);
    });
  }
  editCompte() {
    this.profileService.editCompte(this.loggedUser).subscribe(data => {
      console.log(data);
      this.submited = true;
      this.messageCompte = 'Compte modifié avec success ..';
    });
  }
  editInfo() {
    this.profileService.editInfo(this.profileUserLogged).subscribe(data => {
      console.log(data);
      this.submitedInfo = true;
      this.messageInfo = 'Info modifié avec success..';
    });
  }
  getProfileUserLogged() {
    this.authService.getProfileByUsername().subscribe( data => {
      this.profileUserLogged = data;
      console.log(data);
    }, err => {
      console.log(err);
    });
  }
  editPassword() {
   // this.loggedUser = this.nvpassword;
    this.profileService.editPassword(this.loggedUser).subscribe( data => {
      console.log(data);
      this.submitedPassword = true;
      this.messagePassword = 'Mot de passe modifié avec success..';
    }, err => {
      console.log(err);
    });
  }
}
