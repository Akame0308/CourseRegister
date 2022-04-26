CREATE DATABASE `OnlineCourseRegisterSystem` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER DatabaseAdmin@'172.21.%' identified by '123456';
grant all PRIVILEGES on OnlineCourseRegisterSystem.* to DatabaseAdmin@'172.21.%' WITH GRANT OPTION;
flush privileges;
use OnlineCourseRegisterSystem;