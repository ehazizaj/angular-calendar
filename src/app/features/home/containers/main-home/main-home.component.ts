import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import {Songs} from '../../models/songs';
import {HomeService} from '../../home.service';
import {take} from 'rxjs/operators';
import {SongsListByDayComponent} from '../../components/songs-list-by-day/songs-list-by-day.component';
import {MatDialog} from '@angular/material/dialog';
import {SongDetailsComponent} from '../../components/song-details/song-details.component';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainHomeComponent implements OnInit {

  // set calendar initial view type
  view: CalendarView = CalendarView.Month;

  // get calendar view types
  CalendarView = CalendarView;

  // The current view date
  viewDate: Date = new Date();

  // An observable that when emitted on will re-render the current view
  refresh: Subject<any> = new Subject();

  // calendar events which will be shown in calendar
  events: CalendarEvent[] = [];

// list of songs from the api
  songs: Songs[];

  constructor(private toast: ToastrService,
              private modal: NgbModal,
              private homeService: HomeService,
              private cdr: ChangeDetectorRef,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getSongs();
  }

  /**
   * Get List of the songs from the local json
   * @return void
   */
  getSongs(): void {
    this.homeService.getSongs().pipe(take(1)).subscribe(songs => {
      // on success go to function with songs list
      this.handleCalendarEvents(songs);
    });
  }

  /**
   * Loop song list and create a new calendar event
   * @param songs: Songs[]
   * @return void
   */
  handleCalendarEvents(songs: Songs[]): void {
    this.events = songs.map((song) => {
      return {
        id: song.id,
        title: song.title,
        artist: song.artist,
        album: song.album,
        start: new Date(song.release_date),
        end: new Date(song.release_date),
        color: {primary: '#1e90ff', secondary: '#D1E8FF'},
        allDay: true,
        resizable: {beforeStart: true, afterEnd: true},
        draggable: true,
      };
    });
    this.cdr.markForCheck();
  }

  /**
   * On day of calendar click open modal with list of songs released in that day
   * @param events: CalendarEvent[]
   * @return void
   */
  dayClicked({events}: { date: Date; events: CalendarEvent[] }): void {
    if (events.length !== 0) {
      const dialogRef = this.dialog.open(SongsListByDayComponent, {height: '400', width: '800px'});
      dialogRef.componentInstance.events = events;
    }
  }

  /**
   * drag a event on a new date and update event start and end date
   * first update the array of events
   * second do call in service for update event
   * @param event: event that has changed
   * @param newStart: New start date for event
   * @param newEnd: New end date for event
   * @return void
   */
  eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    // function to call service
    this.updateSong(event.id);
  }

  /**
   * update event which date has change
   * @param id: event that has changed
   * @return void
   */
  updateSong(id: string | number): any {
    // find event from the array and pass as parameter to service
    this.events.map((iEvent) => {
      if (iEvent.id === id) {
        this.homeService.updateSong(iEvent).pipe(take(1)).subscribe(() => {
          this.toast.success('Song Updated Successfully!', 'Success');
        });
      }
    });

  }

  /**
   * open modal of event details
   * @param event: CalendarEvent event that has been clicked
   * @return void
   */
  eventClicked(event: CalendarEvent): void {
    const dialogRef = this.dialog.open(SongDetailsComponent, {disableClose: true, height: '400', width: '800px'});
    dialogRef.componentInstance.event = event;
    dialogRef.afterClosed().subscribe(result => {
      if (result.data === 'Delete') {
        this.deleteEvent(result.event);
      }
    });
  }

  /**
   * delete event
   * @param eventToDelete: CalendarEvent event to be deleted
   * @return void
   */
  deleteEvent(eventToDelete: CalendarEvent): void {
    this.events = this.events.filter((event) => event !== eventToDelete);
    this.cdr.markForCheck();
    this.homeService.deleteSong(eventToDelete.id).pipe(take(1)).subscribe(() => {
      this.toast.success('Song Delete Successfully!', 'Success');
    });
  }

  /**
   * calendar view
   * @param view: CalendarView change view for calendar
   * @return void
   */
  setView(view: CalendarView): void {
    this.view = view;
  }


}
