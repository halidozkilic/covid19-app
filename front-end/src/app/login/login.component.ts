import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup =new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null,Validators.required)
  })

  constructor(private router:Router, private userService:UserService) { }

  ngOnInit() {
  }

  moveToRegister(){
    this.router.navigate(['/register']);
  }
  private hata;
  login(){
    //console.log(JSON.stringify(this.loginForm.value));  

    this.userService.login(JSON.stringify(this.loginForm.value)).
            subscribe(data=>
              this.router.navigate(['/covid19']),  
              error=>{console.error(error);this.hata="sifre yada kullanici adi yanlış lütfen tekrar deneyiniz"});

  }

}
