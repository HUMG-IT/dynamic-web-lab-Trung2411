/**
 * Module quản lý danh sách tên
 *
 * Module này lưu trữ danh sách tên và cung cấp các phương thức để:
 * - Thêm tên mới vào danh sách.
 * - Lấy danh sách tên hiện có.
 */

/**
 * Hàm `addName`
 *
 * Hàm này thêm một tên mới vào danh sách tên.
 *
 * @function addName
 * @param {string} name - Tên cần thêm vào danh sách.
 *
 * @example
 * addName("John");
 * // Sau khi thêm, mảng names sẽ là ["John"]
 */

const db = require("../services/db");

const addName = (name) => {
  db.run("INSERT INTO users (name) VALUES (?)", [name], (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Có lỗi xảy ra" });
    }
    console.log("Đã lưu tên vào cơ sở dữ liệu");
  });
};

/**
 * Hàm `getNames`
 *
 * Hàm này trả về danh sách tên hiện có.
 *
 * @function getNames
 * @returns {string[]} - Mảng chứa tất cả các tên đã được thêm.
 *
 * @example
 * getNames();
 * // Kết quả: ["John", "Jane"]
 */

const getNames = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT name FROM users", (err, rows) => {
      if (err) {
        reject(err); // Reject the promise if there's an error
      } else {
        resolve(rows.map((row) => row.name)); // Resolve with the list of names
      }
    });
  });
};

module.exports = { addName, getNames };
