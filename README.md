# 📊 Real-Time Sales Analytics System

A full-stack real-time sales analytics system built with Node.js, WebSockets, and external integrations. It provides live sales tracking, intelligent recommendations, and weather-based promotional insights.

---

## ⚙️ Tech Stack

* 🟨 Node.js + Express.js
* 🗓️ SQLite (local database)
* 🛁 WebSocket (`ws`)
* 🌐 OpenWeather API
* 🧠 Mock AI Recommendation logic
* 🧪 Jest + Supertest
* 🔠 HTML + Bootstrap (Simple Frontend)

---

## 🚀 Getting Started

```bash
git clone https://github.com/your-username/realtime-analytics.git
cd realtime-analytics
npm install
```

### 📄 Add `.env` in the root directory:

```
WEATHER_API_KEY=your_openweather_api_key
OPENAI_API_KEY=mock_or_optional
```

### ▶️ Start the server:

```bash
node server.js
```

---

## 🛁 API Endpoints

| Method | Endpoint              | Description                                         |
| ------ | --------------------- | --------------------------------------------------- |
| `POST` | `/orders/add_order`   | Add a new sales order                               |
| `GET`  | `/analytics`          | Get real-time analytics data                        |
| `GET`  | `/recommendations`    | Get dynamic suggestions based on orders and weather |
| `GET`  | `/weather?city=Cairo` | Get live weather data for a city                    |

---

## 🌐 Frontend Interface

Located in `Frontend/index.html`, the UI includes:

* Real-time WebSocket updates
* Weather-based recommendations
* AI-driven marketing tips
* Live sales analytics
* City selector for weather

Open `index.html` in your browser to explore the features.

---

## 📊 WebSocket Events

| Event              | Trigger                                 |
| ------------------ | --------------------------------------- |
| `new_order`        | Emitted on every new order submission   |
| `analytics_update` | Sent after order to update metrics live |

---

## 🧠 AI & Weather Integration

* **AI Logic**: Mocked recommendation engine simulating ChatGPT behavior.
* **Weather API**: Pulls current weather by city via OpenWeatherMap.

**Examples:**

* Hot day → Promote cold drinks
* Cold day → Promote coffee & tea
* Dynamic discounts applied based on temperature

---

## 🧪 Testing

Integrated testing suite using Jest + Supertest.

### Run tests:

```bash
npm test
```

### Covered endpoints:

* `POST /orders`
* `GET /analytics`
* `GET /recommendations`
* `GET /weather?city=Cairo`

---

## 📌 Notes

* No heavy third-party frameworks were used.
* System is extensible for real AI integration or full dashboard upgrade.
* Recommendations module can be swapped to use OpenAI API easily.

---

## 🙌 Thanks

This project was built as part of a technical interview challenge to showcase backend + real-time + smart logic integration with a simple UI.
