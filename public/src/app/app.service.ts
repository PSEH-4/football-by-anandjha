import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  apiUrl = "http://localhost/api";
  apiKey="9bb66184e0c8145384fd2cc0f7b914ada57b4e8fd2e4d6d586adcc27c257a978";
  constructor(private http: HttpClient) { }

  getLeaguesData(countriId=41){
   let url = this.apiUrl +"?action=get_leagues&country_id="+countriId+"&APIkey="+this.apiKey;
    return this.http.get(url);
  }
  getCountriesData(){
    let url = this.apiUrl +"/getCountries?action=get_countries&APIkey="+this.apiKey;
     return this.http.get(url);
   }
}
