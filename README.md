# Community Dabba Service Manager

A small MERN stack mini project for managing community meal donations,
subscriptions, and feedback.

## Main features

- User registration and login
- JWT-based protected pages
- View meals stored in MongoDB
- Add a meal subscription
- Submit feedback with a rating
- Dashboard totals loaded from the backend

## Run the backend

1. Open `Dabba-backend`.
2. Copy `.env.example` to `.env`.
3. Add your MongoDB connection string and JWT secret.
4. Run:

```bash
npm install
npm start
```

The backend runs on `http://localhost:5000`.

## Run the frontend

Open `Dabba-frontend` in another terminal and run:

```bash
npm install
npm run dev
```

Open the URL displayed by Vite, normally `http://localhost:5173`.

## API routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/meals`
- `POST /api/meals`
- `GET /api/subscriptions`
- `POST /api/subscriptions`
- `GET /api/feedback`
- `POST /api/feedback`
