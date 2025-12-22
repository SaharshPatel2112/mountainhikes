// Mobile Menu
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}

// Search Filtering 
document.getElementById("trekSearch").addEventListener("input", function (e) {
  const term = e.target.value.toLowerCase();
  const cards = document.querySelectorAll(".trek-card");

  cards.forEach((card) => {
    const title = card.querySelector("h3").innerText.toLowerCase();
    card.style.display = title.includes(term) ? "block" : "none";
  });
});

// Enquiry Form
const trekForm = document.getElementById("trekForm");
const responseMsg = document.getElementById("responseMsg");

trekForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const btn = document.getElementById("submitBtn");
  btn.innerText = "Sending...";
  btn.disabled = true;

  const formData = new FormData(trekForm);
  const data = Object.fromEntries(formData.entries());

  fetch("https://sheetdb.io/api/v1/sx6oxkkhle0wi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: [data] }),
  })
    .then((res) => res.json())
    .then(() => {
      responseMsg.innerText = "Form submitted successfully!";
      responseMsg.style.color = "green";
      trekForm.reset();
    })
    .catch(() => {
      responseMsg.innerText = "Error occurred. Try again.";
      responseMsg.style.color = "red";
    })
    .finally(() => {
      btn.innerText = "Send Enquiry";
      btn.disabled = false;
    });
});

// Placeholder for Auth
let isLoggedIn = false;
function handleAuth() {
  isLoggedIn = !isLoggedIn;
  const btn = document.getElementById("authBtn");
  if (isLoggedIn) {
    btn.innerText = "Logout";
    btn.style.background = "#e74c3c";
    alert("Logged in successfully (Google Auth Placeholder)");
  } else {
    btn.innerText = "Login";
    btn.style.background = "#1a73e8";
  }
}
