import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';
import {GestionMatiereService} from '../gestion-matiere.service';
import { EditMatiereComponent } from '../edit-matiere/edit-matiere.component';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'matiere-table',
  templateUrl: './table.component.html',
  styleUrls: [ './table.component.scss']
})
export class MatiereTableComponent implements OnInit, OnDestroy {
  @Input('module') module : any;

  private eventsSubscription: Subscription;
  @Input() events: Observable<any>;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  dialogRef: any;

  Math = Math;


  datasource:any;
  constructor(
    public _matDialog: MatDialog,
    private _gestionMatiereService: GestionMatiereService,
    private toastr: ToastrService) {}
  

  async ngOnInit(): Promise<void> {
    this.eventsSubscription = this.events.subscribe((data) => this.updateDataSource(data));
    this.datasource = this.module.matieres;
     
  }

  ngOnDestroy(): void {
    this.eventsSubscription.unsubscribe();
  }

  updateDataSource(data:any){
console.log("adding matiere...",data);
console.log("module => ",this.module);



    if(this.module.id !== data.moduleId) return;
    console.log("matiere.data => ",data);
    
    this._gestionMatiereService.addMatiere(data).subscribe(
      (res)=>{
          this.toastr.success("Cette matiere est bien ajoutée"); 
          this.module.matieres.push(res);          
          this.datasource = [...this.module.matieres];    
      }
      ,(err)=>{
          console.error(err);
          //show a toaster with the error message
          this.toastr.error(err.error.message, "Erreur");

      }
  );
    
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
      data: {...matiere,professeurs: this._gestionMatiereService.professeurs},
    
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