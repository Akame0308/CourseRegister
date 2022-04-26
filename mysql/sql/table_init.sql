use OnlineCourseRegisterSystem;
CREATE TABLE `Teacher` (
    `teacher_id` INT PRIMARY KEY,
    `teacher_name` VARCHAR (20),
    `department_id` INT,
    `gender` VARCHAR (10),
    `mailbox` VARCHAR (100)
);

INSERT INTO `Teacher` VALUES(3750, '許懷中', 1, 'male', 'hjhsu@mail.fcu.edu.tw');
INSERT INTO `Teacher` VALUES(3768, '劉明機', 1, 'male', 'mingcliu@fcu.edu.tw');
INSERT INTO `Teacher` VALUES(3767, '李榮三', 1, 'male', 'leejs@fcu.edu.tw');
INSERT INTO `Teacher` VALUES(3761, '林峰正', 1, 'male', 'fclin@fcu.edu.tw');
INSERT INTO `Teacher` VALUES(3749, '林佩君', 1, 'female', 'peiclin@fcu.edu.tw');
INSERT INTO `Teacher` VALUES(3765, '劉宗杰', 1, 'male', 'tjliu@fcu.edu.tw');
INSERT INTO `Teacher` VALUES(5070, '馬仕信', 7, 'male', 'shma@fcu.edu.tw');
INSERT INTO `Teacher` VALUES(5670, '戴瑞坤', 8, 'male', 'rktai@fcu.edu.tw');
INSERT INTO `Teacher` VALUES(2137, '黃煇慶', 8, 'male', 'cheeny@ms6.hinet.net');
INSERT INTO `Teacher` VALUES(5667, '張志相', 8, 'male', 'cschang@fcu.edu.tw');
INSERT INTO `Teacher` VALUES(5630, '王志宇', 8, 'male', 'wangcy@fcu.edu.tw');
INSERT INTO `Teacher` VALUES(3746, '陳德生', 1, 'male', 'dschen@fcu.edu.tw');
INSERT INTO `Teacher` VALUES(5125, '黃同瑤', 9, 'female', 'huangty@fcu.edu.tw');



CREATE TABLE `Department` (
    `department_id` INT PRIMARY KEY,
    `department_name` VARCHAR (500)
);

INSERT INTO `Department` VALUES(1, '資訊工程學系');
INSERT INTO `Department` VALUES(2, '電機工程學系');
INSERT INTO `Department` VALUES(3, '電子工程學系');
INSERT INTO `Department` VALUES(4, '自動控制工程學系');
INSERT INTO `Department` VALUES(5, '資訊電機學院學士班');
INSERT INTO `Department` VALUES(6, '通訊工程學系');
INSERT INTO `Department` VALUES(7, '光電科學與工程學系');
INSERT INTO `Department` VALUES(8, '通識中心');
INSERT INTO `Department` VALUES(9, '應用數學學系');



CREATE TABLE `Course` (
    `course_id` VARCHAR (500) PRIMARY KEY,
    `course_name` VARCHAR (500),
    `department_id` INT,
    `required` VARCHAR (500),
    `credit` INT, 
    `description` VARCHAR (500)
);


INSERT INTO `Course` VALUES ('IECS322', '資料庫系統', 1, 'yes', 3, 'Introduction of database system');
INSERT INTO `Course` VALUES ('IECS241', '互聯網路', 1, 'no', 3, 'Introduction of network system');
INSERT INTO `Course` VALUES ('IECS108', '程式設計(III)', 1, 'yes', 4, 'Introduction of programming 3');
INSERT INTO `Course` VALUES ('IECS109', '程式設計(IV)', 1, 'yes', 4, 'Introduction of programming 4');
INSERT INTO `Course` VALUES ('CIEE105', '線性代數', 3, 'yes', 3, 'Introduction of linear algebra');
INSERT INTO `Course` VALUES ('MATH106', '微積分(二)', 9, 'yes', 3, 'Introduction of Calclus');
INSERT INTO `Course` VALUES ('CIEE111', '普通物理-電、磁、光實驗', 3, 'yes', 3, 'Introduction of physcial');
INSERT INTO `Course` VALUES ('CIEE106', '邏輯設計', 3, 'yes', 3, 'Introduction of logical');
INSERT INTO `Course` VALUES ('GHUC201', '中國文物欣賞', 8, 'no', 2, 'Introduction of China');
INSERT INTO `Course` VALUES ('GHUC205', '日本歷史與文化', 8, 'no', 2, 'Introduction of Japan');
INSERT INTO `Course` VALUES ('GHUR302', '台灣民間信仰', 8, 'no', 2, 'Introduction of Taiwan');


