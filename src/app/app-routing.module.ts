import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniversityDashboardComponent } from './components/main/university-dashboard/university-dashboard.component';
import { CorporateDashboardComponent } from './components/main/corporate-dashboard/corporate-dashboard.component';
import { RoleGuard } from './guards/roleGuard/role.guard';
import { HomeComponent } from './components/main/home/home.component';
import { AboutComponent } from './components/main/about/about.component';
import { ContactComponent } from './components/main/contact/contact.component';
import { PlacementComponent } from './components/main/placement/placement.component';
import { StudentComponent } from './components/main/student/student.component';
import { CollegeComponent } from './components/main/college/college.component';


const routes: Routes = [
  {
    path: 'university-dashboard',
    component: UniversityDashboardComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'ROLE_UNIVERSITY' },
  },
  {
    path: 'corporate-dashboard',
    component: CorporateDashboardComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'ROLE_CORPORATE' },
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'placement',
    component: PlacementComponent,
  },
  {
    path: 'student',
    component: StudentComponent,
  },
  {
    path: 'college',
    component: CollegeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
