const pool = require('../db');
const express = require('express');
const router = express.Router();

router.post('/add/user', async (req, res) => {
    try {
        const { name } = req.body;
        const user = await pool.query("INSERT INTO users (name) VALUES ($1) RETURNING *", [name]);
        res.status(200).json(user.rows[0]);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/add/todo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const todo = await pool.query("INSERT INTO todos (description,todo_id) VALUES ($1, $2) RETURNING * ", [description, id]);
        res.status(200).json(todo.rows[0]);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Add completed todo
router.post('/add/complete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const todo = await pool.query("INSERT INTO todos_completed (description, todo_id) VALUES ($1, $2) RETURNING *", [description, id]);
        res.status(200).json(todo.rows[0]);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Add Uncompleted todo
router.post('/add/uncomplete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const todo = await pool.query("INSERT INTO todos_uncompleted (description, todo_id) VALUES ($1, $2) RETURNING *", [description, id]);
        res.status(200).json(todo.rows[0]);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Get todos
router.get('/', async (req, res) => {
    try {
        const todos = await pool.query("SELECT * FROM todos");
        res.status(200).json(todos.rows);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Get completed todos

router.get('/completed/tasks', async (req, res) => {
    try {
        const todos = await pool.query("SELECT * FROM todos_completed");
        res.status(200).json(todos.rows);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Get uncompleted todos
router.get('/uncompleted/tasks', async (req, res) => {
    try {
        const todos = await pool.query("SELECT * FROM todos_uncompleted");
        res.status(200).json(todos.rows);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Get users information
router.get('/users/', async (req, res) => {
    try {
        const users = await pool.query("SELECT * FROM users");
        res.status(200).json(users.rows);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Get single user to login
router.post('/user/login', async (req, res) => {
    try {
        const { name } = req.body;
        console.log(name);
        
        const user = await pool.query("SELECT * FROM users WHERE name = $1", [name]);
        if(user) 
            res.status(200).json(user.rows[0]);
        else
            res.status(404).json({message: "Access denied"});
    } catch (error) {
        res.status(500).json(error);
    }
});

// Delete Todo
router.delete('/delete/todo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await pool.query("DELETE FROM todos WHERE id = $1", [id]);
        res.status(200).json(deleted);
    } catch (error) {
        res.status(500).json(error);
    }
});

//Update todo
router.put('/update/todo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const descritpion = req.body.descritpion;
        const todo = await pool.query("UPDATE todos SET description = $1 WHERE todo_id = $2 RETURNING *", [descritpion, id]);
        res.status(200).json(todo); 
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;