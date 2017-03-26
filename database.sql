CREATE TABLE todo(
	id SERIAL PRIMARY KEY,
	task VARCHAR (1000) NOT NULL,
	complete VARCHAR (100) NOT NULL
);

INSERT INTO todo (task, complete) VALUES ('create', 2010-01-01 );
INSERT INTO todo (task, complete) VALUES ('add', 2011-01-01);
INSERT INTO todo (task, complete) VALUES ('select', 2012-01-01);
INSERT INTO todo (task, complete) VALUES ('enter', 2013-01-01);
INSERT INTO todo (task, complete) VALUES ('mark', 2014-01-01);
INSERT INTO todo (task, complete) VALUES ('delete', 2015-01-01);
