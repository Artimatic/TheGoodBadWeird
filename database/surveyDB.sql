Show databases;
create database surveyappdb;
use surveyappdb;
create table if not exists users(id int AUTO_INCREMENT, accName varchar(16), passHash varchar(40), PRIMARY KEY (id));
create table if not exists userInfo(id int, fname varchar(20), lname varchar(20), privLvl int(1) DEFAULT 0, email varchar(40), PRIMARY KEY(id), FOREIGN KEY (id) REFERENCES users(id)); 
select sha1('Austin3:16');
insert into users (accName, passHash) values('admin', 'admin');
insert into users (accName, passHash) values
('StoneCold', '485ca4d7b3ddfb39d3e29b81d6ce5085073d7b7d'),
('duchess','password'),
('david','chan');
insert into userInfo (id, fname, lname, privlvl, email) values
(2,'Steve', 'Austin', 1, 'stonecold@stonecold.com'),
(3,'Sterling','Archer', 1, 'duchess@archer.com'),
(4,'David','Chan', 5, 'dchan@student.umass.edu');
insert into users (accName, passHash) values
('theGood', 'good'),
('theBad','bad'),
('theWeird','weird');
create table if not exists surveys(sid int AUTO_INCREMENT, sname text(185), instructions text, PRIMARY KEY (sid));
create table if not exists surveyQuestions(qid int AUTO_INCREMENT, sid int, questions_hash text, PRIMARY KEY(qid), FOREIGN KEY(sid) references surveys(sid));
create table if not exists surveyAnswers(answer_id int AUTO_INCREMENT, qid int, answers_hash text, date_submitted datetime, PRIMARY KEY(answer_id), FOREIGN KEY(qid) references surveyQuestions(qid));
create table if not exists user_competed_surveys(id int, answer_id int, sid int, FOREIGN KEY(id) references users(id), FOREIGN KEY(answer_id) references surveyAnswers(answer_id), FOREIGN KEY(sid) references surveys(sid));
create table if not exists user_surveys_in_session(id int, answer_id int, sid int, FOREIGN KEY(id) references users(id), FOREIGN KEY(answer_id) references surveyAnswers(answer_id), FOREIGN KEY(sid) references surveys(sid));

create table if not exists user_answers(user_id int auto_increment, user_name varchar(20), student boolean, ans1 varchar(2), ans2 varchar(2), ans3 varchar(2), ans4 varchar(2), ans5 varchar(2), PRIMARY KEY(user_id));
insert into user_answers (user_name, student, ans1, ans2, ans3, ans4, ans5) values
('anon', true, 'a1', 'a1','a1','a1','a1'),
('anon', true, 'a2', 'a2','a2','a2','a2');

