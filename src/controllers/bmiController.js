// Import các hàm calculateBMI và classifyBMI từ bmi.js

// Hàm getBMI xử lý yêu cầu từ client
// Trả về JSON chứa bmi và classification

// Xuất hàm getBMI

// Lưu ý: Tham khảo mã trong tệp nameController.js

const { calculateBMI, classifyBMI } = require("../models/bmi");

const db = require("../services/db");

const getBMI = (req, res) => {
  const { weight, height } = req.body;
  const bmi = calculateBMI(weight, height);
  const classification = classifyBMI(bmi);

  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO user_bmi (weight_kg, height_cm, bmi) VALUES (?, ?, ?)",
      [weight, height, bmi],
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ bmi, classification });
        }
      }
    );
    res.json({ bmi, classification });
  });
};

const getBMIDataDB = async () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM user_bmi", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const getAllBMI = async (req, res) => {
  const bmiData = await getBMIDataDB();
  res.json(bmiData);
};

module.exports = { getBMI, getAllBMI };
