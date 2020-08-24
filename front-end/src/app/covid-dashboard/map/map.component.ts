import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { Covid19Service } from "../../covid19.service";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
})
export class MapComponent implements OnInit {
  date = "";

  private userGet;
  constructor(private covidService: Covid19Service) {
    this.covidService.FindAllHeat().subscribe(
      (allRecords) => {
        console.log(allRecords);
        this.data = allRecords;
        
      },
      (error) => console.log("erişim problemi var!")
    );
  }

  


  @Input()
  data: any;

  @Output()
  public onData: EventEmitter<any> = new EventEmitter<any>();

  private count;

  private data2;
  title = "click";

  deniyorum(id) {
    //burada user id ile diğer collectiondan verileri çekeceğiz.!
    this.title = "oldu";
   
    console.log("id" + id);

    this.covidService.FindById(id).subscribe(
      (userWithId) => {
        console.log(userWithId);
        this.data2 = [];

        this.data2.push(userWithId);
        console.log("map clicked patient:", this.data2);
        console.log(this.data2[0].name);
      },
      (error) => console.log("id ile bulma yapılamıyor!")
    );
  }

  //datayla sorgu atıp uygun verileri çek let user of users yapısıyla :

  //tıklanan datadaki userin bilgilerini çekme işi

  ngOnInit() {}
}
