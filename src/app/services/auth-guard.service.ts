import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard {
    constructor(private router: Router) { }
    signedIn = false;
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('signedIn') === "true") {
            // logged in so return true
            return true;
        }
        
        // not logged in so redirect to login page
        this.router.navigate(['/auth']);
        return false;
    }
}
