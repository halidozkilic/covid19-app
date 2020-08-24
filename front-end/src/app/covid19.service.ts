import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Covid19Service {

  constructor(private http: HttpClient) {   }

  private url='http://localhost:3000/patient';   //backend
  
  

  FindAllHeat(){
    return this.http.get ( 'api/patient/heat', {
      observe:'body',
      withCredentials:true,  
      headers:new HttpHeaders().append('Content-Type','application/json') })
  }

  FindByDate(body:any)     {  //heatcollection query that finds by date,
    console.log("body degiskeni:"+body);
    return this.http.post('api/patient/heatbyDate',body);

    }
  

    FindById(id:any){

      return this.http.get('api/patient/person/' + id  , {
        observe:'body',
        withCredentials:true,  
        headers:new HttpHeaders().append('Content-Type','application/json')});
  
    }



}
