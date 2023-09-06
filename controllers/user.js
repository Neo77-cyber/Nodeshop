const User = require('../models/auth')
const Recipe = require('../models/product')
const {StatusCodes} = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')


const userProfile = async (req, res) => {
    
    const userId = req.user.userId; 

    
    const foundUser = await User.findById(userId).select('-password');

    
    if (!foundUser) {
        throw new NotFoundError('No user found');
    }

    return res.status(StatusCodes.OK).json({ user: foundUser });
};

module.exports = {userProfile}