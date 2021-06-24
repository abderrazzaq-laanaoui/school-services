import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Seance } from "./seance.entity";
import { fuseAnimations } from '@fuse/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector     : 'seance',
    templateUrl  : './seance.component.html',
    styleUrls    : ['./seance.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class SeanceComponent implements OnInit
{
    absence: boolean = false;
    seanceData: Seance;
    
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
    /**
     * Constructor
     */
    constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }


}
