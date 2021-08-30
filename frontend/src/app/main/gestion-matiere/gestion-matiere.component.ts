import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AddElementComponent } from "./add-element/add-element.component";
import { FuseSidebarService } from "@fuse/components/sidebar/sidebar.service";
import { GestionMatiereService } from "./gestion-matiere.service";
import { fuseAnimations } from "@fuse/animations";
import { FuseConfirmDialogComponent } from "@fuse/components/confirm-dialog/confirm-dialog.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";

@Component({
    selector: "gestion-matiere",
    templateUrl: "./gestion-matiere.component.html",
    styleUrls: ["./gestion-matiere.component.scss"],
    animations: fuseAnimations,
})
export class GestionMatiereComponent implements OnInit {
    semestre: any;
    semstresList: Array<string>;
    currentSemestre: number;
    professeurs: Array<any>;
    eventsSubject: Subject<any> = new Subject<any>();

    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _gestionMatiereService: GestionMatiereService,
        private route: ActivatedRoute,
        private _matDialog: MatDialog,
        public router: Router,
        private toastr : ToastrService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    ngOnInit(): void {
        this.route.params.subscribe((d) => {
            this.currentSemestre = d.id;
        });
        this.semestre = this._gestionMatiereService.semestre || {};
        this.professeurs = this._gestionMatiereService.professeurs;

        this.semstresList = [
            "Semestre 1",
            "Semestre 2",
            "Semestre 3",
            "Semestre 4",
            "Semestre 5",
            "Semestre 6",
            "Semestre 7",
            "Semestre 8",
            "Semestre 9",
            "PFE",
        ];
    }

    // ********************************//
    getModule(id: number) {
        return this.semestre.modules[id];
    }

    async goToSemestre(nbr: number) {
        this.router.navigate(["/gestion-etudes", nbr]).then(() => {
            this.semestre = this._gestionMatiereService.semestre || {};
        });
    }
    // new elment
    newElement() {
        
        // open add-element form as a dialog
        this.dialogRef = this._matDialog.open(AddElementComponent, {
            panelClass: "add-element-dialog",
            data: {
                semestreId: this.semestre.id,
                professeurs: this.professeurs,
                modules: this.semestre.modules,
            },
        });

        this.dialogRef.afterClosed().subscribe((response: { type: string; nom: string; semestreId: number; professeurId: any; coefficient: number; moduleId: number; }) => {
           
            if (!response) return;
            if (response.type === "Module") {
                this._gestionMatiereService.addModule(response).subscribe(
                    (res)=>{
                        this.toastr.success("Ce module est bien ajouté");  
                        this.semestre.modules.push(res);
                    },
                    (err)=>{                        
                        //show a toaster with the error message
                        this.toastr.error(err.error.message, "Erreur");
                    });;
            }
            else if (response.type === "Matiere") {   
                this.eventsSubject.next(response);             
            }
        });
    }

    /**
     * Toggle sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}
