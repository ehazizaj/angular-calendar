import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from './layout/layout.module';
import { JWT_TOKEN_INTERCEPTOR } from './core/interceptors/jwt.interceptor';
import { HTTP_ERROR_INTERCEPTOR } from './core/interceptors/error.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { TOAST_CONFIG } from './core/config/toast.config';
import { LoginModule } from './core/components/login/login.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatNativeDateModule } from '@angular/material/core';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    LayoutModule,
    ToastrModule.forRoot(TOAST_CONFIG),
    ReactiveFormsModule,
    LoginModule,
    NgbModule,
    MatNativeDateModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  providers: [
    JWT_TOKEN_INTERCEPTOR,
    HTTP_ERROR_INTERCEPTOR],
  bootstrap: [AppComponent]
})
export class AppModule { }
