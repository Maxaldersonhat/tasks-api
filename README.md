# Calculator Frontend

This project is a simple full-stack web app with:

- **Backend:** Laravel API (for user authentication and calculator operations)
- **Frontend:** React (with Tailwind CSS) for login and calculator UI

---

## 🔧 Features

### Backend (Laravel)
- REST API for:
  - `/api/auth/login`: Dummy login returning a token
  - `/api/calculator`: Perform calculations and store results
  - `/api/calculation/{id}`: Retrieve a specific calculation

### Frontend (React)
- Login form (with dummy credentials)
- Calculator screen (after login)
- Tailwind CSS styling
- Token stored in `localStorage` and used for authentication

---

## 📦 Project Structure

tasks-api/
│
├── backend/ # Laravel API
│ ├── routes/api.php
│ ├── app/Http/Controllers/
│ └── ...
│
├── frontend/ # React App
│ ├── src/components/
│ ├── src/pages/Login.jsx
│ └── ...

yaml
Copy code

---

## 🖥️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/Maxaldersonhat/tasks-api-frontend.git
cd tasks-api
2. Backend (Laravel)
Install dependencies:
bash
Copy code
cd backend
composer install
Set up .env:
bash
Copy code
cp .env.example .env
php artisan key:generate
Run migrations:
bash
Copy code
php artisan migrate
Serve the API:
bash
Copy code
php artisan serve
Default API URL: http://127.0.0.1:8000

3. Frontend (React)
Install dependencies:
bash
Copy code
cd ../frontend
npm install
Start the React app:
bash
Copy code
npm start
React app runs on: http://localhost:3000

🔐 Dummy Login Details
Use any valid email + password combo to log in.

Example:

plaintext
Copy code
Email: test@example.com
Password: secret
🧪 API Testing (Optional)
You can test API endpoints using Postman:

POST /api/auth/login – Dummy login

POST /api/calculator – Submit a calculation

GET /api/calculation/{id} – Retrieve stored result

📜 License
This project is open-sourced for learning purposes. Customize and use as you like!

✨ Author
Max Brian Mwaura
GitHub: @Maxaldersonhat
