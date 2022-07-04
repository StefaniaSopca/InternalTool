import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class HomeService {
  //private socket: Socket;
  private url='http://localhost:3000';
  private _isAdminValue = false;

  public getIsAdminValue() {
    //console.log("get", this._isAdminValue)
    return this._isAdminValue;
  }
  public setIsAdminValue(value: any) {
    console.log("set ", value)
    this._isAdminValue = value;
  }

  constructor(private http: HttpClient){}

  noEvents(email:string, roomNo: string){
    console.log("noEventsss", roomNo);
    return this.http.get(`http://localhost:3000/auth/getNoEvents`, {params:{email: email, roomNo: roomNo}})
  }

  isAdmin(email:string, roomNo:string){
    return this.http.get(`http://localhost:3000/auth/findAdmin`, {params:{email: email, roomNo: roomNo}})
  }

}
