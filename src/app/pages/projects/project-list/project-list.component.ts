import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RequestService } from 'src/app/services/request.service';
import { MatSort } from '@angular/material/sort';
import { ToCsvService } from 'src/app/services/to-csv.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})

export class ProjectListComponent implements OnInit, AfterViewInit{

  isOpen = false
  isOpenAlert = false
  onDelThis = 0
  loading = true
  projects: any = []
  displayedColumns: string[] = ['position', 'email', 'name', 'weight', 'symbol', 'resultado', 'status', 'acciones'];
  dataSource = new MatTableDataSource(this.projects);
  clickedRows = new Set<any>();
  projectList: any

  //@ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatSort) sort = new MatSort();

  constructor(
    private reqSer: RequestService,
    private csvSer: ToCsvService,
    private router: Router,
  ) {
    this.loadApp()
  }

  ngOnInit(): void {
    localStorage.removeItem('actualTest')
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  loadApp(){
    this.loading = true
    this.reqSer.getProjects().subscribe((res: any)=>{
      this.projectList = res
      this.dataSource = new MatTableDataSource(res)
      this.loading = false
    })
  }

  open(){
    this.isOpen = !this.isOpen
  }

  openClose(id: any){
    this.onDelThis = id
    this.isOpenAlert = !this.isOpenAlert
  }

  delete(id: any){
    this.reqSer.deleteAProject(id).subscribe(()=>{
    })
    setTimeout(()=>{
      this.isOpenAlert = !this.isOpenAlert
      this.loadApp()
    }, 400)
  }

  createProject(){
    this.loading = true
    this.reqSer.postProjects(('')).subscribe((res: any)=>{
      const url = this.router.serializeUrl(this.router.createUrlTree([`/projects/edit/${res.id}`]));
      window.open(`/#/projects/edit/${res.id}`, '_blank');
      this.loading = false
      //console.log("project created", res.id);
      //this.router.navigate([`/projects/edit/${res.id}`])
    })
    /* this.reqSer.createProyect(this.projectForm.value.name).subscribe((z: any)=>{
      console.log("New project: ",z)
      console.log("Proc Name: ", this.projectForm.value.name);
      this.router.navigate([`/projects/edit/${z.data}`])
    }) */
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  downloadTest = ()=>{
    this.loading = true
    this.csvSer.downloadFile('jsontocsv')
    setTimeout(() => {
      this.loading = false
    }, 3600);
  }
}
