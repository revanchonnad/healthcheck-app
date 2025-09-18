# Health Check API



## Technology Stack

- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** MySQL 8.0+
- **ORM:** Sequelize
- **Architecture:** RESTful API with automated schema management

## Prerequisites

- Node.js 18 or higher
- MySQL 8.0 or higher
- npm (Node Package Manager)

## Installation

1. **Clone/Extract the project files**
   ```bash
   cd healthcheck-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MySQL database**
   
   Create a new database in MySQL:
   ```sql
   CREATE DATABASE healthcheck_app;
   ```

4. **Configure environment variables**
   
   Create a `.env` file in the project root with the following configuration:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=healthcheck_app
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   PORT=8080
   NODE_ENV=development
   ```
   
   Replace `your_mysql_password` with your actual MySQL root password.

## Running the Application

1. **Start the application**
   ```bash
   node app.js
   ```

2. **For development with auto-restart**
   ```bash
-
   ```

3. **Verify the application is running**
   
   The console should display:
   ```
    Application starting...
    Testing database connection...
    Database connection established successfully
    Creating database tables...
    Database tables synchronized successfully
    Server running on port 8080
   ```

## API Documentation

### Health Check Endpoint

**Endpoint:** `GET /healthz`

**Purpose:** Validates application health and database connectivity by inserting a timestamped record into the health_checks table.

#### Request

- **Method:** GET only
- **URL:** `http://localhost:8080/healthz`
- **Headers:** Standard HTTP GET headers
- **Body:** Not allowed (returns 400 if present)
- **Query Parameters:** None required

#### Response

- **Body:** Empty (no content)
- **Headers:**
  - `Cache-Control: no-cache, no-store, must-revalidate`
  - `Pragma: no-cache`
  - `X-Content-Type-Options: nosniff`

#### Status Codes

| Code | Condition | Description |
|------|-----------|-------------|
| 200 OK | Success | Database insert successful |
| 400 Bad Request | Invalid request | Request contains a payload |
| 405 Method Not Allowed | Wrong method | Non-GET method used |
| 503 Service Unavailable | Database error | Database insert failed |

## Testing

### Using curl

**Successful health check:**
```bash
curl -v http://localhost:8080/healthz
```

**Test method not allowed:**
```bash
curl -X POST http://localhost:8080/healthz
```

**Test bad request (with payload):**
```bash
curl -X GET http://localhost:8080/healthz -d '{"test": "data"}' -H "Content-Type: application/json"
```

### Testing Database Failure Scenario

1. Stop your MySQL service
2. Make a request to `/healthz` - should return 503
3. Restart MySQL service
4. Make another request - should return 200 (without restarting the Node.js app)

## Database Schema

The application automatically creates the following table structure:

### health_checks Table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| check_id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| check_datetime | DATETIME | NOT NULL, DEFAULT CURRENT_TIMESTAMP | UTC timestamp of health check |

## Project Structure

```
healthcheck-app/
├── package.json                 # Node.js project configuration
├── app.js                      # Main application entry point
├── .env                        # Environment variables (not in repo)
├── .gitignore                  # Git ignore rules
├── README.md                   # This file
├── config/
│   └── database.js             # Database connection configuration
├── models/
│   └── HealthCheck.js          # Sequelize model for health_checks table
└── routes/
    └── health.js               # Health check route handlers
```

