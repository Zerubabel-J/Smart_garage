CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `job` varchar (255) NOT NULL,
  `password` varchar (255) NOT NULL,
  PRIMARY KEY (user_id),
  UNIQUE (user_email)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `user_info` (
  `info` varchar(255) NOT NULL,
  `info_source` varchar(255) NOT NULL

) ENGINE=InnoDB;

-- Insert sample data into the users table
INSERT INTO `users` (`user_name`, `user_email`, `job`, `password`)
VALUES 
('zeru', 'zeru@example.com', 'Software Engineer', 'password123'),
('sam', 'sam@example.com', 'Data Scientist', 'password456');

-- Insert sample data into the user_info table
INSERT INTO `user_info` (`info`, `info_source`)
VALUES 
('Info 1', 'Source A'),
('Info 2', 'Source B');