CREATE TABLE `Course_Instance` (
    `course_instance_id` INT PRIMARY KEY,
    `course_id` VARCHAR (500),
    `teacher_id` INT,
    `max_people` INT,
    `now_people` INT
);


INSERT INTO `Course_Instance` VALUES (1248, 'IECS322', 3750, 75, 0);
INSERT INTO `Course_Instance` VALUES (1260, 'IECS241', 3765, 75, 0);
INSERT INTO `Course_Instance` VALUES (1222, 'IECS108', 3768, 80, 0);
INSERT INTO `Course_Instance` VALUES (1223, 'IECS109', 3768, 80, 0);
INSERT INTO `Course_Instance` VALUES (1227, 'CIEE105', 3761, 80, 0);
INSERT INTO `Course_Instance` VALUES (1224, 'CIEE111', 5070, 72, 0);
INSERT INTO `Course_Instance` VALUES (1218, 'CIEE106', 3746, 78, 0);
INSERT INTO `Course_Instance` VALUES (2767, 'GHUC201', 5670, 70, 0);
INSERT INTO `Course_Instance` VALUES (2774, 'GHUC205', 2137, 79, 0);
INSERT INTO `Course_Instance` VALUES (2779, 'GHUR302', 5667, 72, 0);
INSERT INTO `Course_Instance` VALUES (2780, 'GHUR302', 5630, 72, 0);
INSERT INTO `Course_Instance` VALUES (1226, 'MATH106', 5125, 72, 0);

CREATE TABLE `Selected_Course` (
    `student_id` VARCHAR (500),
    `course_instance_id` INT,
    PRIMARY KEY(`student_id`, `course_instance_id`)
);

INSERT INTO `Selected_Course` VALUES ('D0901234', 1248);

CREATE TABLE `Sections` (
    `course_instance_id` INT,
    `section` INT,
    PRIMARY KEY(`course_instance_id`, `section`)
);

INSERT INTO `Sections` VALUES (1248, 104);
INSERT INTO `Sections` VALUES (1248, 406);
INSERT INTO `Sections` VALUES (1248, 407);
INSERT INTO `Sections` VALUES (1260, 106);
INSERT INTO `Sections` VALUES (1260, 107);
INSERT INTO `Sections` VALUES (1260, 108);
INSERT INTO `Sections` VALUES (1222, 308);
INSERT INTO `Sections` VALUES (1222, 309);
INSERT INTO `Sections` VALUES (1222, 401);
INSERT INTO `Sections` VALUES (1222, 402);
INSERT INTO `Sections` VALUES (1222, 403);
INSERT INTO `Sections` VALUES (1222, 404);
INSERT INTO `Sections` VALUES (1227, 107);
INSERT INTO `Sections` VALUES (1227, 408);
INSERT INTO `Sections` VALUES (1227, 409);
INSERT INTO `Sections` VALUES (1224, 302);
INSERT INTO `Sections` VALUES (1224, 303);
INSERT INTO `Sections` VALUES (1224, 304);
INSERT INTO `Sections` VALUES (1218, 106);
INSERT INTO `Sections` VALUES (1218, 107);
INSERT INTO `Sections` VALUES (1218, 401);
INSERT INTO `Sections` VALUES (2767, 201);
INSERT INTO `Sections` VALUES (2767, 202);
INSERT INTO `Sections` VALUES (2774, 101);
INSERT INTO `Sections` VALUES (2774, 102);
INSERT INTO `Sections` VALUES (2779, 406);
INSERT INTO `Sections` VALUES (2779, 407);
INSERT INTO `Sections` VALUES (2780, 308);
INSERT INTO `Sections` VALUES (2780, 309);
INSERT INTO `Sections` VALUES (1226, 103);
INSERT INTO `Sections` VALUES (1226, 104);
INSERT INTO `Sections` VALUES (1226, 301);

