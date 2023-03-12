const express = require('express');
const {getGames,getSingelGame} = require('../controller/games');
const addToRecent = require('../controller/UserRecent')
const GamesRoute = express.Router()

GamesRoute.get('/getGames',getGames)
GamesRoute.post('/addToRecent',addToRecent)
GamesRoute.post('/getSingelGame',getSingelGame)


module.exports = GamesRoute;