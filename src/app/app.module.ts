import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { CollegeComponent } from './components/college/college.component';
import { ContactComponent } from './components/contact/contact.component';
import { CorporateDashboardComponent } from './components/corporate-dashboard/corporate-dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PlacementComponent } from './components/placement/placement.component';
import { RegisterComponent } from './components/register/register.component';
import { StudentComponent } from './components/student/student.component';
import { UniversityDashboardComponent } from './components/university-dashboard/university-dashboard.component';
import { AuthService } from './services/auth.service';
import { CollegeService } from './services/college.service';
import { DriveService } from './services/drive.service';
import { StudentService } from './services/student.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UniversityDashboardComponent,
    CorporateDashboardComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    PlacementComponent,
    StudentComponent,
    CollegeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule, 
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthService,CollegeService,DriveService,StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
