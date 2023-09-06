const Order = require('../models/order')
const {StatusCodes} = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')



const createOrder = async (req, res) => {
    const {orderItems, shippingAddress, paymentMethod, paymentResult, itemsPrice, taxPrice, shippingPrice,totalPrice } = req.body

    if (orderItems && orderItems.length === 0) {
        throw new NotFoundError('No order items')
    }

    const order = await Order.create({
      orderItems,
      user: req.user.userId,
      shippingAddress,
      paymentMethod,
      paymentResult,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    return res.status(StatusCodes.OK).json(order)
}


const getOrder = async (req, res) => {
    const {
        
        params: { id: orderId },
      } = req
    
      const order = await Order.findOne({
        _id: orderId,
        
      }).populate('user', 'name email')

      if (!order) {
        throw new NotFoundError(`No order with id ${orderId}`)
      }
      res.status(StatusCodes.OK).json({ order })
}


const updatePayment = async (req, res) => {
        const {
            params: { id: orderId },
            body: { paymentResult },
        } = req;

        if (!paymentResult || !paymentResult.id || !paymentResult.status || !paymentResult.update_time || !paymentResult.email_address) {
            throw new BadRequestError('Please provide valid paymentResult data');
        }

        const order = await Order.findByIdAndUpdate(
            {
                _id: orderId,
            },
            {
                paymentResult: {
                    id: paymentResult.id,
                    status: paymentResult.status,
                    update_time: paymentResult.update_time,
                    email_address: paymentResult.email_address,
                },
                isPaid: true,
                paidAt: new Date(),
            },
            { new: true, runValidators: true }
        );

        if (!order) {
            throw new NotFoundError(`No order with id ${orderId}`);
        }

        res.status(StatusCodes.OK).json({ order }); 
}


module.exports = {createOrder, getOrder, updatePayment}







