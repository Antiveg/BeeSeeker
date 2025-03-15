# BeeSeeker

**BeeSeeker** is a scholarship registration platform that simplifies the application process for students. It features an easy-to-use interface for applicants while offering a strong backend for managing scholarship information and user authentication. This website allows students to search for scholarships, and it also enables organizations, including government entities, to post their scholarship offerings and descriptions for users to discover.

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Deploying for Production](#deploying-for-production)
- [Using Docker](#using-docker)

---

## Overview
BeeSeeker is built using modern web technologies to ensure a seamless experience for both applicants and administrators. The repository includes:

- **Client (Frontend):** Built with **React.js**, **Vite**, and **Tailwind CSS**.
- **Backend:** Powered by **Node.js**, **PostgreSQL**, **Sequelize**, and **JWT** for secure authentication.
- **Supporting Files:** VS Code configuration files, a `.gitignore` file, and an **ERD diagram** (`ERD.jpg`) for the database schema.

---

## Features
- **User Registration & Authentication** – Secure sign-up/login using JSON Web Tokens.
- **Dynamic Scholarship Forms** – Rich text inputs with Quill Editor.
- **Responsive Design** – Clean, responsive UI powered by React, Vite, and Tailwind CSS.
- **Robust Backend** – Secure data handling using PostgreSQL and Sequelize.
- **Utility Integrations** – Date formatting with Moment.js, data conversion with K-convert, and API communication via Axios.

---

## Tech Stack
### Frontend (Client)
- **React.js** – Building the user interface.
- **Vite** – Fast build tool and development server.
- **Tailwind CSS** – Utility-first CSS framework.
- **Quill Editor** – Rich text editor integration.
- **Moment.js** – Handling date and time.
- **Axios** – HTTP client for API requests.

### Backend
- **Node.js** – JavaScript runtime environment.
- **JWT** – Secure token-based authentication.
- **K-convert** – Data conversion utility.
- **PostgreSQL** – Relational database.
- **Sequelize** – ORM for database operations.

---

## Repository Structure
```
BeeSeeker/
├── backend/  # Backend server code (API routes, models, controllers, etc.)
├── client/   # Frontend code built with React.js
├── .vscode/  # VS Code configuration settings
├── .gitignore  # Specifies files and directories to ignore
└── ERD.jpg  # Entity-Relationship Diagram of the database schema
```

---

## Installation & Setup
### Step 1: Clone Repository
```bash
git clone https://github.com/nicksens/BeeSeeker.git
cd BeeSeeker
```

### Step 2: Frontend Setup
```bash
cd client
npm install
```

### Step 3: Backend Setup
```bash
cd ../backend
npm install
```

### Step 4: Configure Environment
Create a `.env` file in the `backend` folder with your settings:
```bash
DB_HOST=localhost
DB_USER=your_db_username
DB_PASS=your_db_password
DB_NAME=bee_seeker_db
JWT_SECRET=your_jwt_secret
```

### Step 5: Database Setup
Create your PostgreSQL database:
```bash
CREATE DATABASE bee_seeker_db;
```
If using Sequelize migrations, run:
```bash
npx sequelize-cli db:migrate
```
Refer to `ERD.jpg` for database schema details.

---

## Running the Application
### Frontend
Start the frontend development server:
```bash
cd client
npm run dev
```

### Backend
Start the backend server:
```bash
cd backend
npm run start
```
Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## Deploying for Production
### Frontend Build
```bash
cd client
npm run build
```

### Backend Deployment
Deploy the backend as per your hosting strategy, ensuring that all environment variables are properly configured.

---

## Using Docker
### Step 1: Build and Run Containers
```bash
docker-compose up --build -d
```

### Step 2: Check Running Containers
```bash
docker ps
```

### Step 3: Stop Containers
```bash
docker-compose down
```

Make sure all environment variables are correctly set in `.env` before running the containers.

