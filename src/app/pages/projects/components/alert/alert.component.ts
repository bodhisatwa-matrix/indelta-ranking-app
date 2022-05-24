import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  today = new Date();
  loading = false
  date: any = this.today.getDate()+'/'+(this.today.getMonth()+1)+'/'+this.today.getFullYear() + ' - ' + this.today.toLocaleTimeString()
  @Input() isOpen: boolean = false;
  @Input() idApp: boolean = false;

  projectForm: FormGroup = this.fb.group({
    name: new FormControl('', [Validators.required])
  });

  constructor(private request: RequestService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  open(){
    this.isOpen = false
  }

  delete(id: any){
    this.request.deleteAProject(id).subscribe(()=>{
    })
  }

 
}
