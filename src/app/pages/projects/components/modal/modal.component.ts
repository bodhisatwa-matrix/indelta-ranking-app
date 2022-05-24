import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  today = new Date();
  loading = false
  date: any = this.today.getDate()+'/'+(this.today.getMonth()+1)+'/'+this.today.getFullYear() + ' - ' + this.today.toLocaleTimeString()
  @Input() isOpen = false;

  projectForm: FormGroup = this.fb.group({
    name: new FormControl('', [Validators.required])
  });

  constructor(private request: RequestService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  open(){
    this.isOpen = false
  }

  createProject(){
    this.loading = true
    this.request.postProjects((this.projectForm.value.name)).subscribe((res: any)=>{
      //console.log("project created", res.id);
      this.router.navigate([`/projects/edit/${res.id}`])
    })
    /* this.request.createProyect(this.projectForm.value.name).subscribe((z: any)=>{
      console.log("New project: ",z)
      console.log("Proc Name: ", this.projectForm.value.name);
      this.router.navigate([`/projects/edit/${z.data}`])
    }) */
  }

}
