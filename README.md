# REST API with Node.js, TypeScript, and MongoDB

This is a beginner-friendly REST API built using **Node.js**, **TypeScript**, **Express**, and **MongoDB** (via Mongoose). It features a modular file structure, authentication (with hashed passwords and session cookies), and full CRUD operations for users.

## Learning objectives

- Setting up a REST API with TypeScript and Node.js
- Connecting to MongoDB Atlas with Mongoose
- Creating models and schemas
- Registering and logging in users securely
- Using middlewares for authentication and authorization
- Creating modular routes and controllers
- Securing routes with cookies and session tokens


## Technologies Used

- Node.js
- TypeScript
- Express
- MongoDB (via Mongoose)
- Crypto (for password hashing and tokens)
- Postman (for testing)


## Installation

1. **Clone the repo**  
   ```bash
   git clone https://github.com/debb-major/rest_api_ts.git
   cd your-repo-name
   ```
2. **Install dependencies**
   ```bash
   npm install body-parser compression cookie-parser cors dotenv express lodash mongoose
   ```
3. **Install dev dependencies**
   ```bash
   npm install -D nodemon ts-node typescript @types/body-parser @types/compression @types/cookie-parser @types/cors @types/express @types/lodash @types/mongoose
   ```
4. **Set up ```.env``` (optional)**
   - Or manually replace your MongoDB URI in the ```mongoose.connect()``` section
   
5. **Run the dev server**
   ```bash
   npm start
   ```


## Project Structure
```bash
src/
├── controllers/          # Logic for auth and user routes
│   ├── authentication.ts
│   └── users.ts
├── db/                   # Mongoose models and database access
│   └── users.ts
├── helpers/              # Password hashing and token generation
│   └── index.ts
├── middlewares/          # Authentication & authorization checks
│   └── index.ts
├── routes/               # API routes
│   ├── authentication.ts
│   ├── users.ts
│   └── index.ts
└──index.ts               # Main entry point (Express server)
```

### Authentication
- Passwords are salted and hashed using ```crypto```.
- Session tokens are stored in cookies (```res.cookie()```).
- Middleware ensures only logged-in users can access protected routes.

### Available Routes
**Auth Routes**

| Method | Endpoint        | Description     |
|--------|-----------------|-----------------|
| POST   | /auth/register  | Register a user |
| POST   | /auth/login     | Login a user    |

**User Routes**
| Method | Endpoint   | Auth Required | Description            |
|--------|------------|---------------|------------------------|
| GET    | /users     | Yes           | Get all users          |
| DELETE | /users/:id | Yes + Owner   | Delete a specific user |
| PATCH  | /users/:id | Yes + Owner   | Update user's username |


### Testing with Postman
1. Register a new user via ```/auth/register```
2. Log in via ```/auth/login``` (cookie will be set)
3. Use the cookie to access protected routes like ```/users```


### Credits
This project is based on the amazing tutorial by **Code With Antonio**
Watch the video - https://youtu.be/b8ZUb_Okxro?si=K1bCdM91OtON3m8l





