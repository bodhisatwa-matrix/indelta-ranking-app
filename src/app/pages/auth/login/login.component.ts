import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { RequestService } from 'src/app/services/request.service';
import appData from '../../../shared/object.json';

const datFrame: any[] = []

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading = false;
  hide = true
  public userCreds: any = appData.security;
  
  loginForm: FormGroup = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.pattern(/[aA-zZ0-9._%+-]+@[aA-zZ0-9.-]+\.[aA-zZ]{2,6}/)]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private reqSer: RequestService,
    protected readonly keycloak: KeycloakService
  ) {
    //super(router, keycloak);
  }

  ngOnInit(): void {
    //console.log(this.userCreds);

    /* appData.projects.map((res: any)=>{
      datFrame.push({
        id: res.id,
        empresa: res.company,
        fecha_act: res.dateUpdate,
        fecha_creacion: res.dateCreated,
        resultado: res.areas_result[0].result_area
      })
      localStorage.setItem("projects", JSON.stringify(datFrame))
    }) */
  }

  openSnackBar(text: string) {
    this._snackBar.open(text, "Ok");
  }

  login(): void {
    this.loading = true;
    const user = this.loginForm.value;
    this.reqSer.getSecInfo().subscribe((res: any)=>{
      console.log("getSecInfo: ", res);
      if(user.email == res.user && user.password == res.pass){
        try {
            localStorage.setItem('user', "12");
            this.router.navigate(["/projects"])
        } catch (e) {
            this.openSnackBar("Algo salio mal, intente denuevo")
        }
      }else{
        this.openSnackBar("Las credenciales no coinciden")
      }
      this.loading = false;
    })
    //user.email = user.email.trim();
  }

}
