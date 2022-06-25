import { Component, OnInit } from '@angular/core';
import { createEventId} from 'src/app/services/events'
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi,EventInput, CalendarApi, EventDropArg } from '@fullcalendar/angular';
import { EventService } from 'src/app/services/events.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { throwError } from 'rxjs';
import { compileInjectable } from '@angular/compiler';
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

   // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
     eventSources:[
        {url: `http://localhost:3000/auth/getEvents`, method: 'GET', extraParams: { email: this.tokenStorage.getEmail()}}],

        eventTimeFormat: { // like '14:30:00'
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          meridiem: false
        }
        ,
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    eventDrop: this.handleEventDragDrop.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents!: EventApi[];

  DBevents : any[] = [] ;
  // httpOptions: { headers: HttpHeaders } = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
   httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })};




  ngOnInit() {
    console.log("oninit")
   // this.httpOptions.headers.append('Access-Control-Allow-Methods','DELETE')
    this.currentEvents = []
    this.email_user = this.tokenStorage.getEmail();

   // this.http.get(`${this.url}/auth/getEvents`).subscribe((resp:any) => {  this.currentEvents.push(resp[0]), console.log(this.currentEvents[0])});

  }

  constructor(private http: HttpClient, private eventService: EventService, private tokenStorage: TokenStorageService) {}



  myFunction(){
    this.count ++;
  }



  handleCalendarToggle() {
    this.calendarOptions ={
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      initialView: 'dayGridMonth',

     // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
       eventSources:[
          {url: `http://localhost:3000/auth/getAllEvents`, method: 'GET', extraParams: { email: this.tokenStorage.getEmail()}}],

          eventTimeFormat: { // like '14:30:00'
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            meridiem: false
          }
          ,
      weekends: true,
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventsSet: this.handleEvents.bind(this),
      eventDrop: this.handleEventDragDrop.bind(this)
      /* you can update a remote database when these fire:
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
   //his.calendarOptions.eventSources.url=`${this.url}/auth/getAllEvents`;
   this.calendarOptions ={
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',

   // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
     eventSources:[
        {url: `http://localhost:3000/auth/getAllEvents`, method: 'GET'}],

        eventTimeFormat: { // like '14:30:00'
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          meridiem: false
        },
        eventColor: '#cc8800'
        ,
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
      this.http.post(`${this.url}/auth/updateEvent`, dropInfo).subscribe((resp:any) => { console.log(resp)});
    }
  }


  handleDateSelect(selectInfo: DateSelectArg) {
    console.log("handleSelect")
    const title = prompt('Please enter a new title for your event');

    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection
    var start = selectInfo.startStr
    var end = selectInfo.endStr

    if (title) {


      var email = this.tokenStorage.getEmail()
      this.http.post(`http://localhost:3000/auth/scheduler`, {email, title,  start, end })
      .subscribe( id => { this.idEvent = id; console.log("id bun din bbaza de date", id);
      calendarApi.addEvent({
        id: this.idEvent,
        title,
        start: selectInfo.startStr,
        allDay: true
      }); })

     // this.created ++;
      //this.eventService.setCreated(this.created);
    }
  }

  private handleError(err: string) {
    console.log(err)
  }

  handleEventClick(clickInfo: EventClickArg) {
    console.log("handleClink ", clickInfo.event.id)

    //this.http.get(`${this.url}/auth/getEvents`).subscribe((resp:any) => {console.log(resp.start), this.currentEvents.push(resp)});
    console.log("here", this.currentEvents)
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}' start '${clickInfo.event.start}'`)) {
      clickInfo.event.remove();
      //this.created --;
     // this.eventService.setCreated(this.created);
      this.http.delete(`${this.url}/auth/deleteEvent`, {params:{id:  clickInfo.event.id}}).subscribe(() => console.log("executed"))
    }
  }

  handleEvents() {

    var email = this.tokenStorage.getEmail()
    console.log("handleEvents ", email)

    //this.http.get(`${this.url}/auth/getEvents`).subscribe((data) => {console.log(data)});
    //console.log("here", this.currentEvents)
   // this.created = this.currentEvents.length;

  }


}
