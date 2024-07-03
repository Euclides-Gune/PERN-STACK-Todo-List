 CREATE TABLE todos_uncompleted (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    todo_id INT,
    FOREIGN KEY (todo_id) REFERENCES users (id),
    time TIMESTAMP DEFAULT current_timestamp
); 

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(55),
    time TIMESTAMP DEFAULT current_timestamp
); 

/*DROP TABLE todos_completed; */
/*DROP TABLE todos;*/
/*DROP TABLE todos_uncompleted;*/
/* DROP TABLE users;*/