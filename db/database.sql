CREATE DATABASE IF NOT EXISTS reservations;

USE reservations;

CREATE TABLE IF NOT EXISTS reservation(

reservation_id int(10) NOT NULL auto_increment primary key,
user_id int(10) NOT NULL,
lodging_id int(10) NOT NULL,
start_date date not null,
end_date date not null,
guest_adult_number int(4) not null,
guest_children_number int(4) not null,
is_cancel boolean not null,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
)ENGINE=InnoDB DEFAULT CHARACTER SET = utf8;

Describe reservation;
ALTER USER 'mysql'@'%' IDENTIFIED WITH mysql_native_password BY '1234';
FLUSH PRIVILEGES; 
