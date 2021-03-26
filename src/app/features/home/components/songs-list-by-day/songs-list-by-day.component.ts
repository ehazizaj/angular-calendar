import {Component, Input, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {CalendarEvent} from 'angular-calendar';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-songs-list-by-day',
  templateUrl: './songs-list-by-day.component.html',
  styleUrls: ['./songs-list-by-day.component.scss']
})
export class SongsListByDayComponent {

  // an input of events array to show in modal table
  @Input() events: CalendarEvent[];

  constructor(public dialogRef: MatDialogRef<SongsListByDayComponent>) {
  }

  // make data ready for the table
  dataSource = new MatTableDataSource<CalendarEvent>();
  // create columns for the header
  displayedColumns = [
    'artist',
    'title',
    'album',
    'release_date',
  ];

  // close dialog
  closeDialog(): void {
    this.dialogRef.close();
  }


}
