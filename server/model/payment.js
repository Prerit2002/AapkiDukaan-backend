const Mongoose = require('mongoose')
const Seller = require('./seller')
const Payments = new Mongoose.Schema({
    TxId : {
        type: String,
        required: true
    },
    TxDate : {
        type : String,
        required: true
    },
    BillId : {
        type : String,
        required : true
    }
})
const Payment = new Mongoose.Schema({
    SellerId : [Payments]
},
{
    collection : 'Payments'
})

Payments.virtual('sellerId', {
    ref: 'Seller',
    localField: '_id',
    foreignField: '_id'
})

const Pricing = Mongoose.model("Pricing", Payment);

module.exports = Pricing;