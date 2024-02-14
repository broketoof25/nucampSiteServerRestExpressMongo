const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//For dealing with currency in DB
require('mongoose-currency').loadType(mongoose)
const Currency = mongoose.Types.Currency;

//Defining the Schema
const promotionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: true
    },
    cost: {
        type: Currency,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

//Creating the Model
const Promotion = mongoose.model('Promotion', promotionSchema)

//Exporting the Model
module.exports = Promotion;