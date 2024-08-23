const Sequelize = require("sequelize");
const dbConfig = require("./config"); // Import your Sequelize configuration

// Initialize Sequelize with the appropriate environment configuration
const sequelize = new Sequelize(dbConfig[process.env.NODE_ENV]);

// Define your models and perform database operations using sequelize

module.exports = sequelize; // Export the initialized Sequelize instance
