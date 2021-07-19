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
import { EditMatiereComponent } from './edit-matiere/edit-matiere.component'
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
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
    declarations: [GestionMatiereComponent, MatiereTableComponent, EditMatiereComponent ],
    imports: [
      RouterModule.forChild(routes),
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule, 
      MatTabsModule,
      FuseSidebarModule,
      FuseSharedModule,
      FuseDemoModule,
      MatDividerModule,
      MatTableModule,
      MatToolbarModule,
      MatListModule
    ],
    exports: [ReactiveFormsModule],
    providers: [GestionMatiereService],
})
export class GestionMatiereModule {}
