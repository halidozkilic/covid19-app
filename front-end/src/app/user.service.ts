import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient ) { }
    private url= 'http://localhost:3000/users';  //back servisi
    //private url= 'http://127.0.0.1:3000/users';


    register(body:any){
      return this.http.post(this.url + '/register',body, {
        observe:'body',
        headers:new HttpHeaders().append('Content-Type','application/json')
      });
    }

    login(body:any){
      return this.http.post ( this.url + '/login',body, {
        observe:'body',
        withCredentials:true,   //if you forget that cookie will not be available 
        headers:new HttpHeaders().append('Content-Type','application/json') });
  }


   
    user(){
      return this.http.get(this.url +'/user',{
        observe:'body',
        withCredentials:true,
        headers:new HttpHeaders().append('Content-Type','application/json')
      });
    }
    



    logout(){
      return this.http.get ( this.url + '/logout', {
        observe:'body',
        withCredentials:true,  
        headers:new HttpHeaders().append('Content-Type','application/json') });
    }

    addNewTask(body:any,id:any){

      console.log("user.service");
      console.log("body: " +body);

      return this.http.put(this.url+'/user/'+id , body, {
        observe:'body',
        withCredentials:true,  
        headers:new HttpHeaders().append('Content-Type','application/json')})
      .subscribe(response => console.log(response));
      }
    

    updateUser(body:any,id:any){
      console.log(body);

      return this.http.put(this.url+'/user/edit/' + id , body , {
        observe:'body',
        withCredentials:true,  
        headers:new HttpHeaders().append('Content-Type','application/json')})
      .subscribe(response => console.log(response));
    }


    findAll(){
      return this.http.get(this.url +'/dashboard',{
        observe:'body',
        withCredentials:true,
        headers:new HttpHeaders().append('Content-Type','application/json')
      });

    }

   deleteUser(id){
    return this.http.delete(this.url+ '/dashboard/'+ id  , {
      observe:'body',
      withCredentials:true,  
      headers:new HttpHeaders().append('Content-Type','application/json')})
    .subscribe(response => console.log(response));
  }

  

    
}




/* , {
  observe:'body',
  withCredentials:true,  
  headers:new HttpHeaders().append('Content-Type','application/json')})
.subscribe(response => console.log(response));
}
 */