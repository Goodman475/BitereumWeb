// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});

// ===== Tokenomics Interactive Chart =====
const ctxTokenomics = document.getElementById('tokenomicsChart').getContext('2d');

let chartType = 'pie'; // default
let tokenomicsChart;

// Data
const tokenomicsData = {
  labels: ['Mining Reserve', 'Circulating Supply', 'Development Fund', 'Marketing'],
  datasets: [{
    data: [10500000, 6300000, 2100000, 2100000],
    backgroundColor: [
      '#38bdf8',
      '#22c55e',
      '#f59e0b',
      '#ef4444'
    ],
    borderWidth: 1
  }]
};

// Details for modal
const tokenomicsDetails = {
  "Mining Reserve": "Locked reserve to secure the network and future sustainability (50%).",
  "Circulating Supply": "Currently available coins in circulation for trading (30%).",
  "Development Fund": "Allocated to developers for upgrades, security, and scaling (10%).",
  "Marketing": "Funds dedicated to partnerships, campaigns, and adoption growth (10%)."
};

// Function to render chart
function renderTokenomicsChart(type) {
  if (tokenomicsChart) tokenomicsChart.destroy();

  tokenomicsChart = new Chart(ctxTokenomics, {
    type: type,
    data: tokenomicsData,
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              let total = context.dataset.data.reduce((a, b) => a + b, 0);
              let value = context.raw;
              let percentage = ((value / total) * 100).toFixed(2);
              return `${context.label}: ${value.toLocaleString()} (${percentage}%)`;
            }
          }
        },
        legend: {
          position: 'bottom'
        }
      },
      // 🔥 click event
      onClick: (e, elements) => {
        if (elements.length > 0) {
          const index = elements[0].index;
          const label = tokenomicsData.labels[index];
          openTokenomicsModal(label, tokenomicsDetails[label]);
        }
      }
    }
  });
}

// Modal functions
function openTokenomicsModal(title, description) {
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalDescription").textContent = description;
  document.getElementById("tokenomicsModal").style.display = "flex";
}

document.getElementById("closeTokenomicsModal").addEventListener("click", () => {
  document.getElementById("tokenomicsModal").style.display = "none";
});

// Initial render
renderTokenomicsChart(chartType);

// Toggle buttons
document.getElementById('pieToggle').addEventListener('click', () => {
  chartType = 'pie';
  renderTokenomicsChart(chartType);
  document.getElementById('pieToggle').classList.add('active');
  document.getElementById('barToggle').classList.remove('active');
});

document.getElementById('barToggle').addEventListener('click', () => {
  chartType = 'bar';
  renderTokenomicsChart(chartType);
  document.getElementById('barToggle').classList.add('active');
  document.getElementById('pieToggle').classList.remove('active');
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

// Trailer Modal
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

// ================== LIVE TOKEN PRICES ==================
// ============= FETCH PRICES (CoinGecko for logos + metadata) =============
async function fetchPrices() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,binancecoin,solana,cardano,ripple,dogecoin,polkadot,polygon,litecoin,tron,shiba-inu"
    );
    const data = await response.json();

    const symbolMap = {
      BTC: "bitcoin",
      ETH: "ethereum",
      BNB: "binancecoin",
      SOL: "solana",
      ADA: "cardano",
      XRP: "ripple",
      DOGE: "dogecoin",
      DOT: "polkadot",
      LTC: "litecoin",
      TRX: "tron",
    };

    document.querySelectorAll(".coin").forEach(coinDiv => {
      const symbol = coinDiv.getAttribute("data-symbol");
      const coin = data.find(c => c.id === symbolMap[symbol]);

      if (coin) {
        // Ensure <img> exists
        let img = coinDiv.querySelector("img");
        if (!img) {
          img = document.createElement("img");
          coinDiv.prepend(img);
        }
        img.src = coin.image;
        img.alt = coin.name;

        let priceEl = coinDiv.querySelector(".price");
        if (!priceEl) {
          priceEl = document.createElement("div");
          priceEl.className = "price";
          coinDiv.appendChild(priceEl);
        }

        priceEl.textContent = `$${coin.current_price.toLocaleString()}`;

        const span = coinDiv.querySelector("span");
        span.innerHTML = `
          ${symbol} 
          <small style="color:${coin.price_change_percentage_24h >= 0 ? 'lime' : 'red'};">
            (${coin.price_change_percentage_24h.toFixed(2)}%)
          </small>
        `;

        // Store id for charts
        coinDiv.setAttribute("data-id", coin.id);
      }
    });
  } catch (error) {
    console.error("Error fetching prices:", error);
  }
}

