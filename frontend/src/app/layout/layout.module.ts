import { NgModule } from '@angular/core';

import { VerticalLayoutModule } from 'app/layout/components/layout/layout.module';


@NgModule({
    imports: [
        VerticalLayoutModule,
    ],
    exports: [
        VerticalLayoutModule,
    ]
})
export class LayoutModule
{
}
