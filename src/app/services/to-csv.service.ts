import { Injectable } from '@angular/core';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class ToCsvService {

  public projectList: any = []
  public csvKeys: any[] = ["id", "company", "dateCreated", "dateUpdate", "resultado"]
  public resul: any[] = []

  constructor(
    private reqSer: RequestService,
  ) {
  }

  downloadFile(filename='data') {

    this.reqSer.getProjects().subscribe((res: any)=>{

      res.map((resProject: any, i_project: number)=>{
        // crea el json
        var projecto: any = {
          company: resProject.company,
          dateCreated: resProject.dateCreated,
          dateUpdate: resProject.dateUpdate,
          id: resProject.id,
          resultado: resProject.resultado
          //testId: resProject.testId
        }

        this.reqSer.getProject(resProject.id).subscribe((res: any)=>{
          res.areas_result.map((res: any, areaI: number)=>{
            var valuex = 0
            var valor = 0

            // for de objeto
            Object.keys(res.result_area).forEach((formKey, i)=>{
              //console.log("res.result_area: ", res.result_area[formKey]);
              valor += res.result_area[formKey]
            })
            // for de objeto


            res.areas_result.map((x: any)=>{
              valuex += parseInt(x.id_options)
              if(typeof x.id_options === 'number'){
                valuex += parseInt(x.id_options)
              }
            })

            this.reqSer.getTestInfo().subscribe((res: any)=>{
              if(projecto[`valor_area_${areaI+1}`] = (valor * res.area_test[areaI].factor)  !== NaN){
                projecto[`valor_area_${areaI+1}`] = (valor * res.area_test[areaI].factor)
              }else{
                projecto[`valor_area_${areaI+1}`] = 0
              }
              //console.log("factor: ", Math.round(valuex * res.area_test[areaI].factor));
            })

            //console.log("Valor de area: ", valor);
            
          })

          //answer
          res.areas_result.map((res: any, inArea: number)=>{
            
            resProject.areas_result.map((result: any, i: number)=>{
              
              if(!this.csvKeys.includes(`area_${i+1}_id`)){
                this.csvKeys.push(`area_${i+1}_id`)
                this.csvKeys.push(`valor_area_${i+1}`)
                this.csvKeys.push(`area_${i+1}_compliance_percent`)
              }
    
              projecto[`area_${i+1}_id`] = result.area_id
              projecto[`area_${i+1}_compliance_percent`] = result.compliance_percent
              
            })
            
          })
  
        })

        // Agrega valores variantes a json

        this.projectList.push(projecto)
      })

      setTimeout(()=>{
        //console.log(this.projectList);
        
        let csvData = this.ConvertToCSV(this.projectList, this.csvKeys);
        //console.log(csvData)
        //console.log("Projecto enviado a csv: ", this.projectList);
        //console.log("keys a csv: ", this.csvKeys);
        
        let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
        let dwldLink = document.createElement("a");
        let url = URL.createObjectURL(blob);
        let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
        if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
            dwldLink.setAttribute("target", "_blank");
        }
        dwldLink.setAttribute("href", url);
        dwldLink.setAttribute("download", filename + ".csv");
        dwldLink.style.visibility = "hidden";
        document.body.appendChild(dwldLink);
        dwldLink.click();
        document.body.removeChild(dwldLink);
      }, 3600)
    })

  }

  ConvertToCSV(objArray: any, headerList: any) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'No,';
    for (let index in headerList) {
     row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
     let line = (i+1)+'';
     for (let index in headerList) {
      let head = headerList[index];
      line += ',' + array[i][head];
     }
     str += line + '\r\n';
    }
    return str;
  }

}
