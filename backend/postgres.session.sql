CREATE TABLE todos_uncompleted (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    todo_id INT,
    FOREIGN KEY (todo_id) REFERENCES users (id),
    time TIMESTAMP DEFAULT current_timestamp
);