// Load initially + refresh logos/meta every 5 mins
fetchPrices();
setInterval(fetchPrices, 300000);


// ============= REAL-TIME PRICES (Binance WebSocket) =============
const socket = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");
let prevPrices = {};

socket.onmessage = (event) => {
  const tickers = JSON.parse(event.data);

  tickers.forEach(ticker => {
    const symbol = ticker.s; // e.g. BTCUSDT
    const price = parseFloat(ticker.c).toFixed(2);
    const base = symbol.replace("USDT", ""); // e.g. BTC

    const coinDiv = document.querySelector(`.coin[data-symbol="${base}"]`);
    if (coinDiv) {
      let priceEl = coinDiv.querySelector(".price");
      if (priceEl) {
        // Check up/down
        const prev = prevPrices[symbol];
        if (prev) {
          if (price > prev) {
            coinDiv.classList.add("up");
            coinDiv.classList.remove("down");
          } else if (price < prev) {
            coinDiv.classList.add("down");
            coinDiv.classList.remove("up");
          }
          setTimeout(() => coinDiv.classList.remove("up", "down"), 500);
        }

        priceEl.textContent = `$${Number(price).toLocaleString()}`;
        prevPrices[symbol] = price;
      }
    }
  });
};


// ============= CHART MODAL (CoinGecko API) =============
let currentCoinId = null;
let currentSymbol = null;
let currentDays = 7; // default 7D

