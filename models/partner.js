const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//Defining the Schema
const partnerSchema = new Schema({
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
        default: false
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

//Creating the Model
const Partner = mongoose.model('Partner', partnerSchema)

//Exporting the Model
module.exports = Partner;