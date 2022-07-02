const db = require('../util/database');

module.exports = class Events {
  constructor(title, start, end , allDay) {
    this.title = title;
    this.start = start;
    this.end = end;
    this.allDay = allDay;
  }

//   static find(email) {
//     return db.execute('SELECT * FROM users WHERE email = ?', [email]);
//   }

  static save(email, event, roomNo) {
    return db.execute(
      'INSERT INTO events (id_user, title, start, end, id_room) VALUES ((SELECT id FROM users WHERE email =?), ?, ?, ?, (SELECT id FROM rooms WHERE roomNo = ? AND id_user =(SELECT id FROM users WHERE email = ?)));',
      [email, event.title, event.start, event.end, roomNo, email]
    );
  }

  static select(email, roomNo) {
    
    return db.execute(
      'SELECT * FROM events WHERE id_user= (SELECT id FROM users WHERE email = ?) AND id_room = (SELECT id FROM rooms WHERE roomNo = ? AND id_user= (SELECT id FROM users WHERE email = ?));', [email, roomNo, email]);
  }

  static selectAllButton() {
    
    return db.execute(
      'SELECT * FROM events;');
  }
  static selectId(oldEvent) {
    
    return db.execute(
      'SELECT id FROM events WHERE title =? AND start =? AND  end =?', [oldEvent.title, oldEvent.start, oldEvent.end]);
  }

  static selectAll(email, roomNo) {
    
    return db.execute(
      'SELECT count(*) as no FROM events WHERE id_user = (SELECT id FROM users WHERE email = ?) AND id_room = (SELECT id FROM rooms WHERE roomNo = ? AND id_user = (SELECT id FROM users WHERE email = ?));', [email, roomNo, email]);
  }

  static updateEvent(id, start, end){
    return db.execute('UPDATE events SET start = ? , end = ? WHERE id =?', [start, end, id])
  }

  static deleteEvent(idEvent){
    return db.execute('DELETE FROM events WHERE id=?;', [idEvent])
  }

  static deleteEventEmail(email){
    console.log('deleteEventEmail')
    return db.execute('DELETE FROM events WHERE id_user = (SELECT id FROM users WHERE email = ?);', [email])
  }
};