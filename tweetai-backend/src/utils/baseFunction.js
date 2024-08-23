var express = require("express");
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const config = require("../../config/config.js");
const nodemailer = require("nodemailer");
require("dotenv").config();
const User = require("../../models").User;
const jwt = require("jsonwebtoken");
const ejs = require("ejs");

const dbConfig = require("../../config/config");

const sequelize = new Sequelize({
    username: dbConfig[process.env.NODE_ENV].username,
    password: dbConfig[process.env.NODE_ENV].password,
    database: dbConfig[process.env.NODE_ENV].database,
    host: dbConfig[process.env.NODE_ENV].host,
    dialect: dbConfig[process.env.NODE_ENV].dialect,
    autocommit: false,
});

//##################### THIS CONTAIN FUNCTIONS THAT CAN BE RE-USEABLE ###########
class BaseFunction {
    constructor() { }

    //######## success response
    responseSuccess(data = null, success = null, message = null, description = "Operation was successful.", statusCode = 200) {
        return {
            status: statusCode,
            success: success,
            message: message,
            description: description,
            data: data,
        };
    }

    //######## error response
    responseError(data = null, success = null, message = null, description = "Operation not successful! An error occurred.", statusCode = 400) {
        return {
            status: statusCode,
            success: success,
            message: message,
            description: description,
            error: data,
        };
    }

    rawQueryConnection() {
        // SEQUELIZE DB CONFIG
        var conn = this.currentConnection();
        const sequelize = new Sequelize(conn.database, conn.username, conn.password, {
            host: conn.host,
            dialect: conn.dialect,
        });

        return sequelize;
    }

    //Get the current Database connected to
    currentConnection() {
        // You can call it like:
        // var conn = baseFunction.currentConnection(); OR var conn = currentConnection();
        // console.log(conn.database);
        var mode = process.env.NODE_ENV;
        const activeConnection = {
            database: config[mode].database,
            username: config[mode].username,
            password: config[mode].password,
            host: config[mode].host,
            dialect: config[mode].dialect,
        };
        return activeConnection;
    }



}

module.exports = BaseFunction;
