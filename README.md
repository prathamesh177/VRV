# Role-Based Authentication System using MERN Stack

A **Role-Based Authentication System** built using the MERN stack (MongoDB, Express, React, Node.js), with user roles such as `Admin` and `User`. The system uses **JWT (JSON Web Tokens)** for secure authentication and **bcrypt.js** for password hashing.

Website is Live here :- https://vrv-g1tx-prathameshs-projects-b3df6694.vercel.app/
---

## Features

- **User Roles:** Role-based access control for Admin and User roles.
- **Authentication:** Secure login and registration using JWT.
- **Authorization:** Restrict access to specific routes based on user roles.
- **Password Security:** Passwords are hashed using bcrypt.js.
---

## Tech Stack

### Frontend
- **React**: User interface.
- **Axios**: HTTP client for API communication.
- **React Router**: Navigation and route protection.

### Backend
- **Node.js**: Runtime environment.
- **Express.js**: Backend framework for API development.
- **JWT**: Authentication and session management.
- **bcrypt.js**: Password hashing.

### Database
- **MongoDB**: NoSQL database for storing user details.

---

## Installation and Setup

### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB

### Clone Repository
```bash
git clone https://github.com/prathamesh177/VRV.git
cd VRV
```

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` directory with the following variable:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```
4. Start the frontend development server:
   ```bash
   npm start
   ```

---

## API Endpoints

### Authentication
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Authenticate a user and return a JWT.


## Folder Structure

### Backend
```
backend/
├── models/
│   └── user.js
├── routes/
│   ├── auth.js
├── middleware/
│   ├── auth.js
│   └── checkRole.js
└── server.js
```

### Frontend
```
frontend/
├── src/
│   Components/
│   ├── AdminDashboard.js
│   └── Dashboard.js
│   ├── Login.js
│   ├── Register.js
│   └── App.js
```

---

## Usage

1. Start the MongoDB server.
2. Run the backend and frontend servers as described above.
3. Access the app in your browser at `http://localhost:3000`.
4. Register a new user or login with an admin account.

---

## Future Improvements
- Add password reset functionality.
- Implement email verification during registration.
- Enhance user interface with better design.
- Sign in with Google Functionality
- ![future](https://github.com/user-attachments/assets/62f566e7-f6d9-43c9-9821-5186cb8ee5fb)


---

## Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

![image](https://github.com/user-attachments/assets/3ec3ddb1-d64b-4cbb-898b-eafe5f74633e)
![image](https://github.com/user-attachments/assets/9c0b967f-d27c-40b4-b706-2c7ed842f735)
![image](https://github.com/user-attachments/assets/b28d15b5-5e53-4e96-b4f9-cb7cd0b8be0e)
![image](https://github.com/user-attachments/assets/8952d7ba-960a-4243-81e7-247d102511a3)







