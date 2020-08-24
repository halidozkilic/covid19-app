import { Component, OnInit } from '@angular/core';
import { CalendarComponent } from './calendar/calendar.component';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Covid19Service } from '../covid19.service';


@Component({
  selector: 'app-covid-dashboard',
  templateUrl: './covid-dashboard.component.html',
  
  styleUrls: ['./covid-dashboard.component.css']
})
export class CovidDashboardComponent implements OnInit {

  constructor(private userService:UserService , private router:Router,private covidService:Covid19Service) {
    this.userService.user().subscribe(
      user=>{},
      error=>this.router.navigate(['/login'])
     );  //check authanticate




   }

  ngOnInit() {
  }

  public data: string;
  public users;
  private temp;
  private yesterday1;
  private yesterdaydata;

  
  private dailyCase;
  private prevDayCase;
  private total;
  private temp5;

  
  




  totalCase(){
    this.covidService.FindAllHeat().subscribe(
      (allRecords) => {   
        this.total= Object.keys(allRecords).length
        
        return this.total;
      },
      (error) => console.log("erişim problemi var!")
    );
  }
 
  updateData(event) {  //event emitter onData object data olarak kullanıyoruz!
    
    this.temp={date:event};
    console.log("temp degiskeni:"+JSON.stringify(this.temp));
    
    this.covidService.FindByDate(this.temp).subscribe(
      datas=>{
       
        console.log("pickeddaydata", datas); 
        this.users=datas;
        this.dailyCase= Object.keys(datas).length
        this.data = this.users;
      
        console.log("deneme lenght",this.dailyCase)
      },
      error=>console.log("findbyid calışmıyor@covid-dashboard"+error));


      this.total=this.totalCase();
   
  }

  
 

  yesterdayUpdate(event) {  //event emitter onData object data olarak kullanıyoruz!
    
    this.yesterday1={date:event};
   

    this.covidService.FindByDate(this.yesterday1).subscribe(
      yesdatas=>{
        
        console.log("yesterdaydata", yesdatas); 
        
        this.prevDayCase= Object.keys(yesdatas).length
       
        this.yesterdaydata = yesdatas;
        
        
       
      },
      error=>console.log(error));


      
   
  }


  //toplam vaka sayısı: veri tabanından all diyip .lenght ile bulacağız

  //günlük vaka sayisi// datayi parametre olarak atacağız ve kaç tane vaka varsa çekeceğiz 

  //vaka artış hızı ! //data ve data-1 deki sayılarla fonksiyonel iş yapacağız böyle buluruz.



}
