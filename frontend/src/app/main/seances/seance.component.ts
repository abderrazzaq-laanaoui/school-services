import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Seance } from "./seance.entity";
import { fuseAnimations } from "@fuse/animations";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxMaterialTimepickerTheme } from "ngx-material-timepicker";
import { SeanceService } from "./seance.service";
import { MatTableDataSource } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";

export interface studentElement {
    nom: string;
    prenom: string;
    avatar: string;
    cin: string;
    cne: string;
}

@Component({
    selector: "seance",
    templateUrl: "./seance.component.html",
    styleUrls: ["./seance.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class SeanceComponent implements OnInit {
    absence: boolean = false;
    seanceData: Seance;

    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    costumTheme: NgxMaterialTimepickerTheme = {
        container: {
            buttonColor: "#000",
        },
        dial: {
            dialBackgroundColor: "#008000",
        },
        clockFace: {
            clockFaceBackgroundColor: "#F0F0F0",
            clockHandColor: "#008000",
        },
    };
    displayedColumns: string[] = ["select", "avatar", "nom", "cin"];

    dataSource: MatTableDataSource<studentElement>;

    selection = new SelectionModel<studentElement>(true, []);
    studentsList: any;
    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _seanceService: SeanceService
    ) {}

    ngOnInit() {
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ["", Validators.required],
        });
        this.firstFormGroup = this._formBuilder.group({
            heureDebut: ["", Validators.required],
            heureFin: ["", Validators.required],
            matiere: ["", Validators.required],
            date: ["", Validators.required],
            class: ["", Validators.required],
        });
    }

    async selectClass(classe) {
        this.studentsList = await this._seanceService.getStudentList(classe);
        this.dataSource = new MatTableDataSource<studentElement>(
            this.studentsList
        );
    }
    submitFirstForm(e) {
        console.log(JSON.stringify(this.firstFormGroup.getRawValue()));
    }
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected == numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected()
            ? this.selection.clear()
            : this.dataSource.data.forEach((row) => this.selection.select(row));
    }
}
