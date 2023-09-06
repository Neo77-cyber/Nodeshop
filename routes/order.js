const express = require('express')


const router = express.Router()

const {createOrder, getOrder,updatePayment} = require('../controllers/order')


router.route('/').post(createOrder)
router.route('/:id').get(getOrder).put(updatePayment)


module.exports = router


