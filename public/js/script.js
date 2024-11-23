// Form lưu tên
document
  .getElementById("nameForm")
  .addEventListener("submit", async function (e) {
    // Ngăn hành vi mặc định của form (ngăn tải lại trang)
    e.preventDefault();

    // Lấy giá trị nhập từ trường input có id là 'name'
    const name = document.getElementById("name").value;

    // Gửi yêu cầu POST đến server tại route '/submit' với dữ liệu JSON
    const response = await fetch("/api/v1/submit", {
      method: "POST", // Sử dụng phương thức POST để gửi dữ liệu
      headers: {
        "Content-Type": "application/json", // Định nghĩa kiểu nội dung gửi là JSON
      },
      body: JSON.stringify({ name: name }), // Chuyển đổi đối tượng { name: name } thành chuỗi JSON
    });

    // Chờ phản hồi từ server và chuyển đổi phản hồi từ JSON thành đối tượng JavaScript
    const data = await response.json();

    // Hiển thị thông điệp trả về từ server trong phần tử có id là 'nameResponse'
    document.getElementById("nameResponse").textContent = `${
      data.message
    }. Danh sách tên: ${data.names.join(", ")}`;
  });

// Form tính BMI
document
  .getElementById("bmiForm")
  .addEventListener("submit", async function (e) {
    // Ngăn hành vi mặc định của form (ngăn tải lại trang)
    e.preventDefault();

    // Lấy giá trị chiều cao, cân nặng nhập từ form
    const height = parseFloat(document.getElementById("height").value);
    const weight = parseFloat(document.getElementById("weight").value);

    // Gửi yêu cầu POST đến server tại route '/bmi' với dữ liệu JSON
    const response = await fetch("/api/v1/bmi", {
      method: "POST", // Sử dụng phương thức POST để gửi dữ liệu
      headers: {
        "Content-Type": "application/json", // Định nghĩa kiểu nội dung gửi là JSON
      },
      body: JSON.stringify({ height, weight }), // Chuyển đổi đối tượng thành chuỗi JSON
    });

    // Chờ phản hồi từ server và chuyển đổi phản hồi từ JSON thành đối tượng JavaScript
    const data = await response.json();

    // Hiển thị thông điệp trả về từ server trong phần tử có id là 'bmiResult'
    document.getElementById(
      "bmiResult"
    ).textContent = `BMI của bạn là: ${data.bmi}, Phân loại: ${data.classification}`;

    // Tải danh sách BMI từ server

    const response2 = await fetch("/api/v1/getAllBMI", {
      method: "GET", // Sử dụng phương thức GET để gửi dữ liệu
      headers: {
        "Content-Type": "application/json", // Định nghĩa kiểu nội dung gửi là JSON
      },
    });

    // Chờ phản hồi từ server và chuyển đổi phản hồi từ JSON thành đối tượng JavaScript
    const data2 = await response2.json();

    // Hiển thị danh sách BMI từ server trong phần tử có id là 'bmiResult2'
    const bmiResult2 = document.getElementById("bmiResult2");

    bmiResult2.innerHTML = "Database:";

    for (let i = 0; i < data2.length; i++) {
      const div = document.createElement("div");
      div.innerHTML += `<p>User ${data2[i].id}: ${data2[i].weight_kg} kg, ${data2[i].height_cm} cm, ${data2[i].bmi} BMI</p>`;

      bmiResult2.appendChild(div);
    }
  });
