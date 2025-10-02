# 🚗 RentCars Client

RentCars is a luxury car rental web application frontend where users can:

- Browse and book cars
- Switch their role to Owner and add cars for rent
- View and manage reservations
- Update the status of bookings and rental cars
- Access a summary dashboard with key insights

This project is built with React + Vite + TypeScript, styled with Tailwind CSS, using React Router DOM for routing and Axios for API requests.

✨ Features

🔑 Authentication & Roles: Log in, sign up, and change roles (User ↔ Owner)  
📅 Car Booking: Reserve cars with daily prices, seat numbers, and detailed info  
🚘 Owner Dashboard: Add cars with full details (category, year, price, fuel type, transmission, seats, description, image)  
📊 Reservation Management: View all bookings, update booking status, and manage rental car availability  
📈 Summary Dashboard: Access an overview of cars, bookings, and revenue insights  
⚡ Modern Tech Stack: React + Vite + TypeScript, Tailwind CSS, React Router DOM, Axios

🛠️ Tech Stack

Frontend: React, TypeScript, Tailwind CSS, React Router DOM, Axios  
State Management: Context API  
HTTP Requests: Axios

🚀 Getting Started

## Prerequisites

- Node.js >= 18
- npm or yarn
- Backend API running (set VITE_BASE_URL to its URL)

## Installation

Clone the repository:
git clone https://github.com/yourusername/rentcars-client.git
cd rentcars-client

Install dependencies:
npm install

Set environment variables (create a `.env` file in root):
VITE_CURRENCY=USD
VITE_BASE_URL=http://localhost:5000/api

Notes:

- VITE_CURRENCY → Default currency for displaying prices (USD, EUR, etc.)
- VITE_BASE_URL → Base URL of your backend API

Start the development server:
npm run dev

The app should now be running at http://localhost:5173 (or the port Vite provides).

📂 Project Structure

.
├── public/ # Static assets
├── src/
│ ├── assets/ # Images and other assets
│ ├── components/ # Reusable React components
│ ├── pages/ # Application pages
│ ├── services/ # API calls and business logic
│ ├── context/ # Context API for auth and global state
│ ├── interfaces/ # TypeScript Interfaces definitions
│ ├── App.tsx # Root component
│ └── main.tsx # Entry point
├── tsconfig.json # TypeScript configuration
├── vite.config.ts # Vite configuration
└── README.md # Project documentation

🔐 Authentication & Roles

- Users can sign up and log in
- Users can change their role to Owner to list cars for rent
- Owners can manage cars and see their bookings
- Owners can update booking status and control car availability
- A summary dashboard provides insights into activity and rentals

## ESLint & Code Quality

This project uses ESLint with TypeScript and React plugins for code quality and consistency. To enable type-aware lint rules, update your ESLint configuration as follows:

// eslint.config.js
import tseslint from 'typescript-eslint'
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
globalIgnores(['dist']),
{
files: ['**/*.{ts,tsx}'],
extends: [
...tseslint.configs.recommendedTypeChecked,
reactX.configs['recommended-typescript'],
reactDom.configs.recommended,
],
languageOptions: {
parserOptions: {
project: ['./tsconfig.node.json', './tsconfig.app.json'],
tsconfigRootDir: import.meta.dirname,
},
},
},
])

---

Happy coding! 🚗✨
