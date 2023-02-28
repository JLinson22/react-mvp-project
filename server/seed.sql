DELETE FROM todos;
DROP TABLE IF EXISTS todos;

CREATE TABLE todos (
    id serial,
    content text,
    completed boolean
);

INSERT INTO todos (content, completed) VALUES ('Do the dishes', false);
INSERT INTO todos (content, completed) VALUES ('Take out the trash', false);
INSERT INTO todos (content, completed) VALUES ('Grocery shopping', false);
INSERT INTO todos (content, completed) VALUES ('Clean windows', false);