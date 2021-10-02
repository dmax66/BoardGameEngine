DROP USER game_engine_user;

CREATE USER game_engine_user@localhost IDENTIFIED BY '3etomerG';

CREATE DATABASE game_engine;

GRANT CREATE, DROP, ALTER, DELETE, INSERT, SELECT, UPDATE, INDEX, REFERENCES ON game_engine.* TO game_engine_user@localhost;

FLUSH PRIVILEGES;
