const express = require('express');
const Campsite = require('../models/campsite')
const campsiteRouter = express.Router();

campsiteRouter.route('/')
//next function the 3rd arg below is for error handling
.get((req, res, next) => {
    Campsite.find()
    //the above returns a PROMISE with value, so we can chain with 
    //.then and store the value in campsites
    .then(campsites => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        //.json(campsites) sends json data to client in response string
        //and automatically close response string so don't need res.end()
        res.json(campsites);
    })
    //using next(err) let's node deal with error handling
    .catch(err => next(err));
})
.post((req, res, next) => {
    //through the create method Mongoose will check to ensure the 
    //data is correct according to schema, like running it through
    //a model.
    Campsite.create(req.body)
    .then(campsite => {
        console.log('Campsite Created', campsite)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(campsite);
    })
    .catch(err => next(err));

})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites!');
})
.delete((req, res, next) => {
    Campsite.deleteMany()
    .then(response => {
        res.statusCode = 200,
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

campsiteRouter.route('/:campsiteId')
.get((req, res, next) => {
    Campsite.findById(req.params.campsiteId)
    .then(campsite => {
        res.statusCode = 200,
        res.setHeader('Content-Type', 'application/json');
        res.json(campsite);
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
})
.put((req, res, next) => {
    Campsite.findByIdAndUpdate(req.params.campsiteId, {
        $set: req.body
    }, { new: true })
    .then(campsite => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(campsite);
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    Campsite.findByIdAndDelete(req.params.campsiteId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = campsiteRouter;