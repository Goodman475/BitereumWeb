// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});

// ===== Tokenomics Chart =====
document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById('tokenomicsChart');

  if (ctx) {
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Mining Reserve', 'Circulating Supply', 'Development Fund', 'Marketing'],
        datasets: [{
          label: 'Token Distribution',
          data: [50, 30, 10, 10], // example values
          backgroundColor: ['#00f6ff', '#ff007f', '#ffaa00', '#00ff88'],
          borderColor: '#0f0f1a',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#fff' }
          }
        }
      }
    });
  }
});

// ===== EmailJS Contact Form =====
emailjs.init("Ey2-XJ-dUwM5l4C1L");

const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  emailjs.sendForm('service_spw0ktp', 'template_zlbgyrj', contactForm)
    .then(() => {
      formMessage.textContent = "Message sent successfully!";
      formMessage.style.color = "#28a745";
      contactForm.reset();
    })
    .catch(error => {
      formMessage.textContent = "Oops! Something went wrong: " + error.text;
      formMessage.style.color = "#dc3545";
      console.error("EmailJS error:", error);
    });
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const body = document.body;

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("show");
  body.classList.toggle("menu-open"); // prevents scroll in background
});

// Close menu when clicking a link (optional, for mobile UX)
document.querySelectorAll("#nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("show");
    body.classList.remove("menu-open");
  });
});

document.addEventListener("DOMContentLoaded", () => {
      const trailerBtn = document.getElementById("trailerBtn");
      const trailerModal = document.getElementById("trailerModal");
      const closeTrailer = document.getElementById("closeTrailer");
      const trailerVideo = document.getElementById("trailerVideo");

      // Show modal
      trailerBtn.addEventListener("click", () => {
        trailerModal.style.display = "flex";
        trailerVideo.currentTime = 0; // restart
        trailerVideo.play();
      });

      // Close modal (button)
      closeTrailer.addEventListener("click", () => {
        trailerModal.style.display = "none";
        trailerVideo.pause();
        trailerVideo.currentTime = 0; // reset
      });

      // Close modal when clicking outside content
      trailerModal.addEventListener("click", (e) => {
        if (e.target === trailerModal) {
          trailerModal.style.display = "none";
          trailerVideo.pause();
          trailerVideo.currentTime = 0;
        }
      });
    });