const express = require('express')


const router = express.Router()

const {userProfile} = require('../controllers/user')


router.route('/').get(userProfile)


module.exports = router