import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

 
  private users;
  private id;
  private task=true;

  constructor(private userService:UserService , private router:Router ) {

    this.userService.findAll().subscribe(
      user=>{
        console.log(user); 
        this.users=user;
        this.findId(user);
      },
      error=>this.router.navigate(['/login'])
     );


     this.userService.user().subscribe(
      user=>{},
      error=>this.router.navigate(['/login'])
     );
   }

   private _isAdmin;

   private percentagle;
   private  total;

   findId(user){
   
    for(let i=0;i<user.length;i++)
    {
       
    }
   // console.log(this.percentagle);
    
   }


  
  
delete(deleteID){

  console.log(deleteID);
  

  
    

  this.userService.deleteUser(deleteID);

    
  
  
  
}


  ngOnInit() {
  }

}
