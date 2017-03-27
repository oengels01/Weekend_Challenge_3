CREATE TABLE tasks(
	id SERIAL PRIMARY KEY,
	task VARCHAR (1000) NOT NULL,
	complete BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO tasks (task) VALUES ('create');
INSERT INTO tasks (task)  VALUES ('add');
INSERT INTO tasks(task)   VALUES ('select');
INSERT INTO tasks (task)  VALUES ('enter');
INSERT INTO tasks (task)  VALUES ('mark');
INSERT INTO tasks (task)  VALUES ('delete');
