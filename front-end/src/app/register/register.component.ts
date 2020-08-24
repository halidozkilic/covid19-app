import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    //we gonna bind html to angular with using registerForm
    registerForm:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required]),
    username:new FormControl(null,Validators.required),
    password:new FormControl(null,Validators.required),
    cpass:new FormControl(null,Validators.required)
  });

  constructor(private router:Router , private userService:UserService) { }

  ngOnInit() {
  }

  register(){
    if(!this.registerForm.valid || (this.registerForm.controls.password.value != this.registerForm.controls.cpass.value))
    {
      console.log("invalid Form");
      return;
    }
    
    this.userService.register(JSON.stringify(this.registerForm.value))
    
    .subscribe(
      data=>
           {console.log(data);
            this.router.navigate(['/login']);} 
              )



   // console.log(JSON.stringify(this.registerForm.value));
  
  }

}