function renderChart(coinId, symbol, days) {
  const chartCanvas = document.getElementById("coinChart").getContext("2d");

  if (window.activeChart) {
    window.activeChart.destroy();
  }

  fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`)
    .then(res => res.json())
    .then(data => {
      const prices = data.prices.map(p => p[1]);
      const labels = data.prices.map(p => {
        const d = new Date(p[0]);
        if (days <= 1) {
          return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
        } else if (days <= 30) {
          return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        } else {
          return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
        }
      });

      window.activeChart = new Chart(chartCanvas, {
        type: "line",
        data: {
          labels,
          datasets: [{
            label: `${symbol} Price (USD) - ${days}D`,
            data: prices,
            borderColor: "cyan",
            backgroundColor: "rgba(0,255,255,0.1)",
            fill: true,
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: true },
            tooltip: {
              callbacks: {
                label: ctx => `$${ctx.raw.toLocaleString()}`
              }
            }
          }
        }
      });
    });
}

function openChart(coinId, symbol) {
  const modal = document.getElementById("chartModal");
  modal.style.display = "block";

  currentCoinId = coinId;
  currentSymbol = symbol;
  currentDays = 7;
  renderChart(coinId, symbol, currentDays);
}

document.querySelectorAll(".coin").forEach(card => {
  card.addEventListener("click", () => {
    const coinId = card.getAttribute("data-id");
    const symbol = card.getAttribute("data-symbol");
    if (coinId) {
      openChart(coinId, symbol);
    }
  });
});

document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("chartModal").style.display = "none";
  if (window.activeChart) {
    window.activeChart.destroy();
    window.activeChart = null;
  }
});

document.querySelectorAll(".timeframe-selector button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".timeframe-selector button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    currentDays = btn.getAttribute("data-days");
    renderChart(currentCoinId, currentSymbol, currentDays);
  });
});

// ROADMAP //
// Reveal timeline items on scroll
const items = document.querySelectorAll('.timeline-item');

function showOnScroll() {
  const trigger = window.innerHeight * 0.85;
  items.forEach(item => {
    const boxTop = item.getBoundingClientRect().top;
    if (boxTop < trigger) {
      item.classList.add('visible');
      const bar = item.querySelector('.progress div');
      if (bar) {
        bar.style.width = bar.getAttribute('style').match(/width:(\d+%)/)[1];
      }
    }
  });
}

window.addEventListener('scroll', showOnScroll);
showOnScroll();

// ===== Animated Counter =====
const counters = document.querySelectorAll('.counter');
const speed = 150; // lower = faster

const animateCounters = () => {
  counters.forEach(counter => {
    const updateCount = () => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const current = parseFloat(counter.innerText.replace(/[^0-9.]/g, '')) || 0;
      const increment = target / speed;

      if (current < target) {
        counter.innerText = (current + increment).toFixed(0);
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
};

// Trigger when section is visible
let statsVisible = false;
window.addEventListener('scroll', () => {
  const statsSection = document.getElementById('stats');
  const rect = statsSection.getBoundingClientRect();

  if (!statsVisible && rect.top < window.innerHeight - 100) {
    animateCounters();
    statsVisible = true;
  }
});

// ================== FETCH GLOBAL CRYPTO NEWS ==================
async function fetchNews() {
  try {
    const response = await fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=https://cointelegraph.com/rss"
    );
    const data = await response.json();

    const newsList = document.getElementById("newsList");
    newsList.innerHTML = "";

    data.items.slice(0, 5).forEach(article => {
      const li = document.createElement("li");
      li.innerHTML = `
        <a href="${article.link}" target="_blank">${article.title}</a>
        <small> - ${new Date(article.pubDate).toLocaleDateString()}</small>
      `;
      newsList.appendChild(li);
    });
  } catch (err) {
    console.error("Error fetching news:", err);
  }
}
fetchNews();
setInterval(fetchNews, 60000);

// ================== BITEREUM ANNOUNCEMENTS (Ticker) ==================
async function fetchAnnouncements() {
  try {
    const response = await fetch("announcements.json"); // host this on your server
    const data = await response.json();

    const ticker = document.getElementById("announcementTicker");
    ticker.innerHTML = "";

    data.forEach(a => {
      const span = document.createElement("span");
      span.classList.add("ticker-item");
      span.innerHTML = `<strong>${a.title}</strong> <small>(${a.date})</small>`;
      ticker.appendChild(span);
    });
  } catch (err) {
    console.error("Error fetching announcements:", err);
  }
}
fetchAnnouncements();

// ================== TABS ==================
document.querySelectorAll(".tab-button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-button").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById(btn.getAttribute("data-tab")).classList.add("active");
  });
});

// Dashboard Stats
async function updateDashboard() {
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/bitereum");
    const data = await res.json();

    animateCounter(document.getElementById("market-cap"), 0, data.market_data.market_cap.usd, 2000);
    animateCounter(document.getElementById("supply"), 0, Math.floor(data.market_data.circulating_supply), 2000);
    animateCounter(document.getElementById("volume"), 0, data.market_data.total_volume.usd, 2000);
    animateCounter(document.getElementById("holders"), 0, Math.floor(Math.random() * 100000), 2000);

  } catch (e) {
    console.error("Dashboard update failed", e);
  }
}

updateDashboard();
setInterval(updateDashboard, 60000);

// Counter animation
function animateCounter(element, start, end, duration) {
  let startTime = null;

  function step(currentTime) {
    if (!startTime) startTime = currentTime;
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);

    element.innerText = element.id === "supply"
      ? `${value.toLocaleString()} BIT`
      : `$${value.toLocaleString()}`;

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

// Floating widget auto-updates Bitereum price
async function updateFloatingWidget() {
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/bitereum");
    const data = await res.json();
    const price = data.market_data.current_price.usd;
    const change = data.market_data.price_change_percentage_24h;

    document.getElementById("bit-price").innerText = `$${price.toLocaleString()}`;
    document.getElementById("bit-change").innerText = `${change.toFixed(2)}%`;
    document.getElementById("bit-change").style.color = change >= 0 ? "lime" : "red";
  } catch (e) {
    console.error("Widget update failed", e);
  }
}

updateFloatingWidget();
setInterval(updateFloatingWidget, 15000);



