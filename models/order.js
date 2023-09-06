const { string } = require('joi')
const mongoose = require('mongoose')


const OrderSchema = new mongoose.Schema ({
  user: {
    type:mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"

  },
  orderItems: [{
    name: {type:String, required:true},
    qty: {type:String, required:true},
    image: {type:String, required:true},
    price: {type:String, required:true},
    product: {
      type:mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    }
  }],

  shippingAddress: {
    address: {type:String, required:true},
    city: {type:String, required:true},
    postalCode: {type:String, required:true},
    Country: {type:String, required:true},
  },
  paymentMethod: {
    type:String,
    required:true,
    default: "Paypal"

  },
  paymentResult: {
    id: {type:String, required:true},
    status: {type:String, required:true},
    update_time: {type:String, required:true},
    email_address: {type:String, required:true},
  },
  taxprice: {
    type:Number,
    required: true,
    default: 0.0
  },
  shippingPrice: {
    type:Number,
    required: true,
    default: 0.0
  },
  totalPrice: {
    type:Number,
    required: true,
    default: 0.0
  },
  isPaid: {
    type:Boolean,
    required: true,
    default: 0.0
  },
  paidAt: {
    type:Date
  },
  isDelivered: {
    type:Boolean,
    required:true,
    default:false

  },
  deliveredAt: {
    type:Date,
  },},
  
  { timestamps: true },
)
    

module.exports = mongoose.model('Order', OrderSchema)