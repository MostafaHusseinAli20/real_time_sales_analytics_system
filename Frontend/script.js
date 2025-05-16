const socket = new WebSocket("ws://localhost:3000");

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  const wsList = document.getElementById("wsMessages");

  const li = document.createElement("li");
  li.className = "list-group-item";
  li.innerHTML = `<strong>${data.type}</strong>: ${JSON.stringify(data.data)}`;
  wsList.prepend(li);
};

// 🔄 Load Analytics
function fetchAnalytics() {
  fetch("http://localhost:3000/analytics")
    .then((res) => res.json())
    .then((data) => {
      const table = document.getElementById("analytics-table");
      table.innerHTML = `
        <tr><td><strong>Total Revenue</strong></td><td>${data.total_revenue}</td></tr>
        <tr><td><strong>Revenue Last Minute</strong></td><td>${data.revenue_last_minute}</td></tr>
        <tr><td><strong>Orders Last Minute</strong></td><td>${data.orders_last_minute}</td></tr>
        <tr><td colspan="2"><strong>Top Products</strong></td></tr>
        ${data.top_products.map(p =>
          `<tr><td>Product ${p.product_id}</td><td>${p.total_quantity} sold</td></tr>`).join('')}
      `;
    });
}

// 🧠 Load Recommendations
function fetchRecommendations() {
  fetch("http://localhost:3000/recommendations")
    .then((res) => res.json())
    .then((data) => {
      const list = document.getElementById("recommendations");
      list.innerHTML = "";
      data.suggestions.forEach(s => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = s;
        list.appendChild(li);
      });
    });
}

// 🌤️ Load Weather
function fetchWeather() {
  const city = document.getElementById('citySelect').value || 'Cairo';

  fetch(`http://localhost:3000/weather?city=${encodeURIComponent(city)}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("weather").classList.remove("d-none");
      document.getElementById("weather-temp").textContent = data.temperature;
      document.getElementById("weather-cond").textContent = data.condition;
      // لو عندك span مع id weather-city في HTML اعرض اسم المدينة فيه
      document.getElementById("weather-city").textContent = city;

      const list = document.getElementById("weather-recommendations");
      list.innerHTML = "";
      data.recommendation.forEach(rec => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = rec;
        list.appendChild(li);
      });
    })
    .catch(err => console.error(err));
}
