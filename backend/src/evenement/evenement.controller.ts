import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('evenement')
export class EvenementController {
  @Get('/')
  getEvents(){
    return [
      {
      "Subject":"test",
      "StartTime":"2021-07-11T10:00:00.000Z",
      "EndTime":"2021-07-12T12:30:00.000Z",
      "IsAllDay":false,
      "StartTimezone":null,
      "EndTimezone":null,
      "RecurrenceRule":null,
      "Id":1
      },
      {
      "Subject":"test2",
      "StartTime":"2021-07-11T14:00:00.000Z",
      "EndTime":"2021-07-11T16:30:00.000Z",
      "IsAllDay":false,
      "StartTimezone":null,
      "EndTimezone":null,
      "RecurrenceRule":null,
      "Id":2
      },
      {
      "Subject":"test3",
      "StartTime":"2021-07-14T09:00:00.000Z",
      "EndTime":"2021-07-14T13:00:00.000Z",
      "IsAllDay":false,
      "StartTimezone":null,
      "EndTimezone":null,
      "RecurrenceRule":null,
      "Id":3
      }
      ];
  }
  @Post('/:action')
  addEvent(@Body() x:any){
  }
}
