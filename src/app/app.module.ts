import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/main/login/login.component';
import { RegisterComponent } from './components/main/register/register.component';
import { UniversityDashboardComponent } from './components/main/university-dashboard/university-dashboard.component';
import { CorporateDashboardComponent } from './components/main/corporate-dashboard/corporate-dashboard.component';
import { HomeComponent } from './components/main/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/main/about/about.component';
import { ContactComponent } from './components/main/contact/contact.component';
import { PlacementComponent } from './components/main/placement/placement.component';
import { StudentComponent } from './components/main/student/student.component';
import { CollegeComponent } from './components/main/college/college.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    UniversityDashboardComponent,
    CorporateDashboardComponent,
    HomeComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    PlacementComponent,
    StudentComponent,
    CollegeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
