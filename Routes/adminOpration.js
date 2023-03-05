const express = require('express');
const saveGames = require('../controller/AdminOprationController');
const AdminOrationRoute = express.Router();

AdminOrationRoute.post("/saveGames",saveGames)


module.exports = AdminOrationRoute;