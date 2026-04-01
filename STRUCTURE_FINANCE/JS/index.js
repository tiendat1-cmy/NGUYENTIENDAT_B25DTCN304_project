const movies = [
  {
    id: 1,
    title: "Dune: Part Two",
    titleVi: "Dune: Hành Tinh Cát - Phần 2",
    genres: "Hành động, Viễn tưởng",
    duration: 166,
    releaseDate: "01/03/2024",
    status: 1,
    isHot: true,
    posterUrl: "https://upload.wikimedia.org/wikipedia/en/8/8e/Dune_%282021_film%29.jpg",
    description:
      "Tiếp nối phần trước, Paul Atreides hợp nhất với Fremen để trả thù gia tộc Harkonnen và đối mặt với số phận.",
    ticketPrice: 95000,
  },
  {
    id: 2,
    title: "Kung Fu Panda 4",
    titleVi: "Kung Fu Panda 4",
    genres: "Hoạt hình, Hài",
    duration: 94,
    releaseDate: "08/03/2024",
    status: 1,
    isHot: false,
    posterUrl: "https://example.com/images/kung-fu-panda-4-poster.jpg",
    description:
      "Po tiếp tục hành trình trở thành Chiến binh Rồng, đối mặt với kẻ thù mới và tìm người kế nhiệm.",
    ticketPrice: 80000,
  },
  {
    id: 3,
    title: "Godzilla x Kong: The New Empire",
    titleVi: "Godzilla x Kong: Đế Chế Mới",
    genres: "Hành động, Viễn tưởng",
    duration: 115,
    releaseDate: "29/03/2024",
    status: 2,
    isHot: false,
    posterUrl: "https://example.com/images/godzilla-x-kong-poster.jpg",
    description:
      "Godzilla và Kong hợp sức chống lại mối đe dọa mới từ lòng đất.",
    ticketPrice: 80000,
  },
  {
    id: 4,
    title: "Mai",
    titleVi: "Mai",
    genres: "Tâm lý, Tình cảm",
    duration: 131,
    releaseDate: "10/02/2024",
    status: 0,
    isHot: false,
    posterUrl: "https://example.com/images/mai-poster.jpg",
    description:
      "Câu chuyện về một người phụ nữ mạnh mẽ đối mặt với những biến cố trong cuộc sống.",
    ticketPrice: 80000,
  },
  {
    id: 5,
    title: "Exhuma",
    titleVi: "Exhuma: Quật Mộ Trùng Ma",
    genres: "Kinh dị, Bí ẩn",
    duration: 134,
    releaseDate: "15/03/2024",
    status: 1,
    isHot: false,
    posterUrl: "https://example.com/images/exhuma-poster.jpg",
    description:
      "Một nhóm chuyên gia phong thủy khai quật mộ cổ và đối mặt với lời nguyền đáng sợ.",
    ticketPrice: 80000,
  },
];




// đăng nhập 

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const btnHeader = document.getElementById("btn_header");

if (btnHeader) {
  if (currentUser) {
    btnHeader.innerHTML = `👋 ${currentUser.fullName} | Đăng xuất`;
    btnHeader.classList.add("btn-logout");

    btnHeader.onclick = () => {
      showConfirmLogout();
    };
  } else {
    btnHeader.innerText = "Đăng nhập / Đăng ký";

    btnHeader.onclick = () => {
      window.location.href = "./login.html";
    };
  }
}

//xác nhận đăng xuất 
const showConfirmLogout = () => {
  const modal = document.createElement("div");
  modal.className = "logout-modal";

  modal.innerHTML = `
    <div class="logout-box">
      <h3>Bạn có muốn đăng xuất không?</h3>
      <div class="logout-actions">
        <button id="confirmLogout">Đăng xuất</button>
        <button id="cancelLogout">Hủy</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // xác nhận
  document.getElementById("confirmLogout").onclick = () => {
    localStorage.removeItem("currentUser");
    location.reload();
  };

  // hủy
  document.getElementById("cancelLogout").onclick = () => {
    modal.remove();
  };
}