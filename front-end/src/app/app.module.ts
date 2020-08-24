import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserhomepageComponent } from './userhomepage/userhomepage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './covid-dashboard/map/map.component';
import { CovidDashboardComponent } from './covid-dashboard/covid-dashboard.component';
import { CalendarComponent } from './covid-dashboard/calendar/calendar.component';
import { MatDatepickerModule, MatButtonModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserhomepageComponent,
    DashboardComponent,
    MapComponent,
    CovidDashboardComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatMomentDateModule,
    MatDatepickerModule,
    MatButtonModule,
     
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAtsOupbKK-hoEoA4LskcrxJcRr2PvYqH4'
    })
  ],
  exports: [
    MatDatepickerModule,
    MatButtonModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
