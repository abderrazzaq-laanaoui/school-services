import {  Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { FuseSidebarService } from "@fuse/components/sidebar/sidebar.service";
import { GestionMatiereService } from "./gestion-matiere.service";

@Component({
    selector: "gestion-matiere",
    templateUrl: "./gestion-matiere.component.html",
    styleUrls: ["./gestion-matiere.component.scss"],
})
export class GestionMatiereComponent implements OnInit {

    semestre: any;
    semstresList: Array<string>;
    currentSemestre: any;
    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _gestionMatiereService: GestionMatiereService,
        private route: ActivatedRoute,
        public router: Router
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    ngOnInit(): void {
        this.route.params.subscribe((d) => {
            this.currentSemestre = d.id;
            
        });
        this.semestre = this._gestionMatiereService.semestre;
        
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

    async goToSemestre(nbr: number){
        this.router.navigate(['/gestion-etudes',nbr]).then(()=>{
            this.semestre = this._gestionMatiereService.semestre
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
