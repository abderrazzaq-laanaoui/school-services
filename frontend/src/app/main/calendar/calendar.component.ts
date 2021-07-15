import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EventSettingsModel, View } from '@syncfusion/ej2-schedule';
import { DataManager, WebApiAdaptor,ODataV4Adaptor, JsonAdaptor } from "@syncfusion/ej2-data";
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
        url:"http://localhost:3000/evenement",
        adaptor:new JsonAdaptor,
        crossDomain: true
    })
    
     public  eventObject: EventSettingsModel;
     ngOnInit(): void {
        this.eventObject = {
            dataSource: this.eventData
        }
    }

    /**
     * isReadOnly 
     */

    public isReadOnly():boolean{
        return false;
    }
  
}




