import { Component, Input, OnInit } from '@angular/core';
import {GestionMatiereService} from '../gestion-matiere.service'
@Component({
  selector: 'matiere-table',
  templateUrl: './table.component.html',
  styleUrls: [ './table.component.scss']
})
export class MatiereTableComponent implements OnInit {
  @Input('module') module : any;

  datasource:any;
  constructor(private _gestionMatiereService: GestionMatiereService) { }

  async ngOnInit(): Promise<void> {
     this.datasource =  this.module.matieres
  }

}