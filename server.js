const express = require('express');
const cors = require('cors')
const bcrypt = require("bcryptjs");
const passport = require("passport");
const Users = require('./data/model')
const initializePassport = require("./passport-config.js");
const createSession = require("./middleware/createSession.js");
const checkAuthenticated = require('./middleware/checkAuthenticated')
const apiRouter = require('./routers/apiRouter')


const server = express();
server.use(express.json())

server.use(cors())
createSession(server)
initializePassport(passport) //ORDER MATTERS
server.use('/api', apiRouter)





module.exports = server;