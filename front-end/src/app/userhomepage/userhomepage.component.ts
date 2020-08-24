import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-userhomepage',
  templateUrl: './userhomepage.component.html',
  styleUrls: ['./userhomepage.component.css']
})
export class UserhomepageComponent implements OnInit {

  taskForm:FormGroup =new FormGroup({
    currentTask:new FormControl(null,Validators.required),
    startDate:new FormControl(null,Validators.required),
    endDate:new FormControl(null,Validators.required)
  })



  updateForm:FormGroup =new FormGroup({
    username:new FormControl(null,Validators.required),
    imageUrl:new FormControl(null,Validators.required),
    password:new FormControl(null,Validators.required),
    status:new FormControl(null,Validators.required)
  })



  private status=true;
  private showTodo:boolean;
  private showBio:boolean;
  private showUpdate:boolean;

    

    username="";
    oldTasks=[];
    name="";
    stat="";
    currentTask=""
    startDate=""
    endDate=""
    imageUrl="";
    user_id="";

  
  

  status2(stat:string){  //not ready
     this.showTodo=false;
     this.status=false;
     this.showBio=true;
     this.stat=stat;
     console.log(stat);
  }

  status1(stat:string){  //ready 
    this.showTodo=true;
    this.status=false;
    this.stat=stat;
  }

  update(){
    this.showTodo=false;
    this.showBio=false;
    this.showUpdate=true;

  }



  constructor(private userService:UserService , private router:Router) {

      

    this.userService.user().subscribe(
      user=>{this.addName(user);console.log(user);},
      error=>this.router.navigate(['/login'])
     );
   }

  addName(user){
    this.username=user.username;
    this.oldTasks=user.oldTasks;
    this.currentTask=user.currentTask;
    this.startDate=user.startDate;
    this.endDate=user.endDate;
    this.imageUrl=user.imageUrl;
    this.user_id=user._id;

  }

  ngOnInit() {
  }


  logout(){
    this.userService.logout().subscribe(data=> this.router.navigate(['/login']),
    error=>console.error(error)
    );

  }

  addNewTask(){
    this.userService.addNewTask(JSON.stringify(this.taskForm.value),this.user_id);
    this.showBio=true;
    this.showTodo=false;
    
    
  }

  updateUser(){
    this.userService.updateUser(JSON.stringify(this.updateForm.value),this.user_id);
    this.router.navigate(['/user']);

    this.showUpdate=false;
    this.showBio=true;


  }

}
