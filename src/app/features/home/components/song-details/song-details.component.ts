import {Component, Input, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.scss']
})
export class SongDetailsComponent implements OnInit {
  // event which details will be shown
  @Input() event;

  constructor(public dialogRef: MatDialogRef<SongDetailsComponent>) {
  }

  ngOnInit(): void {

  }

  // close dialog and delete event
  doAction(event): void {
    this.dialogRef.close({data: 'Delete', event});
  }

// close dialog
  closeDialog(): void {
    this.dialogRef.close({data: 'Cancel'});
  }
}
