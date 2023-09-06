const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    
  },
  rating: {
    type: Number,
    required: true,
    default: 0 
    
  },
  comment: {
    type: String,
    required: true
  },
  user: {
    type:mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"

  }
})

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name of product'],
      maxlength: 50,
    },
    image: {
      type: String,
      
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000,
      
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0 
        
      },
    numReviews: {
      type: Number,
      required: true,
      default: 0 
        
      },
      price : {
        type: Number,
        required: true,
        default: 0 
          
        },
        countInStock : {
          type: Number,
          required: true,
          default: 0     
          },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Product', ProductSchema)