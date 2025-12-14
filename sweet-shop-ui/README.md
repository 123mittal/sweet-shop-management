A modern React frontend for a Sweet Shop Management System, integrated with a Node.js + MySQL backend. Features user authentication, cart functionality, responsive UI, and admin pages.

Features

Home Page

Displays sweets with name, category, price, quantity, and images.

Add to Cart functionality with live cart preview.

Responsive grid layout.

Authentication

Sign Up & Login forms.

Integration with backend /api/auth/register and /api/auth/login.

Form validation and feedback messages.

Admin Pages

Admin login and protected routes.

Admin can view and manage sweets.

UI/UX

Styled with CSS, custom components, gradients, and background images.

Light color gradient and blurred background image for aesthetics.

Clean and modern design for both desktop and mobile.

AI Assistance

AI used for initial component scaffolding and boilerplate setup.

All main logic, state management, API integration, and UI implementation done manually.

Folder Structure
sweet-shop-ui/
├─ public/
├─ src/
│  ├─ components/
│  │  ├─ Navbar.jsx
│  │  └─ SweetCard.jsx
│  ├─ pages/
│  │  ├─ Home.jsx
│  │  ├─ Login.jsx
│  │  ├─ SignUp.jsx
│  │  ├─ Admin.jsx
│  │  └─ AdminLogin.jsx
│  ├─ App.jsx
│  ├─ index.jsx
│  └─ styles/
│     ├─ Home.css
│     ├─ SignUp.css
│     └─ SweetCard.css
├─ package.json
└─ README.md

Installation & Setup

Clone the repository and go to the frontend folder:

git clone <repo_url>
cd sweet-shop-ui


Install dependencies:

npm install


Start the frontend:

npm start


Open in browser: http://localhost:3000

Usage

Navigate to /signup to create a new user.

Navigate to /login to login.

Browse sweets, add them to the cart.

Admin users can login at /admin/login and manage sweets.

AI Usage Notes

AI assisted in generating initial component boilerplate and routing structure.

All authentication logic, state handling, API integration, cart functionality, and UI styling implemented manually.

Screenshots


![alt text](<Screenshot (77).png>) ![alt text](<Screenshot (78).png>) ![alt text](<Screenshot (79).png>) ![alt text](<Screenshot (80).png>) ![alt text](<Screenshot (81).png>)
License

Backend
# Sweet Shop Backend

This is the backend of the Sweet Shop Management System. It handles user authentication, sweets management, and integrates with a MySQL database.

---

## **Technologies Used**

- **Node.js**  
- **Express.js**  
- **MySQL**  
- **bcryptjs** for password hashing  
- **CORS** for frontend-backend communication  
- **dotenv** for environment variable management  

---

## **Database Setup**

1. Create a MySQL database:

```sql
CREATE DATABASE sweet_shop;
Create users table:

sql
Copy code
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Create sweets table:

sql
Copy code
CREATE TABLE IF NOT EXISTS sweets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  quantity INT NOT NULL,
  image VARCHAR(255) NOT NULL
);
Environment Variables
Create a .env file in the backend root:

env
Copy code
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=sweet_shop
PORT=5000
API Endpoints
Auth
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login existing user

Request Example for Register:

json
Copy code
{
  "name": "user123",
  "email": "user123@example.com",
  "password": "123456"
}
Response:

json
Copy code
{
  "message": "User registered successfully"
}
Sweets
Method	Endpoint	Description
GET	/api/sweets/	Get all sweets
POST	/api/sweets/	Add new sweet (Admin only)
PUT	/api/sweets/:id	Update sweet (Admin only)
DELETE	/api/sweets/:id	Delete sweet (Admin only)

Setup & Run Backend
Install dependencies:

bash
Copy code
npm install
Start the server:

bash
Copy code
npm start
Server runs at http://localhost:5000.

AI Usage Note
Some boilerplate and routing structure were AI-assisted. All core logic, database queries, authentication, and API integration were implemented manually.

Screenshots
(You can add backend Postman screenshots of APIs here)

markdown
Copy code
![Register API](https://i.postimg.cc/example-register.png)
![Login API](https://i.postimg.cc/example-login.png)

MIT Licensen readme
