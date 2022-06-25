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

  static save(email, event) {
    return db.execute(
      'INSERT INTO events (id_user, title, start, end) VALUES ((SELECT id FROM users WHERE email =?), ?, ?, ?)',
      [email, event.title, event.start, event.end]
    );
  }

  static select(email) {
    
    return db.execute(
      'SELECT * FROM events WHERE id_user= (SELECT id FROM users WHERE email = ?);', [email]);
  }

  static selectAllButton() {
    
    return db.execute(
      'SELECT * FROM events;');
  }
  static selectId(oldEvent) {
    
    return db.execute(
      'SELECT id FROM events WHERE title =? AND start =? AND  end =?', [oldEvent.title, oldEvent.start, oldEvent.end]);
  }

  static selectAll(email) {
    
    return db.execute(
      'SELECT count(*) as no FROM events WHERE id_user = (SELECT id FROM users WHERE email = ?) ;', [email]);
  }

  static updateEvent(id, start, end){
    return db.execute('UPDATE events SET start = ? , end = ? WHERE id =?', [start, end, id])
  }

  static deleteEvent(idEvent){
    return db.execute('DELETE FROM events WHERE id=?;', [idEvent])
  }
};