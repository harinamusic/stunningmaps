-- DROP TABLE IF EXISTS users CASCADE;
-- DROP TABLE IF EXISTS password_reset_codes;
-- DROP TABLE IF EXISTS friendships CASCADE;
DROP TABLE IF EXISTS chatmessages CASCADE;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first VARCHAR(255) NOT NULL,
    last VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    profile_pic VARCHAR(255),
    bio VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE password_reset_codes(
    id SERIAL PRIMARY KEY,
    email VARCHAR REFERENCES users(email),
    code VARCHAR(6),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE friendships( 
  id SERIAL PRIMARY KEY, 
  sender_id INT REFERENCES users(id) NOT NULL, 
  recipient_id INT REFERENCES users(id) NOT NULL, 
  accepted BOOLEAN DEFAULT false);


 CREATE TABLE chatmessages( 
  id SERIAL PRIMARY KEY, 
  message VARCHAR(400),
  sender_id INT REFERENCES users(id) NOT NULL, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 );