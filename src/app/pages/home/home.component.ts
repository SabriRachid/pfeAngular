import { Component, OnInit } from '@angular/core';
import { DataChatServiceService } from '../../service/data-chat-service.service';
import { Chart } from 'chart.js';
import { TaskServiceService } from '../../service/task-service.service';
import { FileUploadServiceService } from '../../service/file-upload-service.service';
import { UserServiceService } from '../../service/user-service.service';
import { EventServiceService } from '../../service/event-service.service';
import { AuthenticationServiceService } from '../../service/authentication-service.service';
import { User } from '../../user';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   chartOptions = {
    responsive: true
  };
  totalEncours: any;
  totalAnnule: any;
  totalNonCommence: any ;
  totalTermine: any;
  totalTache: any;
  totalDoc: any;
  totalCompte: any;
  totalEvent: any;
  totalEventUser: any;
  tasks: any;
  profileUserLogged: any;

/*   public doughnutChartLabels: string[] = ['Non Commencé', 'Annuler', 'En Cours', 'Terminer'];
  public doughnutChartData: number[] = [350, 450, 100, 200];
  public doughnutChartType = 'doughnut';

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  } */
  public pieChartLabels: string[] = ['Non Commencé', 'Annuler', 'En Cours', 'Terminer'];
  public pieChartData: number[] = [300, 500, 100, 250];
  public pieChartType = 'pie';
  loggedUser: any;
  totalTacheUser: any;
  TacheLoggedUser: any;
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  constructor(private dataChartService: DataChatServiceService, private taskSerive: TaskServiceService ,
    private fileService: FileUploadServiceService, private userService: UserServiceService, private eventService: EventServiceService,
    private auth: AuthenticationServiceService) { }

  ngOnInit() {
    this.getTotalTaskEncours();
    this.getTotalTaskAnnule();
    this.getTotalTaskNonCommence();
    this.getTotalTaskTermine();
    this.getTotalTache();
    this.getTotalDocument();
    this.getTotalCompte();
    this.getTotalEvent();
    this.getAllTasks();
    this.getUserLoggedIn();
    this.getTotalTacheByUsername();
    this.getProfileUserLogged();
    this.getTacheByLoggedUser();
    this.getTotalEventByUsername();

  }
  getAllTasks() {
    return this.taskSerive.getAllTasks().subscribe(data => {
      this.tasks = data ;
      console.log(data);
        }, err => {
      console.log(err);
    });
  }
getTotalTaskEncours(): number {
   this.dataChartService.getTotalTacheEncours().subscribe( data => {
     this.totalEncours = data;
  //  console.log(data);
  });
  return this.totalEncours;
}

getTotalTaskAnnule() {
  this.dataChartService.getTotalTacheAnnule().subscribe( data => {
    this.totalAnnule = data;
    console.log(data);
  });
}

getTotalTaskNonCommence() {
  this.dataChartService.getTotalTacheNonCommence().subscribe( data => {
    this.totalNonCommence = data;
    console.log(data);
  });
}

getTotalTaskTermine() {
  this.dataChartService.getTotalTacheTermine().subscribe( data => {
    this.totalTermine = data;
    console.log(data);
  });
}

getTotalTache() {
this.taskSerive.getTotalTache().subscribe(data => {
  this.totalTache = data;
  console.log('total' + data);
});
}
getTotalDocument() {
  this.fileService.getTotalDocument().subscribe(data => {
    this.totalDoc = data;
  });
}

getTotalCompte() {
  this.userService.getTotalCompte().subscribe(data => {
    this.totalCompte = data;
  });
}
getTotalEvent() {
  this.eventService.getTotalEvent().subscribe(data => {
    this.totalEvent = data;
  });
}
getUserLoggedIn() {
  this.auth.getUserByUsername().subscribe(data => {
    this.loggedUser = data ;
    console.log(data);
  }, err => {
    console.log(err);
  });
}

getTotalTacheByUsername() {
  this.auth.getTotalTacheByUsername().subscribe(data => {
    this.totalTacheUser = data;
  });
}
getTotalEventByUsername() {
  this.auth.getTotalEventByUsername().subscribe(data => {
    this.totalEventUser = data;
  });
}
getProfileUserLogged() {
  this.auth.getProfileByUsername().subscribe( data => {
    this.profileUserLogged = data;
    console.log(data);
  }, err => {
    console.log(err);
  });
}
getTacheByLoggedUser() {
  this.auth.getTacheByUsername().subscribe(data => {
    this.TacheLoggedUser = data ;
  });
}
}
