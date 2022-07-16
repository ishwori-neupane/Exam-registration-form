CREATE DATABASE IF NOT EXISTS www;
USE www;
CREATE TABLE users ( 
	id int AUTO_INCREMENT,
	username varchar(20),
	fullname varchar(20),
	password varchar(128),
	PRIMARY KEY (id)
);

CREATE TABLE users (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(100) ,
    last_name VARCHAR(100) ,
      email VARCHAR(100) UNIQUE,
      phone BIGINT, password varchar(200),
      confirmedPassword varchar(200),
      Exam_Roll_number bigint UNIQUE,
      PU_Registration_num bigint UNIQUE,
      level int, Program varchar(20),
      Semester int, year YEAR_MONTH,
     tinyint status DEFAULT(active)
	 ) 
	 CREATE TABLE users (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(100) ,
  last_name VARCHAR(100) ,
    email VARCHAR(100) UNIQUE,
    phone BIGINT UNIQUE, password varchar(200),
    confirmedPassword varchar(200),
    Exam_Roll_number bigint UNIQUE,
    PU_Registration_num bigint UNIQUE,
    level int, Program varchar(20),
    Semester int, year date,
    status tinyint  DEFAULT(active));
INSERT INTO `users`(`id`, `first_name`, `last_name`, `email`, `phone`, `password`, `confirmedPassword`, `Exam_Roll_number`, `PU_Registration_num`, `level`, `Program`, `Semester`, `year`, `status`) VALUES ('1','ishwori','neupane','ishworineupane@gmail.com','[value-5]','[value-6]','[value-7]','[value-8]','[value-9]','[value-10]','[value-11]','[value-12]','[value-13]','[value-14]')

INSERT INTO `users`(`id`, `first_name`, `last_name`, `email`, `phone`, `password`, `confirmedPassword`, `Exam_Roll_number`, `PU_Registration_num`, `level`, `Program`, `Semester`, `year`, `status`) VALUES (1,'ishwori','neupane','ishworineupane@gmail.com',9841957300,'ishwori@12','ishwori@12',20120073,1234567100,4,'BEIT',4, 2019)