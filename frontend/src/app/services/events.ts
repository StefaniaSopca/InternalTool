import { EventInput } from '@fullcalendar/angular';

let eventGuid = 0;
export function createEventId() {
  return String(eventGuid++);
}
