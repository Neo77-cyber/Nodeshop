const Product = require('../models/product')
const User = require('../models/auth')
const {StatusCodes} = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')



const getAllProduct = async (req, res) => {
    const page = parseInt(req.query.page) || 1; 
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 10; 
  
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;
  
    const totalProduct = await Product.countDocuments();
  
    const product = await Product.find({})
      .sort({ createdAt: -1 }) 
      .skip(startIndex)
      .limit(itemsPerPage);
  
    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(totalProduct / itemsPerPage),
    };
  
    res.status(StatusCodes.OK).json({ product, pagination });
  };
  

const getSingleProduct = async (req, res) => {
    const {
        
        params: { id: productId },
      } = req
    
      const product = await Product.findOne({
        _id: productId,
        
      }).populate('name')

      if (!product) {
        throw new NotFoundError(`No product with id ${productId}`)
      }
      res.status(StatusCodes.OK).json({ product })

  }

  
const searchProduct = async (req,res) => {
    const {name} = req.query

    if (!name) {
        throw new BadRequestError('Please provide a name')
    }

    const product = await Product.find({name: { $regex: name, $options: 'i' }})

    if (product.length === 0){
        throw new NotFoundError('No product found with that name')
    }
    return res.status(StatusCodes.OK).json({product})

}


const reviewProduct = async (req, res) => {
        const { rating, comment } = req.body;
        const productId = req.params.id;
        const user = req.user;
         
        const product = await Product.findById(productId);

        if (!product) {
            throw new NotFoundError(`Product with ID ${productId} not found`);
        }
     
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === user.userId.toString()
        );

        if (alreadyReviewed) {
            throw new BadRequestError('Product has already been reviewed by this user');
        }
          
        const newReview = {
            name: user.name,
            rating: Number(rating),
            comment,
            user: user.userId,
        };
  
        product.reviews.push(newReview);

        product.numReviews = product.reviews.length;
        product.rating =
            product.reviews.reduce((total, review) => total + review.rating, 0) /
            product.numReviews;

        await product.save();

        res.status(StatusCodes.CREATED).json({ message: 'Review added successfully', review: newReview });
    
}


module.exports = {getAllProduct, getSingleProduct, searchProduct, reviewProduct}