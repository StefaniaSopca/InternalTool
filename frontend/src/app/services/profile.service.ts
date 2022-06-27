import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  private url='http://localhost:3000';
  private _roomNo: string = "";

  constructor( private http: HttpClient, private router: Router) {

  }


  public setRoomNo(roomNo: string) {
    this._roomNo = roomNo;
  }

  public getRoomNo() {
    return this._roomNo ;
  }
}
