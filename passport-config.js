const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db = require('./data/db-config');
const Users = require('./data/model')

module.exports = passport => {
    const authenticateUser = async (username, password, done) => {
        const user = await Users.findByUsername(username)

        if (user == null) {
            return done(null, false, { message: 'No user with that username' });
        }

        try {
            if (await bcrypt.compareSync(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (e) {
            return done(e);
        }
    };

    passport.use(new LocalStrategy({ usernameField: 'username', session: true }, authenticateUser));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        db('users')
            .where({ id })
            .first()
            .then(user => {
                done(null, user);
            })
            .catch(error => {
                done(error, false);
            });
    });
};