const express = require('express')


const router = express.Router()

const {getAllProduct, getSingleProduct, searchProduct, reviewProduct} = require('../controllers/product')


router.route('/').get(getAllProduct)
router.route('/search').get(searchProduct)
router.route('/:id').get(getSingleProduct)
router.route('/:id/review').post(reviewProduct)


module.exports = router