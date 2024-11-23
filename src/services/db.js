const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./app.db", (err) => {
  if (err) {
    console.log("Không thể kết nối đến cơ sở dữ liệu");
    return;
  }
  console.log("Đã kết nối đến cơ sở dữ liệu");
});

db.run(
  "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"
);
db.run(
  "CREATE TABLE IF NOT EXISTS user_bmi (id INTEGER PRIMARY KEY AUTOINCREMENT, height_cm REAL NOT NULL, weight_kg REAL NOT NULL, bmi REAL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)"
);

module.exports = db;
