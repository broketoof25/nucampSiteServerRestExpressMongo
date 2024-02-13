//define mongoose schema and model for all documents

const mongoose = require('mongoose')
//create shorthand for referring to mongoose.Schema
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose)
const Currency = mongoose.Types.Currency;

const commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }

}, {
    timestamps: true

})
//create Schema.  first arg(required) contains definition for Schema.
//second optional arg is used for setting various options
const campsiteSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    elevation: {
        type: Number, 
        required: true
    },
    cost: {
        type: Currency,
        required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default: false
    },
    //adding commentSchema as a subdocument
    //storing commentSchema in [] will allow each campsiteSchema to hold
    //multiple comments stored in array
    comments: [commentSchema]
}, {
    //optional, gives 2 properties that mongoose manages of
    //created at and updated at to each document
    timestamps: true
});

//Next we create a Model using the Schema
//this model will be used to instantiate Documents for MongoDB
const Campsite = mongoose.model('Campsite', campsiteSchema)

module.exports = Campsite;