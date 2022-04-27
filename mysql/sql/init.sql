CREATE DATABASE `OnlineCourseRegisterSystem` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER DatabaseAdmin@'%' identified by '123456';
grant all PRIVILEGES on *.* to DatabaseAdmin@'%' WITH GRANT OPTION;
flush privileges;
use OnlineCourseRegisterSystem;