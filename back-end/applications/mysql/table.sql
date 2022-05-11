CREATE TABLE Users (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(255),
  password varchar(255),
  displayName varchar(255),
  PRIMARY KEY (id)
);

CREATE TABLE RefreshTokens (
  id int NOT NULL AUTO_INCREMENT,
  userId int,
  refreshToken varchar(1000),
  PRIMARY KEY (id)
);
