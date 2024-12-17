
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AboutComponent } from "./components/about/about.component";
import { CollegeComponent } from "./components/college/college.component";
import { ContactComponent } from "./components/contact/contact.component";
import { CorporateDashboardComponent } from "./components/corporate-dashboard/corporate-dashboard.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { PlacementComponent } from "./components/placement/placement.component";
import { RegisterComponent } from "./components/register/register.component";
import { StudentComponent } from "./components/student/student.component";
import { UniversityDashboardComponent } from "./components/university-dashboard/university-dashboard.component";
import { authGuard } from "./authguard/auth.guard";


const routes: Routes = [
  {path:'about',component:AboutComponent},
  {path:'college',component:CollegeComponent,canActivate:[authGuard]},
  {path:'contact',component:ContactComponent,canActivate:[authGuard]},
  {path:'corporate-dashboard',component:CorporateDashboardComponent,canActivate:[authGuard]},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'placement',component:PlacementComponent,canActivate:[authGuard]},
  {path:'register',component:RegisterComponent},
  {path:'student',component:StudentComponent,canActivate:[authGuard]},
  {path:'university-dashboard',component:UniversityDashboardComponent,canActivate:[authGuard]},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

