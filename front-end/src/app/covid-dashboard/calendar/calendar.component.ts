import { Component, OnInit, Output, EventEmitter, ViewChild, Renderer2, AfterViewInit, Input } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { Moment } from 'moment';
import * as moment from 'moment';
import { MatCalendar } from '@angular/material';
import { Covid19Service } from '../../covid19.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers:[MapComponent]
})
export class CalendarComponent implements OnInit {

  



   tittle='deneme';

   oncekigun;

  ngOnInit() {
  }
  @Input()
  public data: any

  @Input()
  public yesterday: any

  @Output()
   onYesterday: EventEmitter<any> = new EventEmitter<any>();

  @Output()
   onData: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  dateSelected: EventEmitter<Moment> = new EventEmitter();

  @Output()
  selectedDate = moment();

  @ViewChild('calendar', { static: true })
  calendar: MatCalendar<Moment>;

  constructor(private renderer: Renderer2,private covid19Service:Covid19Service) { }

  ngAfterViewInit() {
    const buttons = document.querySelectorAll('.mat-calendar-previous-button, .mat-calendar-next-button');

    if (buttons) {
      Array.from(buttons).forEach(button => {
        this.renderer.listen(button, 'click', () => {
          console.log('Arrow buttons clicked');
        });
      });
    }
  }

  monthSelected(date: Moment) {
    console.log('month changed');
  }

  dateChanged() { //this function is able to understand changes on calendar 
    this.tittle=this.selectedDate.format('L');
    


    this.onData.emit(this.tittle);   //event emitter sending date to parent and sibling components.

    
    this.calendar.activeDate = this.selectedDate;
    this.dateSelected.emit(this.selectedDate);


    const prevMoment = moment(this.selectedDate).add(-1, 'days');
    this.oncekigun=prevMoment.format('L');
    this.onYesterday.emit(this.oncekigun);
    

  }

  prevDay() {
    const prevMoment = moment(this.selectedDate).add(-1, 'days');
    this.selectedDate = prevMoment;
    this.dateChanged();
  }

  today() {
    this.selectedDate = moment();
    this.dateChanged();
  }

  nextDay() {
    const nextMoment = moment(this.selectedDate).add(1, 'days');
    this.selectedDate = nextMoment;
    this.dateChanged();
  }
}