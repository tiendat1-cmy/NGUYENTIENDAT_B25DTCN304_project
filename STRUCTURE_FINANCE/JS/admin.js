
const openLogoutModal = () => {
  document.getElementById("logoutModal").classList.remove("hidden");
}

const closeLogoutModal = () => {
  document.getElementById("logoutModal").classList.add("hidden");
}

window.onclick = function (e)  {
  const modal = document.getElementById("logoutModal");
  if (e.target === modal) {
    closeLogoutModal();
  }
};

const confirmLogout = () => {
  localStorage.removeItem("currentUser");

  closeLogoutModal();

  showToast("Đăng xuất thành công 👋");

  setTimeout(() => {
    window.location.href = "./login.html";
  }, 2000);
}

const showToast = (message) => {
  const toastContainer = document.getElementById("toast");

  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.innerText = message;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}