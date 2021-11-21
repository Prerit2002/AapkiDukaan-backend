const mongoose = require('mongoose')
const PricingSchema = new Mongoose.Schema({
    Name : {
        type: String,
        required: true
    },
    Commission : {
        type: Number,
        required: true
    }
},
{
    collection : 'Pricing'
})

const Pricing = mongoose.model("Pricing", PricingSchema);

module.exports = Pricing;