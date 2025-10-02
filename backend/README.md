# 🚀 RentCars Backend (MERN)

This is the backend of the **RentCars** application, built with **MERN stack (MongoDB, Express, Node.js)**.  
It provides APIs for authentication, car management, reservations, and image handling via ImageKit.  

---

✨ Features

🔑 Authentication & Authorization: JWT-based authentication with role management (User ↔ Owner)  
🚘 Car Management: Add, update, delete cars with full details (category, price, seats, fuel type, transmission, description, image)  
📅 Reservations: Create, update, cancel bookings, and manage booking statuses  
📊 Dashboard Support: Provides summarized data for cars, reservations, and revenue  
🖼️ Image Handling: Integrated with **ImageKit** for secure image upload and hosting  
⚡ Tech Stack: Node.js, Express.js, MongoDB, Mongoose  

---

🛠️ Tech Stack

- **Backend Framework**: Node.js + Express.js  
- **Database**: MongoDB (Mongoose ODM)  
- **Authentication**: JWT + bcrypt  
- **Image Uploads**: ImageKit API  
- **Environment Management**: dotenv  

---

🚀 Getting Started

## Prerequisites
- Node.js >= 18  
- MongoDB instance (local or cloud like Atlas)  
- ImageKit account for image hosting  

## Installation

Clone the repository:
git clone https://github.com/yourusername/rentcars-backend.git
cd rentcars-backend

Install dependencies:
npm install

Set environment variables (create a `.env` file in root):
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/rentcars
PORT=5000
SECRET_KEY=your_secret_key_here
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
IMAGEKIT_END_POINT=https://ik.imagekit.io/your_project_id

Notes:  
- `MONGO_URL` → Connection string for MongoDB (local or Atlas)  
- `PORT` → Backend server port (default: 5000)  
- `SECRET_KEY` → Secret key for JWT signing  
- `IMAGEKIT_PUBLIC_KEY / IMAGEKIT_PRIVATE_KEY / IMAGEKIT_END_POINT` → ImageKit credentials for image hosting  

Start the development server:
npm run dev

The backend should now be running at http://localhost:5000/api (or the port you set in `.env`).  

---

📂 Project Structure

.
├── src/
│   ├── config/        # Database connection
│   ├── controllers/   # Route controllers 
│   ├── middleware/    # Auth middleware, error handling
│   ├── models/        # Mongoose models
│   ├── routes/        # API routes 
│   └── server.js      # App entry point
├── package.json
├── .env               # Environment variables
└── README.md          # Project documentation

---

🔐 Authentication & Roles

- Users can sign up and log in  
- JWT authentication secures all protected routes  
- Owners can manage cars, view bookings, and update booking status  
- Admin-ready structure for future enhancements  

---

Happy coding on the backend! 🔥
