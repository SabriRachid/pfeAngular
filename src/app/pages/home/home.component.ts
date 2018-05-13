import { Component, OnInit } from '@angular/core';
import { DataChatServiceService } from '../../service/data-chat-service.service';
import { Chart } from 'chart.js';

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

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  constructor(private dataChartService: DataChatServiceService ) { }

  ngOnInit() {
    this.getTotalTaskEncours();
    this.getTotalTaskAnnule();
    this.getTotalTaskNonCommence();
    this.getTotalTaskTermine();


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



}
