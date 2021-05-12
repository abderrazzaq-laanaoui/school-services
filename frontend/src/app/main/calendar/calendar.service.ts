import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class CalendarService
{
    


    async  getEventsData() {
        return  this.eventData;
    }
}
