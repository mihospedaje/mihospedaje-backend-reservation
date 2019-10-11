'use strict';

const express = require('express');
const Reservation = require('../controllers/v1/reservation');
const { wrapper } = require('../middleware/error');
const { check, validationResult } = require('express-validator');

module.exports = function (app) {
    app.get('/api/v1/reservation', (req, res) => {
        Reservation.getreservation((err, data) => {
            res.status(200).json(data);
        });
    });
    app.get('/api/v1/reservation/:reservation_id', (req, res) => {
        const reservationData = {
            reservation_id: parseInt(req.params.reservation_id)};
            Reservation.getreservationcode(reservationData,(err, data) => {
            res.status(200).json(data);
        });
    });
    app.post('/api/v1/reservation',[ 
        check('guest_adult_number').isNumeric(),
        check('guest_children_number').isNumeric()],
         (req, res) => {
        const reservationData = {
            reservation_id: null,
            user_id: req.body.user_id,
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            guest_adult_number: req.body.guest_adult_number,
            guest_children_number: req.body.guest_children_number,
            is_cancel:req.body.is_cancel,
            //created_at: new Date(),
            //updated_at: new Date(),
        };
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
        Reservation.insertReservation(reservationData, (err, data) => {
            if (data && data.insertId) {
                res.json({
                    success: true,
                    data: reservationData
                })
            } else {
                res.status(500).json({
                    success: false,
                    data: data.message
                })
            }
        })
    });

    app.put('/api/v1/reservation/:reservation_id',[ 
        check('guest_adult_number').isNumeric(),
        check('guest_children_number').isNumeric()],
         (req, res) => {
        const reservationData = {
            reservation_id: parseInt(req.params.reservation_id),
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            guest_adult_number: req.body.guest_adult_number,
            guest_children_number: req.body.guest_children_number,
            is_cancel: req.body.is_cancel,
            
           // created_at: new Date(),
           // updated_at: new Date()
        };

        Reservation.updateReservation(reservationData, (err, data) => {
            if (data && data.message) {
                res.json({
                    success: true,
                    data: reservationData
                })
            } else {
                res.status(500).json({
                    success: false,
                    msg: 'Error'
                })
            }
        })
    });

}