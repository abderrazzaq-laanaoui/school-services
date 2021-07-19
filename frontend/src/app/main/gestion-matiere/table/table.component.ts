import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';
import {GestionMatiereService} from '../gestion-matiere.service';
import { EditMatiereComponent } from '../edit-matiere/edit-matiere.component';
@Component({
  selector: 'matiere-table',
  templateUrl: './table.component.html',
  styleUrls: [ './table.component.scss']
})
export class MatiereTableComponent implements OnInit {
  @Input('module') module : any;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  dialogRef: any;

  Math = Math;


  datasource:any;
  constructor(
    public _matDialog: MatDialog,
    private _gestionMatiereService: GestionMatiereService,
    private toastr: ToastrService) {}

  async ngOnInit(): Promise<void> {
     this.datasource =  this.module.matieres;
  }

  deleteMatiere(id:number){
    this.confirmDialogRef = this._matDialog.open(
      FuseConfirmDialogComponent,
      {
          disableClose: false,
      }
  );

  this.confirmDialogRef.componentInstance.confirmMessage =
      "Vous-voullez vraimenet supprimer cette matiére ?";

  this.confirmDialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._gestionMatiereService.deleteMatiere(id).subscribe(
          response => {
            this.datasource = this.datasource.filter(matiere => matiere.id != id);
            this.toastr.success('Suppression réussie');
        },
        error => {
            this.toastr.error(error.message, 'ERREUR');
        }
        );      }
      this.confirmDialogRef = null;
  });
  }

// edit matiere
updateMatiere(matiere) {
  this.dialogRef = this._matDialog.open(EditMatiereComponent, {
      panelClass: "edit-matiere-dialog",
      data: {...matiere},
    
  });

  this.dialogRef.afterClosed().subscribe((response) => {
      if (!response) return;
      this.confirmDialogRef = this._matDialog.open(
          FuseConfirmDialogComponent,
          {
              disableClose: false,
          }
      );

      this.confirmDialogRef.componentInstance.confirmMessage =
          "Vous-voullez modifier les données de cette matiere ?";

      this.confirmDialogRef.afterClosed().subscribe((result) => {
          if (result) {
              console.log(response);
              //send patch request to update matiere using the service and update the view if seccuss
              this._gestionMatiereService.updateMatiere(response).subscribe(
                  response => {
                      this.toastr.success('Modification réussie');
                  },
                  err => {
                      this.toastr.error(err.message, 'ERREUR');
                  }
              );
          }
          this.confirmDialogRef = null;
      });
  });

  
}

}