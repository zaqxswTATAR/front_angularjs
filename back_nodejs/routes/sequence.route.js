const express = require('express');
const sequenceRoute = express.Router();

// Sequence model
let SequenceModel = require('../models/Sequence');

// Get all data
sequenceRoute.route('/').get((req, res, next) => {
    SequenceModel.find((err, data) =>{
        if (err) {
            return next(err);
        } else {
            res.json(data);
        }
    })
})

// Create sequence data
sequenceRoute.route('/create-sequence').post((req, res, next) => {
    let a = req.body.num2 - req.body.num1;
    req.body.numX = req.body.num4 + (a * 4);
    req.body.numY = req.body.numX + (a * 5);
    req.body.numZ = req.body.numY + (a * 6);
    
    SequenceModel.create(req.body, (err, data) => {
        console.log(req.body)
        if (err) {
            return next(err);
        } else {
            res.json(data);
        }
    })
})

// Edit sequence data
sequenceRoute.route('/edit-sequence/:id').get((req, res, next) => {
    SequenceModel.findById(req.params.id, (err, data) => {
        if (err) {
            return next(err);
        } else {
            res.json(data);
        }
    })
})

// Update sequence data
sequenceRoute.route('/update-sequence/:id').put((req, res, next) => {
    let a = req.body.num2 - req.body.num1;
    req.body.numX = req.body.num4 + (a * 4);
    req.body.numY = req.body.numX + (a * 5);
    req.body.numZ = req.body.numY + (a * 6);

    SequenceModel.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (err, data) => {
        if (err) {
            return next(err);
        } else {
            res.json(data);
            console.log('Sequence successfully updated');
        }
    })
})

// Delete sequence data
sequenceRoute.route('/delete-sequence/:id').delete((req, res, next) => {
    SequenceModel.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            return next(err);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = sequenceRoute;