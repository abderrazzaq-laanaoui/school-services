import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { AuthGuardService as AuthGuard } from "../../auth/auth-guard.service";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { FuseSharedModule } from "@fuse/shared.module";
import { FuseDemoModule, FuseSidebarModule } from "@fuse/components";
import { MatListModule } from "@angular/material/list";
import { MatTableModule } from "@angular/material/table";
import { NotesComponent } from "./notes.component";
import { NotesTableComponent } from "./table/table.component";
import { NotesService } from "./notes.service";
const routes: Routes = [
    {
        path: "notes",
        component: NotesComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    declarations: [NotesComponent, NotesTableComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        FuseSidebarModule,
        FuseSharedModule,
        FuseDemoModule,
        MatDividerModule,
        MatTableModule,
        MatListModule,
    ],
    exports: [],
    providers: [NotesService],
})
export class NotesModule {}
