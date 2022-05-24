import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { RequestService } from '../services/request.service';

@Injectable({
  providedIn: 'root'
})


export class UnActiveGuard extends KeycloakAuthGuard {

  constructor(
    router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }
  
  async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    
    if (!this.authenticated) {
      this.router.navigate([''])
    }

    return true;
  }
}


/* 
export class UnActiveGuard implements CanActivate {
  constructor(private router: Router, private keyCloakService: KeycloakService) { }
  canActivate(): any {
      if (localStorage.getItem("user") === "12") {
          this.router.navigate(['/projects']);
        } else {
          return true;
      }
  }
  
}
 */