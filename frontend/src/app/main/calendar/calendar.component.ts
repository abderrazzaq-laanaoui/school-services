import { Component, OnInit, ViewEncapsulation } from '@angular/core';


@Component({
    selector     : 'calendar',
    template:'<ejs-schedule></ejs-schedule>',
    //templateUrl  : './calendar.component.html',
    styleUrls    : ['./calendar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit
{
    ngOnInit(): void {
    }
  
}


