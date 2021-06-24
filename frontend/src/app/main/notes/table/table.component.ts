import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'notes-table',
  templateUrl: './table.component.html',
  styleUrls: [ './table.component.scss']
})
export class NotesTableComponent implements OnInit {
  datasource:any[];
  constructor() { }

  async ngOnInit(): Promise<void> {
  }

}