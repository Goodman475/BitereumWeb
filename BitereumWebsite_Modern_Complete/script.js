document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
  anchor.addEventListener('click', function(e){
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({behavior:'smooth'});
  });
});

const ctx = document.getElementById('tokenomicsChart').getContext('2d');
const tokenomicsChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Mining Reserve','Circulating Supply','Development Fund','Marketing'],
        datasets: [{
            label: 'Bitereum Distribution',
            data: [50, 30, 10, 10],
            backgroundColor: ['#00f6ff','#28a745','#ffc107','#dc3545'],
            hoverOffset: 15
        }]
    },
    options: {
        responsive:true,
        plugins: { legend:{ position:'bottom', labels:{ color:'#fff', font:{size:14} } } }
    }
});


emailjs.init("Ey2-XJ-dUwM5l4C1L");

const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', function(e){
  e.preventDefault();

  emailjs.sendForm('service_spw0ktp', 'template_zlbgyrj', contactForm)
    .then(() => {
      formMessage.textContent = "Message sent successfully!";
      formMessage.style.color = "#28a745";
      contactForm.reset();
    }, (error) => {
      formMessage.textContent = "Oops! Something went wrong: " + error.text;
      formMessage.style.color = "#dc3545";
      console.error("EmailJS error:", error);
    });
});

