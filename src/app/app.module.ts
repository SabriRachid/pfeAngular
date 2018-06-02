import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule , Routes , RouterLinkActive } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { UserServiceService } from './service/user-service.service';
import { ParametrageComponent } from './pages/parametrage/parametrage.component';
import { NgxPaginationModule} from 'ngx-pagination';
import { TachesComponent } from './pages/taches/taches.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EvenementComponent } from './pages/evenement/evenement.component';
import { EventServiceService } from './service/event-service.service';
import { AuthenticationServiceService } from './service/authentication-service.service';
import { TaskServiceService } from './service/task-service.service';
import { DataChatServiceService } from './service/data-chat-service.service';
import { ChartsModule } from 'ng2-charts';
import { DocumentsComponent } from './pages/documents/documents.component';
import { FileUploadServiceService } from './service/file-upload-service.service';
import { DetailTachesComponent } from './pages/detail-taches/detail-taches.component';
import { DetailEventComponent } from './pages/detail-event/detail-event.component';
import { DetailUserComponent } from './pages/detail-user/detail-user.component';
import { ParametrageManagerFilter } from './pages/parametrage/parametrage-filter.pipe';
import { ParametrageUserFilter } from './pages/parametrage/parametrageUser-filter.pipe';
import { TacheFilter } from './pages/taches/tache-filter.pipe';
import { EventFilter } from './pages/evenement/evenement-filter.pipe';
import { DocumentFilter } from './pages/documents/documentPar-filter.pipe';
import { AttachementServiceService } from './service/attachement-service.service';

const appRoutes: Routes  = [
{ path : 'login' , component : LoginComponent },
{ path : '' , redirectTo : 'login' ,  pathMatch: 'full' },
{ path : 'home', component : HomeComponent },
{ path : 'register', component : RegisterComponent },
{ path : 'parametrage', component : ParametrageComponent },
{ path : 'taches', component : TachesComponent },
{ path : 'profile', component : ProfileComponent },
{ path : 'evenement', component : EvenementComponent },
{ path : 'detailTache/:id', component : DetailTachesComponent },
{ path : 'detailEvent/:id', component : DetailEventComponent },
{ path : 'detailUser/:id', component : DetailUserComponent },
{ path : 'document', component : DocumentsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    NavBarComponent,
    ParametrageComponent,
    TachesComponent,
    ProfileComponent,
    EvenementComponent,
    DocumentsComponent,
    DetailTachesComponent,
    DetailEventComponent,
    DetailUserComponent,
    ParametrageManagerFilter,
    ParametrageUserFilter,
    TacheFilter,
    EventFilter,
    DocumentFilter

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    NgxPaginationModule,
    ChartsModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [UserServiceService, EventServiceService, AuthenticationServiceService, TaskServiceService,
    DataChatServiceService, FileUploadServiceService, AttachementServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
