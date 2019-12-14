const session = require("express-session");
const passport = require("passport");
const KnexSessionStore = require("connect-session-knex")(session);
const db = require("../data/db-config");
const cookieParser = require("cookie-parser");

const store = new KnexSessionStore({
  tablename: "sessions",
  sidfieldname: "sid",
  knex: db,
  clearInterval: 1 * 24 * 60 * 60 * 1000,
  createtable: true
});

const sessionConfig = {
  name: "sandy cat",
  secret: process.env.SESSION_SECRET,
  resave: false,
  key: "Bonafind",
  saveUninitialized: false,
  cookie: {
    maxAge: 1 * 24 * 60 * 60 * 1000,
    secure: false, 
    httpOnly: true
  },
  store: store
};

module.exports = server => {
  server.use(session(sessionConfig));
  server.use(cookieParser());
  server.use(passport.initialize());
  server.use(passport.session());
};