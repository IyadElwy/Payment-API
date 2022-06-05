const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

////////////////////////////////////////////////////////////////////////
const axios = require('axios').default;
const stripe = require('stripe')(process.env.STRIPESECRETKEY);
////////////////////////////////////////////////////////////////////////


exports.getCheckoutSession = catchAsync(async (req, res, next) => {

    // 1) get cart
    let cart;
    try {
        cart = await axios.get(`http://localhost:${process.env.CARTPORT}/api/v1/cart/${req.params.id}`);

    } catch (e) {
        // return next(new AppError('Error occurred while creating payment.', 401));
        return next(new AppError(e, 401));
    }


    // 2) create checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: req.body.success_url,
        cancel_url: req.body.failure_url,
        line_items: [
            {
                name: `Cart: ${cart.data.data.data._id}`,
                amount: Math.round(cart.data.data.data.price * 100),
                currency: 'egp',
                quantity: 1

            }
        ],

    });

    // 3) Create session as response
    res.status(200).json({
        status: 'success',
        session
    });


});


////////////////////////////////////////////////////////////////////////



