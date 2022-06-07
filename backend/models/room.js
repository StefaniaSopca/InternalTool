const db = require('../util/database');

module.exports = class Room {
  constructor(email, roomNo) {
   
    this.email = email;
    this.roomNo = roomNo;
  }

  static find(email) {
    return db.execute('SELECT * FROM rooms WHERE email = ?', [email]);
  }

  static find(roomNo) {
    return db.execute('SELECT * FROM rooms WHERE roomNo = ?', [roomNo]);
  }

  static findAllRooms(email) {
    return db.execute('SELECT roomNo FROM rooms WHERE id_user = (SELECT id FROM users WHERE email = ?)', [email]);
  }


  static save(room) {

    return db.execute(
      'INSERT INTO rooms ( id_user, roomNo) VALUES ( (SELECT id FROM users WHERE email = ?), ?)',
      [room.email, room.roomNo]
    );
  }

  // static save(room) {
  //   return db.execute(
  //     'INSERT INTO rooms ( email, roomNo) VALUES ( ?, ?)',
  //     [room.email, room.roomNo]
  //   );
  // }


  static select(username, roomNo) {
    console.log("select", username, roomNo);
    return db.execute(
      //email -> username
      'SELECT email FROM rooms WHERE email <> ? AND roomNo = ?', [username, roomNo]);
  }
};