let users = JSON.parse(localStorage.getItem("users")) || [
  {
    id: 1,
    fullName: "Admin Chính",
    email: "LQTuan@rikkei.edu.vn",
    password: "Admin123456",
    role: "admin",
    createdAt: "2026-03-03T12:26:21.617Z",
    isActive: true,
  },
  {
    id: 2,
    fullName: "Nguyễn Van A",
    email: "nguyenvana@example.com",
    password: "Matkhau123",
    role: "user",
    createdAt: "2026-03-01T12:26:21.617Z",
    isActive: true,
  },
  {
    id: 3,
    fullName: "Trần Thị B",
    email: "tranthib@example.com",
    password: "12345678",
    role: "user",
    createdAt: "2026-03-03T12:26:21.617Z",
    isActive: false,
  },
];
const form = document.querySelector(".form");

const nameInput = document.getElementById("fullname");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm");

const errName = document.getElementById("errorName");
const errEmail = document.getElementById("errorEmail");
const errPassword = document.getElementById("errorPassword");
const errConfirm = document.getElementById("errorConfirm");

//test email
const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// mật khẩu phải 8 số
const validatePassword = (pass) => {
  return /^(?=.*[!@#$%^&*])(?=.{8,})/.test(pass);
};
// hiện total
const showToast = () => {
  const toast = document.getElementById("toast");
  toast.classList.remove("hidden");
  setTimeout(() => closeToast(), 3000); // tự đóng sau 3s
};

const closeToast = () => {
  document.getElementById("toast").classList.add("hidden");
};

// lắng nghe sự kiện
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let isValid = true;

  errName.textContent = "";
  errEmail.textContent = "";
  errPassword.textContent = "";
  errConfirm.textContent = "";

  if (nameInput.value.trim() === "") {
    errName.textContent = "Họ và tên không được để trống";
    isValid = false;
  }

  if (emailInput.value.trim() === "") {
    errEmail.textContent = "Email không được để trống";
    isValid = false;
  } else if (!validateEmail(emailInput.value)) {
    errEmail.textContent = "Email phải đúng định dạng";
    isValid = false;
  } else if (users.some((user) => user.email === emailInput.value.trim())) {
    // kiem tra email đã tồn tại hay chx
    errEmail.textContent =
      "Email này đã được đăng ký, vui lòng dùng email khác";
    isValid = false;
  }

  if (passwordInput.value.trim() === "") {
    errPassword.textContent = "Mật khẩu không được để trống";
    isValid = false;
  } else if (!validatePassword(passwordInput.value)) {
    errPassword.textContent =
      "Mật khẩu tối thiểu 8 ký tự và có ít nhất 1 ký tự đặc biệt";
    isValid = false;
  }

  if (confirmInput.value.trim() === "") {
    errConfirm.textContent = "Mật khẩu xác nhận không được để trống";
    isValid = false;
  } else if (confirmInput.value !== passwordInput.value) {
    errConfirm.textContent = "Mật khẩu không trùng khớp";
    isValid = false;
  }

  // hien thi canh bao

  const terms = document.getElementById("terms");
  const errTerms = document.getElementById("errorTerms");
  if (!terms.checked) {
    errTerms.textContent = "Bạn phải đồng ý với điều khoản sử dụng";
    isValid = false;
  } else {
    errTerms.textContent = "";
  }

  if (isValid) {
    // Thêm user mới vào danh sách
    const newUser = {
      id: Date.now(),
      fullName: nameInput.value.trim(),
      email: emailInput.value.trim(),
      password: passwordInput.value,
      role: "user",
      createdAt: new Date().toISOString(),
      isActive: true,
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    showToast();
    setTimeout(() => {
      window.location.href = "./login.html";
    }, 1000);
  }
});

window.togglePassword = (id, el) => {
  const input = document.getElementById(id);
  const icon = el.querySelector("i");

  if (input.type === "password") {
    input.type = "text";
    icon.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    input.type = "password";
    icon.classList.replace("fa-eye-slash", "fa-eye");
  }
};
