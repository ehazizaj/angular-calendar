import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import {RouterModule, Routes} from '@angular/router';
import {MainHomeComponent} from './containers/main-home/main-home.component';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {HttpClientModule} from '@angular/common/http';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {LayoutModule} from '../../layout/layout.module';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import {TranslucentModule} from '../../shared/translucent.directive';
import { SongsListByDayComponent } from './components/songs-list-by-day/songs-list-by-day.component';
import {MatDialogModule} from '@angular/material/dialog';
import { SongDetailsComponent } from './components/song-details/song-details.component';


const routes: Routes = [
  {
    path: '',
    component: MainHomeComponent
  }
];
@NgModule({
  declarations: [MainHomeComponent, SongsListByDayComponent, SongDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    MatTableModule,
    HttpClientModule,
    NgbDatepickerModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTooltipModule,
    LayoutModule,
    MatProgressSpinnerModule,
    TranslucentModule,
    MatAutocompleteModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MatDialogModule,
  ],
  providers: [ DatePipe ],
  exports: [ RouterModule ]
})
export class HomeModule { }
