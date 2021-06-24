import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { GestionMatiereComponent } from "./gestion-matiere.component";
import { AuthGuardService as AuthGuard } from "../../auth/auth-guard.service";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseDemoModule, FuseSidebarModule } from "@fuse/components";
import { MatListModule } from "@angular/material/list";
import { MatTableModule } from "@angular/material/table";
import { MatiereTableComponent } from './table/table.component'
import { GestionMatiereService } from "./gestion-matiere.service";
const routes: Routes = [
    {
        path: "gestion-etudes/:id",
        component: GestionMatiereComponent,
        resolve: {
            semstres : GestionMatiereService
        },
        canActivate: [AuthGuard],
    },
];
@NgModule({
    declarations: [GestionMatiereComponent, MatiereTableComponent ],
    imports: [
      RouterModule.forChild(routes),
      MatButtonModule,
      MatIconModule, 
      MatTabsModule,
      FuseSidebarModule,
      FuseSharedModule,
      FuseDemoModule,
      MatDividerModule,
      MatTableModule,
      MatListModule
    ],
    exports: [],
    providers: [GestionMatiereService],
})
export class GestionMatiereModule {}
