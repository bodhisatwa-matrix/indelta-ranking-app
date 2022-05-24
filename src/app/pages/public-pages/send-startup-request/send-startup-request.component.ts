import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import appData from '../../../shared/object.json';

const datFrame: any[] = []

@Component({
  selector: 'app-send-startup-request',
  templateUrl: './send-startup-request.component.html',
  styleUrls: ['./send-startup-request.component.scss']
})
export class SendStartupRequestComponent implements OnInit {


  today = new Date();
  loading = false
  date: any = this.today.getDate()+'/'+(this.today.getMonth()+1)+'/'+this.today.getFullYear() + ' - ' + this.today.toLocaleTimeString()
  isOpen: boolean = true;

  hide = true
  public userCreds: any = appData.security;
  
  loginForm: FormGroup = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.pattern(/[aA-zZ0-9._%+-]+@[aA-zZ0-9.-]+\.[aA-zZ]{2,6}/)]),
    //captcha: new FormControl('', [Validators.required])
    captcha: new FormControl('', [])
  });

  constructor(private router: Router, private fb: FormBuilder, private _snackBar: MatSnackBar, private reqSer: RequestService) {}

  ngOnInit(): void {
    
  }

  openSnackBar(text: string) {
    this._snackBar.open(text, "Ok");
  }

  createProject(){
    this.loading = true
    this.reqSer.postProjects((this.loginForm.value.email)).subscribe((res: any)=>{
      this.router.navigate([`startups/startup/${res.id}`])
    })
    this.loading = false;
  }

  login(): void {
    this.loading = true;
    this.router.navigate(["startups/startup/1"])
    this.loading = false;
  }

  open(){
    this.isOpen = false
  }

}