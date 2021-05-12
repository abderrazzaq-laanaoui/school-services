import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EventSettingsModel, View } from '@syncfusion/ej2-schedule';
import { CalendarService} from './calendar.service';
import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";
@Component({
    selector     : 'calendar',
    templateUrl  : './calendar.component.html',
    styleUrls    : ['./calendar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit
{
    constructor() {  }
    public setView: View = "Month";
    public eventData:DataManager = new DataManager({
        url:"http://localhost:3300/events",
        adaptor:new WebApiAdaptor
        //crossDomain: true
    })
    
     public  eventObject: EventSettingsModel;
     ngOnInit(): void {
        this.eventObject = {
            dataSource: this.eventData
        }
    }

    /**
     * isReadOnly
     */*
    public isReadOnly():boolean{
        return false;
    }
  
}




