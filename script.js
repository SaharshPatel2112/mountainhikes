//FIREBASE CONFIGURATION & INITIALIZATION
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

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const authBtn = document.getElementById("authBtn");

//NAVIGATION & MOBILE MENU LOGIC

window.toggleMenu = function () {
  const nav = document.getElementById("navLinks");
  nav.classList.toggle("active");
};

const allLinks = document.querySelectorAll(".nav-links a, .dropdown-menu a");

allLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const nav = document.getElementById("navLinks");
    const isMobile = window.innerWidth <= 768;

    const isDropdownToggle =
      link.classList.contains("mobile-toggle") ||
      link.parentElement.classList.contains("dropdown");

    if (isMobile && isDropdownToggle) {
      e.preventDefault();
      link.parentElement.classList.toggle("open-submenu");
    } else {
      if (nav.classList.contains("active")) {
        nav.classList.remove("active");
      }
    }
  });
});

//AUTHENTICATION (LOGIN/LOGOUT)

window.handleAuth = function () {
  if (!auth.currentUser) {
    signInWithPopup(auth, provider)
      .then(() => console.log("Login Success"))
      .catch((error) => console.error("Login Error:", error));
  } else {
    if (confirm("Are you sure you want to logout from Mountainhikes?")) {
      signOut(auth)
        .then(() => {
          console.log("User logged out");
          const nav = document.getElementById("navLinks");
          if (nav.classList.contains("active")) nav.classList.remove("active");
        })
        .catch((error) => console.error("Logout Error:", error));
    }
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    authBtn.innerText = `${user.displayName.split(" ")[0]} (Logout)`;
    authBtn.style.background = "#de6666ff";
  } else {
    authBtn.innerText = "Login";
    authBtn.style.background = "#1a73e8";
  }
});

//ENQUIRY FORM (SHEETDB API)

const trekForm = document.getElementById("trekForm");
const responseMsg = document.getElementById("responseMsg");

if (trekForm) {
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
}

//SEARCH & FILTERING LOGIC

const trekData = [
  {
    name: "Brahmatal Trek",
    url: "treks/brahmatal.html",
    img: "images/brahmatal.jpg",
  },
  {
    name: "Kedarkantha Trek",
    url: "treks/kedarkantha.html",
    img: "images/kedarkantha.jpg",
  },
  {
    name: "Hampta Pass Trek",
    url: "treks/hampta-pass.html",
    img: "images/hampta pass.webp",
  },
  {
    name: "Roopkund Trek",
    url: "treks/roopkund.html",
    img: "images/roopkund.avif",
  },
];

const searchInput = document.getElementById("trekSearch");
const resultsDropdown = document.getElementById("searchResults");

if (searchInput) {
  searchInput.addEventListener("input", function () {
    const term = this.value.toLowerCase();
    resultsDropdown.innerHTML = "";

    if (term.length > 0) {
      const filtered = trekData.filter((trek) =>
        trek.name.toLowerCase().includes(term),
      );

      if (filtered.length > 0) {
        resultsDropdown.style.display = "block";
        filtered.forEach((trek) => {
          const div = document.createElement("div");
          div.classList.add("result-item");
          div.innerHTML = `
            <img src="${trek.img}" alt="${trek.name}">
            <span>${trek.name}</span>
          `;
          div.onclick = () => (window.location.href = trek.url);
          resultsDropdown.appendChild(div);
        });
      } else {
        resultsDropdown.style.display = "none";
      }
    } else {
      resultsDropdown.style.display = "none";
    }
  });
}

window.addEventListener("click", (e) => {
  const searchContainer = document.querySelector(".search-container");
  if (searchContainer && !searchContainer.contains(e.target)) {
    resultsDropdown.style.display = "none";
  }
});
