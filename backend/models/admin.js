const db = require('../util/database');

module.exports = class Admin {
  constructor(id_user, id_room) {
   
    this.id_user = id_user;
    this.id_room = id_room;
  }



  static saveAdmin(email, roomNo) {
    return db.execute(
      'INSERT INTO admins (id_user, id_room) VALUES ((SELECT id FROM users WHERE email = ?),(SELECT id FROM rooms WHERE roomNo = ?))',
      [email, roomNo]
    );
  }

  static findAdmin(email, roomNo) {
    return db.execute(
      'SELECT id FROM admins WHERE id_user = (SELECT id FROM users WHERE email = ?) AND id_room = (SELECT id FROM rooms WHERE roomNo = ? AND id_user = (SELECT id FROM users WHERE email = ?))',
      [email, roomNo, email]
    );
  }
}
