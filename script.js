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

window.handleAuth = function () {
  if (!auth.currentUser) {
    signInWithPopup(auth, provider)
      .then((result) => console.log("Success"))
      .catch((error) => console.error(error));
  } else {
    signOut(auth);
  }
};

const authBtn = document.getElementById("authBtn");

// Login process
window.handleAuth = () => {
  if (!auth.currentUser) {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Logged in:", result.user);
      })
      .catch((error) => {
        console.error("Login Error:", error);
      });
  } else {
    signOut(auth).then(() => {
      console.log("Logged out");
    });
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
