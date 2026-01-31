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

// Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCDefeAGp_ylIlb4xRKOU7ah3b3jMralKA",
  authDomain: "mountainhikes-1234.firebaseapp.com",
  projectId: "mountainhikes-1234",
  storageBucket: "mountainhikes-1234.firebasestorage.app",
  messagingSenderId: "324450320560",
  appId: "1:324450320560:web:e1ee27b3e85ec2e7fb3b75",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

const provider = new GoogleAuthProvider();

window.toggleMenu = function () {
  const nav = document.getElementById("navLinks");
  nav.classList.toggle("active");
};

// Login process

window.handleAuth = function () {
  if (!auth.currentUser) {
    signInWithPopup(auth, provider)
      .then((result) => console.log("Success"))
      .catch((error) => console.error(error));
  } else {
    const confirmLogout = confirm(
      "Are you sure you want to logout from Mountainhikes?",
    );

    if (confirmLogout) {
      signOut(auth)
        .then(() => {
          console.log("User logged out");

          const nav = document.getElementById("navLinks");
          if (nav.classList.contains("active")) {
            nav.classList.remove("active");
          }
        })
        .catch((error) => {
          console.error("Logout Error:", error);
        });
    }
  }
};

// logged in UI
onAuthStateChanged(auth, (user) => {
  if (user) {
    authBtn.innerText = `${user.displayName.split(" ")[0]} (Logout)`;
    authBtn.style.background = "#de6666ff";
  } else {
    authBtn.innerText = "Login";
    authBtn.style.background = "#1a73e8";
  }
});

const navLinksItems = document.querySelectorAll(".nav-links a");

navLinksItems.forEach((link) => {
  link.addEventListener("click", () => {
    const nav = document.getElementById("navLinks");

    if (nav.classList.contains("active")) {
      nav.classList.remove("active");
    }
  });
});

const allLinks = document.querySelectorAll(".nav-links a, .dropdown-menu a");

allLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const nav = document.getElementById("navLinks");

    if (nav.classList.contains("active")) {
      nav.classList.remove("active");
    }

    if (
      window.innerWidth <= 768 &&
      link.parentElement.classList.contains("dropdown")
    ) {
      e.preventDefault();
      link.parentElement.classList.toggle("active");
    }
  });
});

// Data for search (You can expand this list)
const trekData = [
    { name: "Brahmatal Trek", url: "treks/brahmatal.html", img: "images/brahmatal.jpg" },
    { name: "Kedarkantha Trek", url: "treks/kedarkantha.html", img: "images/kedarkantha.jpg" },
    { name: "Hampta Pass", url: "treks/hampta-pass.html", img: "images/hampta-pass.jfif" },
    { name: "Roopkund Trek", url: "treks/roopkund.html", img: "images/roopkund.jpg" }
];

const searchInput = document.getElementById('trekSearch');
const resultsDropdown = document.getElementById('searchResults');

searchInput.addEventListener('input', function() {
    const term = this.value.toLowerCase();
    resultsDropdown.innerHTML = ''; // Clear previous results

    if (term.length > 0) {
        const filtered = trekData.filter(trek => trek.name.toLowerCase().includes(term));

        if (filtered.length > 0) {
            resultsDropdown.style.display = 'block';
            filtered.forEach(trek => {
                const div = document.createElement('div');
                div.classList.add('result-item');
                div.innerHTML = `
                    <img src="${trek.img}" alt="${trek.name}">
                    <span>${trek.name}</span>
                `;
                div.onclick = () => window.location.href = trek.name.toLowerCase().includes('brahmatal') ? 'treks/brahmatal.html' : trek.url; 
                // Adjust logic to point to correct URL
                resultsDropdown.appendChild(div);
            });
        } else {
            resultsDropdown.style.display = 'none';
        }
    } else {
        resultsDropdown.style.display = 'none';
    }
});

// Close dropdown if clicked outside
window.addEventListener('click', (e) => {
    if (!document.querySelector('.search-container').contains(e.target)) {
        resultsDropdown.style.display = 'none';
    }
});
