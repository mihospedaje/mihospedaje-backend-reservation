'use strict';

const express = require('express');
const Reservation = require('../controllers/v1/reservation');
const { wrapper } = require('../middleware/error');
const { check, validationResult } = require('express-validator/check');

module.exports = function (app) {
    app.get('/api/v1/reservation', (req, res) => {
        Reservation.getreservation((err, data) => {
            res.status(200).json(data);
        });
    });
    app.get('/api/v1/reservation/user/:userid', (req, res) => {
        console.log("params: ", req.params.userid);
            Reservation.getreservationByUser(req.params.userid, (err, data) => {
                if (err){
                    throw err
                }else{
                    res.status(200).json(data);
                }
            })
    });
    app.get('/api/v1/reservation/:reservation_id', (req, res) => {
        const reservationData = {
            reservation_id: parseInt(req.params.reservation_id)
        };
        Reservation.getreservationcode(reservationData, (err, data) => {
            res.status(200).json({
                reservation_id: data[0].reservation_id,
                user_id: data[0].user_id,
                lodging_id: data[0].lodging_id,
                start_date: data[0].start_date,
                end_date: data[0].end_date,
                guest_adult_number: data[0].guest_adult_number,
                guest_children_number: data[0].guest_children_number,
                is_cancel: data[0].is_cancel
            });
        });
    });
    app.post('/api/v1/reservation', /*[
        check('guest_adult_number').isNumeric(),
        check('guest_children_number').isNumeric()],*/
        (req, res) => {
            const reservationData = {
                reservation_id: null,
                user_id: req.body.user_id,
                lodging_id: req.body.lodging_id,
                start_date: req.body.start_date,
                end_date: req.body.end_date,
                guest_adult_number: req.body.guest_adult_number,
                guest_children_number: req.body.guest_children_number,
                is_cancel: req.body.is_cancel
                //created_at: new Date(),
                //updated_at: new Date(),
            };
            console.log(reservationData);
            Reservation.insertReservation(reservationData, (err, data) => {
                if (data && data.insertId) {
                    res.status(201).json({
                        reservation_id: data.insertId,
                        user_id: reservationData.user_id,
                        lodging_id: reservationData.lodging_id,
                        start_date: reservationData.start_date,
                        end_date: reservationData.end_date,
                        guest_adult_number: reservationData.guest_adult_number,
                        guest_children_number: reservationData.guest_children_number,
                        is_cancel: reservationData.is_cancel
                    })
                } else {
                    res.status(500).json({
                        success: false,
                        data: data.message
                    })
                }
            })

        });


    app.put('/api/v1/reservation/:reservation_id',
        /*check('guest_adult_number').isNumeric(),
        check('guest_children_number').isNumeric()],*/
        (req, res) => {
            const reservationData = {
                reservation_id: parseInt(req.params.reservation_id),
                user_id: req.body.user_id,
                lodging_id: req.body.lodging_id,
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
                    res.status(201).json({
                        reservation_id: reservationData.reservation_id,
                        user_id: reservationData.user_id,
                        lodging_id: reservationData.lodging_id,
                        start_date: reservationData.start_date,
                        end_date: reservationData.end_date,
                        guest_adult_number: reservationData.guest_adult_number,
                        guest_children_number: reservationData.guest_children_number,
                        is_cancel: reservationData.is_cancel
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
