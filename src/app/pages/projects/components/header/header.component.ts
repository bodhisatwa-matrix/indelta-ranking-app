import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user = ''

  constructor(private router: Router, private reqServ: RequestService, private keyCloakService: KeycloakService) { }

  ngOnInit(): void {
    this.reqServ.getUSer().subscribe((res: any)=>{
      this.user = this.keyCloakService.getUsername()
    })
  }

  logout(){
    this.keyCloakService.logout()
    //localStorage.removeItem("user")
    //this.router.navigate(["/"])
  }

}
