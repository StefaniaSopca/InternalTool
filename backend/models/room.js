const db = require('../util/database');

module.exports = class Room {
  constructor(email, roomNo) {
   
    this.email = email;
    this.roomNo = roomNo;
  }

  static find(email) {
    return db.execute('SELECT * FROM rooms WHERE email = ?', [email]);
  }

  static findRoom(roomNo) {
    return db.execute('SELECT * FROM rooms WHERE roomNo = ?', [roomNo]);
  }
  static findRoomUser( roomNo, email) {
    return db.execute('SELECT * FROM rooms WHERE roomNo = ? AND id_user = (SELECT id FROM users WHERE email = ?)', [roomNo, email]);
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
  static selectIdUser(roomNo,email) {
    
    return db.execute(
      //email -> username
      'SELECT id_user FROM rooms WHERE roomNo = ? AND id_user <> (SELECT id FROM users WHERE email =?);', [roomNo, email]);
  }

  static selectEmails(id_user) {
 
    return db.execute(
      //email -> username
      'SELECT email FROM users WHERE id = ?;', [id_user]);
  }

  static deleteRoom(email) {
    console.log("deleteROOM", email);
    return db.execute(
      'DELETE FROM rooms WHERE id_user = (SELECT id FROM users WHERE email =?);', [email]);
  }
};