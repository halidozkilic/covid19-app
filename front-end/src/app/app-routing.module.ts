import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserhomepageComponent } from './userhomepage/userhomepage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapComponent } from './covid-dashboard/map/map.component';
import { CovidDashboardComponent } from './covid-dashboard/covid-dashboard.component';

const routes: Routes = [


 {path:'', redirectTo:'login', pathMatch:'full'},
 {path:'login', component:LoginComponent},
 {path:'register', component:RegisterComponent},
 {path:'user', component:UserhomepageComponent},
 {path:'user/:id', component:UserhomepageComponent},
 {path:'user/edit/:id', component:UserhomepageComponent},

 {path:'dashboard', component:DashboardComponent},
 {path:'covid19',component:CovidDashboardComponent},
 {path:'map',component:MapComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
