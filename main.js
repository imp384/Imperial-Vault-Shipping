// ==============================
// IMP VAULTS & SHIP - main.js
// ==============================

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  let current = 0;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }

  showSlide(current);           // show first slide immediately
  setInterval(nextSlide, 5000); // change every 5 seconds
});



// Utility: Send POST request with JSON
async function postData(url = "", data = {}) {
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return response.json();
}

// ------------------------------
// TRACKING FORM
// ------------------------------
const trackForm = document.getElementById("trackForm");
if (trackForm) {
    trackForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        const trackingCode = document.getElementById("trackingCode").value.trim();
        const resultDiv = document.getElementById("trackResult");

        if (!trackingCode) {
            resultDiv.textContent = "Please enter a tracking code.";
            return;
        }

        resultDiv.textContent = "Checking tracking information...";

        try {
            const data = await postData("track.php", { trackingCode });
            if (data.success) {
                resultDiv.textContent = `✅ Status: ${data.status}\nLocation: ${data.location}\nExpected Delivery: ${data.delivery}`;
            } else {
                resultDiv.textContent = `❌ ${data.message}`;
            }
        } catch (error) {
            console.error(error);
            resultDiv.textContent = "⚠️ Unable to connect to the server.";
        }
    });
}

// ------------------------------
// CONTACT FORM
// ------------------------------
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();
        const contactResult = document.getElementById("contactResult");

        if (!name || !email || !message) {
            contactResult.textContent = "All fields are required.";
            return;
        }

        contactResult.textContent = "Sending message...";

        try {
            const data = await postData("contact.php", { name, email, message });
            if (data.success) {
                contactResult.textContent = "✅ Your message has been sent. We’ll contact you soon!";
                contactForm.reset();
            } else {
                contactResult.textContent = `❌ ${data.message}`;
            }
        } catch (error) {
            console.error(error);
            contactResult.textContent = "⚠️ Unable to send message at this time.";
        }
    });
}

// ------------------------------
// NAVIGATION ACTIVE STATE
// ------------------------------
const navLinks = document.querySelectorAll(".nav a");
navLinks.forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add("active");
    }
});