CREATE TABLE `Student` (
    `student_id` VARCHAR(500) PRIMARY KEY,
    `student_name` VARCHAR(500),
    `class_id` INT,
    `gender` VARCHAR (500),
    `mailbox` VARCHAR (500),
    `address` VARCHAR (500),
    `credits` INT
);

INSERT INTO `Student` VALUES ('D0901234', 'Mark', 202, 'Male', 'example@gmail.com', '台中市台中區台中路1號', 0);
INSERT INTO `Student` VALUES ('D0901235', 'Jack', 201, 'Male', 'example1@gmail.com', '台中市台中區台中路2號', 10);


CREATE TABLE `Class` (
    `class_id` INT PRIMARY KEY,
    `class_name` VARCHAR (500),
    `department_id` INT,
    `building_id` INT
);

INSERT INTO `Class` VALUES (101, '資訊一甲', 1, 10);
INSERT INTO `Class` VALUES (102, '資訊一乙', 1, 10);
INSERT INTO `Class` VALUES (103, '資訊一丙', 1, 10);
INSERT INTO `Class` VALUES (201, '資訊二甲', 1, 10);
INSERT INTO `Class` VALUES (202, '資訊二乙', 1, 10);
INSERT INTO `Class` VALUES (203, '資訊二丙', 1, 10);
INSERT INTO `Class` VALUES (204, '資訊二丁', 1, 10);
INSERT INTO `Class` VALUES (301, '資訊三甲', 1, 10);
INSERT INTO `Class` VALUES (302, '資訊三乙', 1, 10);
INSERT INTO `Class` VALUES (303, '資訊三丙', 1, 10);
INSERT INTO `Class` VALUES (304, '資訊三丁', 1, 10);

CREATE TABLE `Building` (
    `building_id` INT PRIMARY KEY,
    `building_name` VARCHAR (500)
);

INSERT INTO `Building` VALUES(1, '學思樓');
INSERT INTO `Building` VALUES(2, '體育館');
INSERT INTO `Building` VALUES(3, '土木水利館');
INSERT INTO `Building` VALUES(4, '理學大樓');
INSERT INTO `Building` VALUES(5, '綜合運動場');
INSERT INTO `Building` VALUES(6, '育樂館');
INSERT INTO `Building` VALUES(7, '語文大樓');
INSERT INTO `Building` VALUES(8, '忠勤樓');
INSERT INTO `Building` VALUES(9, '工學樓');
INSERT INTO `Building` VALUES(10, '資訊電機學院');

-- ALTER TABLE `Teacher`
-- ADD FOREIGN KEY (`department_id`) REFERENCES `Department`(`department_id`) ON DELETE SET NULL;

-- ALTER TABLE `Course`
-- ADD FOREIGN KEY (`department_id`) REFERENCES `Department`(`department_id`) ON DELETE SET NULL;

-- ALTER TABLE `Course_Instance`
-- ADD FOREIGN KEY (`teacher_id`) REFERENCES `Teacher`(`teacher_id`) ON DELETE SET NULL;

-- ALTER TABLE `Course_Instance`
-- ADD FOREIGN KEY (`Course_Instance_id`) REFERENCES `Course`(`course_id`) ON DELETE SET NULL;

-- ALTER TABLE `Selected_Course`
-- ADD FOREIGN KEY (`course_list_id`) REFERENCES `Course_Instance`(`Course_Instance_id`) ON DELETE SET NULL;

-- ALTER TABLE `Selected_Course`
-- ADD FOREIGN KEY (`student_id`) REFERENCES `Student`(`student_id`) ON DELETE SET NULL;

-- ALTER TABLE `Student`
-- ADD FOREIGN KEY (`class_id`) REFERENCES `Class`(`class_id`) ON DELETE SET NULL;

-- ALTER TABLE `Class`
-- ADD FOREIGN KEY (`department_id`) REFERENCES `Department`(`department_id`) ON DELETE SET NULL;

-- ALTER TABLE `Class`
-- ADD FOREIGN KEY (`building_id`) REFERENCES `Building`(`building_id`) ON DELETE SET NULL;