const express = require('express');
const getGames = require('../controller/games');
const GamesRoute = express.Router()

GamesRoute.get('/getGames',getGames)


module.exports = GamesRoute;