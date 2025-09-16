const express = require('express');
require('dotenv').config();
const sequelize = require('./config/database');
const HealthCheck = require('./models/HealthCheck')(sequelize);

const app = express();
app.use(express.json());

console.log(' Application starting...');

// Database initialization function
async function initializeDatabase() {
  try {
    console.log(' Testing database connection...');
    await sequelize.authenticate();
    console.log(' Database connection established successfully');
    
    console.log(' Creating database tables...');
    await sequelize.sync();
    console.log(' Database tables synchronized successfully');
    
    return true;
  } catch (error) {
    console.error(' Database error:', error.message);
    return false;
  }
}

initializeDatabase(); // Initializedatabase connection