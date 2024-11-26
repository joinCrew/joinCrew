CREATE TABLE users (
  id int PRIMARY KEY AUTO_INCREMENT,
  email varchar(255),
  password varchar(255)
);

CREATE TABLE events (
  id int PRIMARY KEY AUTO_INCREMENT,
  leader_id int,
  title varchar(255),
  descript varchar(2000),
  max_members int,
  location varchar(200),
  gender varchar(30),
  ages varchar(30),
  event_date DATETIME
);

CREATE TABLE eventMember (
  id int PRIMARY KEY AUTO_INCREMENT,
  user_id int,
  event_id int
);

ALTER TABLE eventMember ADD FOREIGN KEY (`event_id`) REFERENCES events (`id`);

ALTER TABLE eventMember ADD FOREIGN KEY (`user_id`) REFERENCES users (`id`);
