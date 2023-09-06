const User = require('../models/auth')
const Product = require('../models/product')
const {StatusCodes} = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const cloudinary = require('cloudinary').v2;
const fs = require('fs');



const getAllUsers = async (req, res) => {
    
    const users = await User.find({}).select('-password');
    console.log(users);

    
    if (!users) {
        throw new NotFoundError('users not found');
    }

    return res.status(StatusCodes.OK).json({ user: users });
};


const createProduct = async (req, res) => {

    const product = await Product.create({...req.body})

    res.status(StatusCodes.CREATED).json({product})
}


const updateProduct = async (req, res) => {
    const {
        body: {name, image, description, price,countInStock },
        params: {id:productId},
    } = req
    
    if (name === '' || image === '' || description === '' || price === '' || countInStock === ''){
        throw new BadRequestError('please provide the credentials')
    }
    const product = await Product.findByIdAndUpdate({
        _id: productId,
    },
        req.body,
        { new: true, runValidators: true }
        )
    if (!product){
        throw new NotFoundError(`No product with ${productId}`)
    }

    res.status(StatusCodes.OK).json({product})
}


const DeleteProduct = async (req, res) => {
    const {
        params: {id:productId},
    } = req

    const product = await Product.findByIdAndRemove({
        _id:productId,
    })
    if (!product) {
        throw new NotFoundError(`No product with ${product}`)
    }
    res.status(StatusCodes.OK).send()
}


const uploadProductImage = async (req, res) => {
    const result = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      
      {
        use_filename: true,
        folder: 'file-upload',
      }
      
    );
    
    fs.unlinkSync(req.files.image.tempFilePath);
    return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
  };

  
module.exports = {getAllUsers, createProduct, updateProduct, DeleteProduct, uploadProductImage}