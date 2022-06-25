import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private created: number = 0;

  public getCreated(): number { return this.created; }
  public setCreated(value: number) { this.created = value; }

}
