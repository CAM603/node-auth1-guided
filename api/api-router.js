const router = require('express').Router();
const bcrypt = require('bcryptjs')

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const restrcited = require('../auth/restricted-middleware');

router.use('/auth', authRouter);
router.use('/users', restrcited, usersRouter);

router.get('/hash', (req, res) => {
  // read the authentication header
  const authentication = req.headers.authentication;
  // hash the value from the header
  const hash = bcrypt.hashSync(authentication, 12)

  res.json({ originalValue: authentication, hashedValue: hash })

  // First get
  // "$2a$12$o1DAYDDXj/LlQcrjUUPSMeWuS80svAnD8pIB/rkCaUBAyXje3iUN6"

  // Second get
  // "$2a$12$hQrFVHqULHQ3GzS660B0puKLV1MpTLL2F68dDgJeaJyWW9KDgbjU2"
})

router.get('/', (req, res) => {
  res.json({ api: "It's alive" });
});

module.exports = router;
