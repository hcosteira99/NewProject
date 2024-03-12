import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import {Year} from '../app/models/year'
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  title = 'project-hc';
   mesesDoAno: Year[] = [];
  
   constructor(private router: Router) {}


  ngOnInit() {
    
  }
  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.readFile(file);
  }

   readFile(file: File): void {
    const fileReader = new FileReader();
    fileReader.onload = (e: any) => {
      const workbook = XLSX.read(e.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      this.mesesDoAno = this.convertJsonToYear(jsonData)

    };
    fileReader.readAsBinaryString(file);
  }

   convertJsonToYear(jsonData: any[]): Year[] {
    const years: Year[] = [];
    jsonData.forEach((item: any) => {
        const year: Year = {
            Name: item.Mes,
            Gasto: parseFloat(item.Gasto),
            Ganho: parseFloat(item.Ganho),
            Salvo: parseFloat(item.Salvo)
        };
        years.push(year);
    });
    return years;
}
navigate(mes:any){
  this.router.navigate(['month'])
}

}
