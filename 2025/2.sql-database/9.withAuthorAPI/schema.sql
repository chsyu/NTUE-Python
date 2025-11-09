
CREATE TABLE authors (
	id INTEGER NOT NULL, 
	name VARCHAR(100) NOT NULL, 
	email VARCHAR(255) NOT NULL, 
	PRIMARY KEY (id), 
	UNIQUE (email)
)

;


CREATE TABLE posts (
	id INTEGER NOT NULL, 
	slug VARCHAR(200) NOT NULL, 
	title VARCHAR(255) NOT NULL, 
	content TEXT NOT NULL, 
	likes INTEGER NOT NULL, 
	author_id INTEGER NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(author_id) REFERENCES authors (id)
)

;


CREATE TABLE comments (
	id INTEGER NOT NULL, 
	content TEXT NOT NULL, 
	post_id INTEGER NOT NULL, 
	author_id INTEGER NOT NULL, 
	PRIMARY KEY (id), 
	FOREIGN KEY(post_id) REFERENCES posts (id), 
	FOREIGN KEY(author_id) REFERENCES authors (id)
)

;

