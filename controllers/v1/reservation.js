const mysql = require('mysql');


connection = mysql.createConnection({
    host            : process.env.DATABASE_HOST,
    port            : process.env.MYSQL_PORT,
    user            : process.env.MYSQL_USER,
    password        : process.env.MYSQL_PASSWORD,
    database        : process.env.MYSQL_DATABASE
    /**host: 'localhost',
    user: 'root',
    password: 'Estiven0402+',
    database: 'reservations'**/
});

let ReservationModel = {};
ReservationModel.getreservation = (callback) => {
    if (connection) {
        connection.query(
            'SELECT * FROM reservation ORDER BY reservation_id',
            (err, rows) => {
                if (err) {
                    throw err
                } else {
                    callback(null, rows)
                }
            }
        )
    }
}

ReservationModel.getreservationcode = (reservationData,callback) => {
    if (connection) {
        connection.query(
            'SELECT * FROM reservation where reservation_id=?',reservationData.reservation_id,
            (err, rows) => {
                if (err) {
                    throw err
                } else {
                    callback(null, rows)
                }
            }
        )
    }
}
ReservationModel.insertReservation = (reservationData, callback) => {
    if (connection) {
        
        connection.query(
            'INSERT INTO reservation SET ?', reservationData,
            (err, result) => {
                if (err) {
                    throw err
                } else {
                    callback(null, {
                        'insertId': result.insertId
                    })
                }
            }
        )}}

ReservationModel.updateReservation = (reservationData, callback) => {
    if (connection) {
        const sql = `
        UPDATE reservation SET 
		start_date = ${connection.escape(reservationData.start_date)},
		end_date= ${connection.escape(reservationData.end_date)},
		guest_adult_number = ${connection.escape(reservationData.guest_adult_number)},
		guest_children_number= ${connection.escape(reservationData.guest_children_number)},
		is_cancel = ${connection.escape(reservationData.is_cancel)}
        
        WHERE reservation_id = ${connection.escape(reservationData.reservation_id)}`;

        connection.query(sql, (err, result) => {
            if (err) {
                throw err
            } else {
                callback(null, {
                    "message": "success"
                })
            }
        })
    };
}


module.exports = ReservationModel; 