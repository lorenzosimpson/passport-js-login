const db = require('./db-config');
module.exports = {
    findByUsername,
    insert,
}

function findByUsername(username) {
    return db('users').where({ username }).first()
}

function insert(user) {
    return db('users').insert(user)
}