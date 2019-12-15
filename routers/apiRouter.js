const router = require('express').Router()
const passport = require('passport');
const bcrypt = require('bcryptjs')
const Users = require('../data/model')


router.post('/register', async(req, res) => {
    const new_user = req.body;
    try {
        new_user.password = await bcrypt.hashSync(new_user.password, 8)
        const added = await Users.insert(new_user)
        res.status(201).json(new_user)
    } catch(e) {
        console.log(e)
    }
})

router.post(
    "/login",
    passport.authenticate("local", {
      session: true
    }),
    (req, res) => {
        res.status(200).json({
          message: "You have successfully logged in",
          username: req.user.username
        });
    }
  );

  router.get('/secret', (req, res) => {
    if (req.session.name === 'sandy') res.status(200).json('cat')
    else res.status(401).json('forbidden')
    console.log(req.session.sandy)
  })

module.exports = router;


