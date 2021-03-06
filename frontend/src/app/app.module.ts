import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuardService} from './services/auth-guards.service';

import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTableModule } from "@angular/material/table";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSliderModule } from "@angular/material/slider";
import { FormsModule } from "@angular/forms";
import { JwtModule   } from '@auth0/angular-jwt';
import {MatDialogModule} from '@angular/material/dialog';

import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RoomComponent } from './components/room/room.component';

import { NewRoomComponent } from './components/new-room/new-room.component';
import { OldRoomComponent } from './components/old-room/old-room.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChatComponent } from './components/chat/chat.component';
//import { ScheduleModule, RecurrenceEditorModule, DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService } from '@syncfusion/ej2-angular-schedule';
import { SchedulerComponent } from './components/scheduler/scheduler.component'
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { PendingComponent } from './components/pending/pending.component';
import { RequestsComponent } from './components/requests/requests.component';
import { UsersComponent } from './components/users/users.component';
import { AlertComponent } from './components/alert/alert.component'; // a plugin!

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,

    SignupComponent,
    LoginComponent,
    HomeComponent,

    RoomComponent,
    NewRoomComponent,
    OldRoomComponent,
    ProfileComponent,
    ChatComponent,
    SchedulerComponent,
    PendingComponent,
    RequestsComponent,
    UsersComponent,
    AlertComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatSliderModule,
    FormsModule,
    NgbModule,
    JwtModule,
    FullCalendarModule,
    MatTableModule,
    MatDialogModule

  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
