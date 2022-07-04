import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EventClickArg, EventDropArg } from '@fullcalendar/angular';


@Injectable({
  providedIn: 'root'
})

export class SchedulerService {

  private url='http://localhost:3000';

  constructor( private http: HttpClient, private router: Router) {

   }

  updateEvent(dropInfo: EventDropArg){
    return this.http.post(`${this.url}/auth/updateEvent`, dropInfo);
  }

  deleteEvent(clickInfo: EventClickArg){
    return this.http.delete(`${this.url}/auth/deleteEvent`, {params:{id: clickInfo.event.id}});
  }

  saveEvent(email: string, title: string, start:string, end: string, roomNo: string)
  {
    return this.http.post(`http://localhost:3000/auth/scheduler`, {email, title,  start, end, roomNo })
  }
}

