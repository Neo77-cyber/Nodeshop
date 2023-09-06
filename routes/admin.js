const express = require('express')


const router = express.Router()

const {getAllUsers,createProduct,updateProduct,DeleteProduct,uploadProductImage} = require('../controllers/admin')


router.route('/users').get(getAllUsers)
router.route('/product').post(createProduct)
router.route('/:id').patch(updateProduct).delete(DeleteProduct)
router.route('/upload').post(uploadProductImage)


module.exports = router