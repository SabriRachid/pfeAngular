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
import { ProfileServiceService } from './service/profile-service.service';
import { AuthGuardService } from './service/auth-guard.service';
import { ArchiveComponent } from './pages/archive/archive.component';
import { DetailEventUserComponent } from './pages/detail-event-user/detail-event-user.component';
import { DocumentPriveFilter } from './pages/documents/documentPrive-filter.pipe';
import { ArchiveService } from './service/archive.service';
import { ProfileFilter } from './pages/profile/profile-filter.pipe';
import { DetailProfileComponent } from './pages/detail-profile/detail-profile.component';
import { FileService } from './service/file.service';
import { ListuploadComponent } from './pages/listupload/listupload.component';
import { DetailsUploadComponent } from './pages/details-upload/details-upload.component';

const appRoutes: Routes  = [
{ path : 'login' , component : LoginComponent },
{ path : '' , redirectTo : 'login' ,  pathMatch: 'full' },
{ path : 'home', component : HomeComponent , canActivate: [AuthGuardService]},
{ path : 'register', component : RegisterComponent  },
{ path : 'parametrage', component : ParametrageComponent , canActivate: [AuthGuardService]},
{ path : 'taches', component : TachesComponent , canActivate: [AuthGuardService] },
{ path : 'profile', component : ProfileComponent, canActivate: [AuthGuardService]},
{ path : 'evenement', component : EvenementComponent , canActivate: [AuthGuardService]},
{ path : 'detailTache/:id', component : DetailTachesComponent , canActivate: [AuthGuardService]},
{ path : 'detailEvent/:id', component : DetailEventComponent, canActivate: [AuthGuardService] },
{ path : 'detailEventUser/:id', component : DetailEventUserComponent, canActivate: [AuthGuardService] },
{ path : 'detailUser/:id', component : DetailUserComponent , canActivate: [AuthGuardService]},
{path : 'detailProfile/:id', component : DetailProfileComponent , canActivate: [AuthGuardService]},
{ path : 'document', component : DocumentsComponent , canActivate: [AuthGuardService]},
{ path : 'archive', component : ArchiveComponent , canActivate: [AuthGuardService]},
{ path: '**', redirectTo: 'login' }
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
    DocumentPriveFilter,
    TacheFilter,
    EventFilter,
    DocumentFilter,
    ProfileFilter,
    ArchiveComponent,
    DetailEventUserComponent,
    DetailProfileComponent,
    ListuploadComponent,
    DetailsUploadComponent

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
  providers: [FileService, ArchiveService, UserServiceService, EventServiceService, AuthenticationServiceService, TaskServiceService,
    DataChatServiceService, FileUploadServiceService, AttachementServiceService , ProfileServiceService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
