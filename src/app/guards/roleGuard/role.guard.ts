import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Implement logic to check user's role based on data stored in local storage
    const userRole = localStorage.getItem('role');

    if (userRole === route.data['expectedRole']) {
      return true;
    } else {
      // Redirect to a suitable route if the user is unauthorized
      this.router.navigate(['/unauthorized']); // Create an unauthorized route
      return false;
    }
  }
}