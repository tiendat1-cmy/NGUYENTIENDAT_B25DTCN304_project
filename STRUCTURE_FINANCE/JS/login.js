const users = JSON.parse(localStorage.getItem("users")) || [
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
];

const form = document.querySelector(".login_box");
const emailElement = document.getElementById("email");
const passwordElement = document.getElementById("password");
const errEmail = document.getElementById("emailError");
const errPassword = document.getElementById("errorPassword");

// hien / ẩn mật khẩu
document.getElementById("togglePassword").addEventListener("click", () => {
  const input = passwordElement;
  const icon = document.querySelector("#togglePassword i");
  if (input.type === "password") {
    input.type = "text";
    icon.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    input.type = "password";
    icon.classList.replace("fa-eye-slash", "fa-eye");
  }
});

// thông báo
const showToast = (message, sub, isSuccess = true) => {
  // Xóa toast cũ nếu có
  const old = document.getElementById("toast");
  if (old) old.remove();

  const toast = document.createElement("div");
  toast.id = "toast";
  toast.innerHTML = `
    <span class="toast__icon">${isSuccess ? "✔" : "✕"}</span>
    <div>
      <p class="toast__title">${message}</p>
      <p class="toast__sub">${sub}</p>
    </div>
    <button class="toast__close" onclick="this.parentElement.remove()">✕</button>
  `;
  toast.style.cssText = `
    position: fixed; top: 80px; right: 30px;
    background: #1e1e1e; color: #fff;
    padding: 20px 24px; border-radius: 12px;
    display: flex; align-items: flex-start; gap: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
    z-index: 9999; min-width: 360px;
    border-left: 4px solid ${isSuccess ? "#22c55e" : "#ef4444"};
    animation: slideIn 0.3s ease;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 5000);
}

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// lắng nghe sự kiện
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let isValid = true;

  errEmail.textContent = "";
  errPassword.textContent = "";

  const emailVal = emailElement.value.trim();
  const passVal = passwordElement.value.trim();

  if (emailVal === "") {
    errEmail.textContent = "Email không được để trống";
    isValid = false;
  } else if (!validateEmail(emailVal)) {
    errEmail.textContent = "Email không đúng định dạng";
    isValid = false;
  }

  if (passVal === "") {
    errPassword.textContent = "Mật khẩu không được để trống";
    isValid = false;
  }

  if (!isValid) return;

  // kiểm tra email + password có khớp không
  const user = users.find(
    (u) => u.email === emailVal && u.password === passwordElement.value,
  );

  if (!user) {
    showToast("Đăng nhập thất bại", "Email hoặc mật khẩu không đúng", false);
    return;
  }

  // đăng nhập thành công
  localStorage.setItem("currentUser", JSON.stringify(user));
  showToast("Đăng nhập thành công", `Chào mừng ${user.fullName} 🎉`, true);

  setTimeout(() => {
    if (user.role === "admin") {
      window.location.href = "./admin.html";
    } else {
      window.location.href = "./index.html";
    }
  }, 1000);
});
