# Local Docker Setup

This local setup uses:

- Nginx as the web server / reverse proxy
- Laravel as the backend API
- SQLite as the local database
- Vite React as the web frontend
- Expo React Native as the mobile app

## Run backend + frontend through Nginx

From the project root:

```powershell
docker compose up --build
```

Open:

```text
http://localhost:8080
```

Nginx sends web page requests to the frontend container and `/api` requests to the Laravel backend container.

## Run mobile

Run the backend first, then start Expo in another terminal:

```powershell
cd C:\Users\ruffc\Ticketing-System\mobile
npm run start
```

The mobile app reads from the Laravel Users API through:

```text
EXPO_PUBLIC_API_BASE_URL
```

For local web/iOS simulator, this usually works:

```text
http://127.0.0.1:8000/api
```

For Android emulator, use:

```text
http://10.0.2.2:8000/api
```

For a real phone, use your computer's LAN IP, for example:

```text
http://192.168.1.10:8000/api
```

Create `mobile/.env` from `mobile/.env.example` if you need to change it.

## Local database

The SQLite database file is stored at:

```text
backend/database/database.sqlite
```

The backend container creates it automatically and runs migrations.

## Default login

After the database seed runs, you can use:

```text
Email: test@example.com
Password: password
```

## Connected API resource

Both web and mobile now read Users from the Laravel backend:

```text
GET /api/users
```

The full Users CRUD API is:

```text
GET     /api/users
GET     /api/users/{id}
POST    /api/users
PUT     /api/users/{id}
PATCH   /api/users/{id}
DELETE  /api/users/{id}
```

## Stop containers

```powershell
docker compose down
```
