# Katalyst Chatbot

Katalyst Chatbot is an AI-powered solution designed to automate repetitive queries for NGOs like Katalyst India.
It leverages *Google's Gemini API* for generating intelligent responses and *Brevo API* for email notifications, 
improving efficiency and saving valuable time for NGO staff.

---

## 🚀 Features

- *AI-Powered Responses: Uses **Google's Gemini API* to answer common queries.
- *Ticket Management: Creates tickets for unresolved queries and sends email notifications via **Brevo*.
- *User-Friendly Interface: Built with **React.js* and *Vite* for a smooth user experience.
- *Scalable Backend: Powered by **Node.js, **Express.js, and **MongoDB*.
- *Security: Encrypts sensitive data and uses **HTTPS* for secure communication.

---

## 🛠 Tech Stack

### Frontend:
- React.js
- Vite
- Tailwind CSS
- Bootstrap

### Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose (MongoDB ODM)

### APIs:
- Google Gemini API (AI responses)
- Brevo API (email notifications)

### Tools:
- *Nodemon* (automatic server restarts)
- *Dotenv* (environment variable management)
- *CORS* (cross-origin resource sharing)

---

## 📌 Setup Instructions

### Prerequisites
- *Node.js* (v16 or higher)
- *MongoDB* (local or Atlas)
- API keys for *Google Gemini* and *Brevo*

### Steps to Run Locally

1. *Clone the Repository:*
   bash
   git clone https://github.com/your-username/katalyst-chatbot.git
   cd katalyst-chatbot
   

2. *Install Dependencies:*
   bash
   npm install
   cd frontend
   npm install
   

3. *Set Up Environment Variables:*
   Create a .env file in the root directory and add the following:
   env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   GEMINI_API_KEY=your_gemini_api_key
   BREVO_API_KEY=your_brevo_api_key
   

4. *Start the Backend Server:*
   bash
   npm run dev
   

5. *Start the Frontend:*
   bash
   cd frontend
   npm run dev
   

6. *Access the Application:*
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

---

## 📂 Project Structure

![image](https://github.com/user-attachments/assets/a2efd6f2-1dd8-4b31-b28c-2ecb60a65917)


---

## 📡 API Endpoints

### Chatbot Routes:
- POST /chatbot/chat - Submit a query and get a response.
- POST /chatbot/ticket - Create a ticket for unresolved queries.

### User Routes:
- GET /user/create - Generate a unique user ID.

---

## 🔮 Future Enhancements

- 🔊 *Voice & Image Support* - Enhance interactions with multimedia capabilities.
- ⚡ *Real-Time Communication* - Implement WebSockets for instant responses.
- 📊 *Admin Dashboard* - Manage FAQs and tickets efficiently.
- 🤖 *Advanced AI Models* - Integrate *GPT-4* for improved accuracy.

---

💡 *Contributions are welcome!* Feel free to submit issues or pull requests to help improve Katalyst Chatbot.

📧 For inquiries, contact *[Your Email]* or visit *[Your Website]*.

---

🛠 *Developed with ❤ by Tisya Manhas
