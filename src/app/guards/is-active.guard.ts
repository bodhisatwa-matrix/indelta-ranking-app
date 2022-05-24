import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})

export class isActiveGuard extends KeycloakAuthGuard {

  constructor(
    router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }
  
  async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    
    console.log("this.authenticated: ", this.authenticated);
    
    if (this.authenticated) {
      this.router.navigate(['projects'])
    }

    return true;
  }
}

/* 
export class isActiveGuard extends KeycloakAuthGuard {

  constructor(
    router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }
  
  async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    
    if (this.authenticated) {
      this.router.navigate(['projects'])
    }

    return true;
  }
}
 */