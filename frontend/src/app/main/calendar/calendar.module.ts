import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {
    ScheduleModule,
    RecurrenceEditorModule,
    DayService,
    WeekService,
    MonthService,
    AgendaService,
} from "@syncfusion/ej2-angular-schedule";

import { CalendarComponent } from "./calendar.component";
const routes: Routes = [
    {
        path: "planning",
        component: CalendarComponent,
        children: [],
    },
];

@NgModule({
    declarations: [CalendarComponent],
    imports: [
        RouterModule.forChild(routes),

        ScheduleModule,
        RecurrenceEditorModule,
    ],
    providers: [DayService, WeekService, MonthService, AgendaService],
})
export class CalendarModule {}
