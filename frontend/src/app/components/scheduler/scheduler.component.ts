import { Component, OnInit } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventDropArg } from '@fullcalendar/angular';

import { TokenService } from 'src/app/services/token.service';
import { SchedulerService } from 'src/app/services/scheduler.service';

import { RoomService } from 'src/app/services/room.service';
import { AlertComponent } from '../alert/alert.component';
import { MatDialog } from '@angular/material/dialog';
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
  calendarVisible = true;


  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: ''
    },
    initialView: 'dayGridMonth',
    eventSources:[
      {url: `http://localhost:3000/scheduler/getEvents`, method: 'GET', extraParams: { email: this.tokenStorage.getEmail(), roomNo: this.roomService.getCurrentRoomNo()}}],

    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      meridiem: false
    },
    eventColor: '#1e5c40',
    weekends: false,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventDrop: this.handleEventDragDrop.bind(this)

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

  constructor(private dialog: MatDialog, private roomService: RoomService, private schedulerService:SchedulerService, private http: HttpClient, private tokenStorage: TokenService) {}

  myFunction(){
    this.count ++;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleAllTasks() {}


  handleEventDragDrop(dropInfo: EventDropArg){
    console.log("handleDrag")
    //alert(dropInfo.event.title + " was dropped on " + dropInfo.event.start);

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
    const title = prompt('Please enter the task name.');

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

    if (confirm(`Do you want to delete the task '${clickInfo.event.title}'?`)) {

      this.schedulerService.deleteEvent(clickInfo).subscribe(msg => {console.log(msg); clickInfo.event.remove();}, err => { this.openDialog();})
    }
  }


  openDialog(): void {
    this.dialog.open(AlertComponent, {
       width: '250px',
       data: "The delete operation failed. Please try again."
     })
       setTimeout(() =>
     {
    },
     5000);
   }

  handleEvents() {
    var email = this.tokenStorage.getEmail()
    console.log("handleEvents ", email)
  }
}
