import { Component, OnInit } from '@angular/core';
import {AppService} from "./../app.service";
@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  countriesData:any= [];
  constructor(private appService:AppService) { 
   appService.getCountriesData().subscribe((data)=>{
     this.countriesData = data;
   })
  }

  ngOnInit() {
  }

}
