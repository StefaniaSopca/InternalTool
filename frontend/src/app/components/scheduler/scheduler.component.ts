import { Component, OnInit } from '@angular/core';
import { createEventId} from 'src/app/services/events'
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi,EventInput, CalendarApi, EventDropArg } from '@fullcalendar/angular';

import { TokenStorageService } from 'src/app/services/token-storage.service';
import { throwError } from 'rxjs';
import { compileInjectable } from '@angular/compiler';
import { SchedulerService } from 'src/app/services/scheduler.service';
import { ProfileService } from 'src/app/services/profile.service';
import { RoomService } from 'src/app/services/room.service';
@Component({
  selector: 'app-scheduler',

  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {
  private url = "http://localhost:3000";

  count = 0;
  email_user: string = "";
  created: any = 0;
  idEvent : any =0;
  urlEvents = `http://localhost:3000/auth/getEvents/`
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    eventSources:[
      {url: `http://localhost:3000/auth/getEvents`, method: 'GET', extraParams: { email: this.tokenStorage.getEmail(), roomNo: this.roomService.getCurrentRoomNo()}}],

    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      meridiem: false
    },
    weekends: false,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    eventDrop: this.handleEventDragDrop.bind(this)
    /*
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents!: EventApi[];

  DBevents : any[] = [] ;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
  })};

  ngOnInit() {
    console.log("oninit")
    this.currentEvents = []
    this.email_user = this.tokenStorage.getEmail();
  }

  constructor(private roomService: RoomService, private schedulerService:SchedulerService, private http: HttpClient, private tokenStorage: TokenStorageService) {}

  myFunction(){
    this.count ++;
  }

  //DE VERIFCAT
  handleCalendarToggle() {
    this.calendarOptions ={
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      initialView: 'dayGridMonth',
      eventSources:[
        {url: `http://localhost:3000/auth/getAllEvents`, method: 'GET', extraParams: { email: this.tokenStorage.getEmail(), roomNo: this.roomService.getCurrentRoomNo()}}],
      eventTimeFormat: {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        meridiem: false
      },
      weekends: true,
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventsSet: this.handleEvents.bind(this),
      eventDrop: this.handleEventDragDrop.bind(this)
      /*
      eventAdd:
      eventChange:
      eventRemove:
      */
    };
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleAllTasks() {

    this.calendarOptions ={
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      initialView: 'dayGridMonth',
      eventSources:[
        {url: `http://localhost:3000/auth/getAllEvents`, method: 'GET'}],

      eventTimeFormat: { // like '14:30:00'
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        meridiem: false
      },
      eventColor: '#cc8800',
      weekends: false,
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventsSet: this.handleEvents.bind(this),
      eventDrop: this.handleEventDragDrop.bind(this)
      /*
      eventAdd:
      eventChange:
      eventRemove:
      */
    };
  }

  handleEventDragDrop(dropInfo: EventDropArg){
    console.log("handleDrag")
    alert(dropInfo.event.title + " was dropped on " + dropInfo.event.start);

    if (!confirm("Are you sure about this change?")) {
      dropInfo.revert();
    }
    else{
      console.log(dropInfo.oldEvent.end)

      this.schedulerService.updateEvent(dropInfo)
        .subscribe((resp:any) => { console.log(resp)});
    }
  }


  handleDateSelect(selectInfo: DateSelectArg) {
    console.log("handleSelect ", this.roomService.getCurrentRoomNo())
    const title = prompt('Please enter a new title for your event');

    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection
    var start = selectInfo.startStr
    var end = selectInfo.endStr

    if (title) {
      var email = this.tokenStorage.getEmail()

      this.schedulerService.saveEvent(email, title, start, end, this.roomService.getCurrentRoomNo())
        .subscribe( id => { this.idEvent = id; console.log("id bun din bbaza de date", id);
            calendarApi.addEvent({
              id: this.idEvent,
              title,
              start: selectInfo.startStr,
              allDay: true
            });
        })
    }
  }
  handleEventClick(clickInfo: EventClickArg) {
    console.log("handleClink ", clickInfo.event.id)
    console.log("here", this.currentEvents)

    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}' start '${clickInfo.event.start}'`)) {
      clickInfo.event.remove();
      this.schedulerService.deleteEvent(clickInfo).subscribe(msg => console.log(msg))
    }
  }

  handleEvents() {
    var email = this.tokenStorage.getEmail()
    console.log("handleEvents ", email)
  }
}
