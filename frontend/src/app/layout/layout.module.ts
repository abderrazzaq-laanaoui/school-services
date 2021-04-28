import { NgModule } from '@angular/core';

import { VerticalLayout1Module } from 'app/layout/components/layout/layout.module';


@NgModule({
    imports: [
        VerticalLayout1Module,

    ],
    exports: [
        VerticalLayout1Module,

    ]
})
export class LayoutModule
{
}
