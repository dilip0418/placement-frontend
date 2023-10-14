import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniversityDashboardComponent } from './components/main/university-dashboard/university-dashboard.component';
import { CorporateDashboardComponent } from './components/main/corporate-dashboard/corporate-dashboard.component';
import { RoleGuard } from './guards/roleGuard/role.guard';


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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
