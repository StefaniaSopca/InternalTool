const db = require('../util/database');

module.exports = class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static find(email) {
    return db.execute('SELECT * FROM users WHERE email = ?', [email]);
  }

  static save(user) {
    return db.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [user.name, user.email, user.password]
    );
  }

  static select(username) {
    console.log("select", username);
    return db.execute(
      'SELECT name FROM users WHERE name <> ?', [username]);
  }
};