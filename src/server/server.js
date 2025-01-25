const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const path = require("path");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 8000;
const origin = 3000;

const buildPath = path.join(__dirname, '../../build');

app.use(express.static(buildPath));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(cookieParser());

app.use((req, res, next) => {
    req.userId = req.cookies.userId;
    next();
})

app.use(cors({
    origin: `http://localhost:${origin}`,
    preflightContinue: true,
    credentials: true,
}))

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let todos = [];

module.exports = todos

const createPostResponse = (statusCode, messages, data) => {
    return {
        statusCode,
        messages,
        data
    }
}

const createPutResponse = (statusCode, messages, data) => {
    return {
        statusCode,
        messages,
        data
    }
}

const createDeleteResponse = (statusCode, messages, data) => {
    return {
        statusCode,
        messages,
        data
    }
}

app.post('/todos', (req, res) => {
    let userTodos = todos.filter(todo => todo.userId === req.userId)
    const newTodo = {
        id: userTodos.length,
        header: req.body.header,
        description: req.body.description,
        completed: false,
        userId: req.userId
    }
    todos = [...todos, newTodo]
    userTodos = [...userTodos, newTodo]
    res.send(createPostResponse(0, [], {
        todo: {
            id: newTodo.id,
            header: newTodo.header,
            description: newTodo.description,
            completed: false
        },
        todosCount: userTodos.length
    }))
})

app.put('/todos', (req, res) => {
    let userTodos = todos.filter(todo => todo.userId === req.userId)
    if (req.body.type === 'remove') {
        const taskToDelete = todos.find(todo => todo.userId === req.userId && todo.id === req.body.id)
        todos = todos.filter(todo => todo !== taskToDelete)
        userTodos = userTodos.filter(todo => todo.id !== req.body.id)
        for (let i = req.body.id; i < userTodos.length; i++) {
            userTodos[i].id = i
        }
        res.send(createDeleteResponse(0, [], {
            todos: userTodos,
            todosCount: userTodos.length
        }))
    } else if (req.body.type === 'edit') {
        userTodos[req.body.id].header = req.body.header
        userTodos[req.body.id].description = req.body.description
        res.send(createPutResponse(0, [], userTodos[req.body.id]))
    } else if (req.body.type === 'complete') {
        userTodos[req.body.id].completed = !userTodos[req.body.id].completed
        res.send(createPutResponse(0, [], {
            id: req.body.id,
            completed: userTodos[req.body.id].completed
        }))
    }

})

app.get('/todos', (req, res) => {
    const searchParams = req.query.searchParams
    const userTodos = todos.filter(todo => todo.userId === req.userId)
    const requestedTodos = searchParams ?
        userTodos.filter(todo => todo.header.includes(searchParams)
            || todo.description.includes(searchParams))
        : userTodos
    res.send({
        todos: requestedTodos,
        todosCount: requestedTodos.length
    })
})

app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

require('./routes/index')(app);

app.listen(port, () => {
    console.log('Server is up and running');
})
