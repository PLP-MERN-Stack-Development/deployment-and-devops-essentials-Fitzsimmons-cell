🐞 MERN Bug Tracker

A full-stack bug tracking system built using the MERN stack.
Users can report bugs, view existing bugs, and manage issues using a clean React UI connected to a fully deployed Express + MongoDB backend.

🚀 Live Demo
Frontend (Vercel)

🔗 https://deployment-and-devops-essentials-q1.vercel.app/

Backend API (Render)

🔗 https://deployment-and-devops-essentials-52py.onrender.com

📌 Features

Add new bug reports

View all bugs

REST API with Express + MongoDB

Fully deployed backend on Render

Vite-powered React frontend on Vercel

Centralized API service using Axios

CORS enabled

🛠️ Tech Stack
Frontend

React (Vite)

Axios

JavaScript / JSX

Backend

Node.js

Express.js

MongoDB & Mongoose

dotenv

CORS

Deployment

Vercel (Frontend Hosting)

Render (Backend Hosting)

GitHub (Version Control)

📁 Folder Structure
MERN-Bug-Tracker/
│
├── Backend/
│   ├── server.js
│   ├── package.json
│   ├── controllers/
│   │   └── bugController.js
│   ├── routes/
│   │   └── bugRoutes.js
│   └── models/
│       └── Bug.js
│
└── Frontend/
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── components/
        │   ├── BugForm.jsx
        │   └── BugList.jsx
        └── services/
            └── api.js

📡 API Endpoints
Base URL
https://deployment-and-devops-essentials-52py.onrender.com/api

GET /bugs

Fetch all bugs
Response example:

[
  {
    "_id": "673ad1",
    "title": "Button not working",
    "description": "Submit button fails",
    "priority": "medium"
  }
]

POST /bugs

Create a new bug
Body example:

{
  "title": "Error on homepage",
  "description": "Modal does not close",
  "priority": "high"
}

PATCH /bugs/:id

Update a bug

DELETE /bugs/:id

Delete a bug

⚙️ Environment Variables
Backend .env
MONGO_URI=your_mongo_uri
PORT=5000

Frontend .env
VITE_API_URL=https://deployment-and-devops-essentials-52py.onrender.com


Accessed in api.js:

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

🚀 Deployment Instructions
Backend Deployment (Render)

Create new Render Web Service

Connect GitHub repo

Build command:

npm install


Start command:

node server.js


Add environment variables

Deploy

Frontend Deployment (Vercel)

Import GitHub repo

Framework preset: Vite

Build command:

npm run build


Output directory:

build


Add environment variables

Deploy

🖼️ Screenshots (Optional)

To add screenshots, create a /screenshots folder:

/screenshots/preview.png


Insert like this:

![App Preview](screenshots/preview.png)