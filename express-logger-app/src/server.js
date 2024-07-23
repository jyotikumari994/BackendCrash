const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Setup the logger
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :date[clf] HTTP/:http-version', { stream: accessLogStream }));

// Routes
app.get('/', (req, res) => {
    res.status(200).send('Welcome to the Home Page');
});

app.get('/get-users', (req, res) => {
    res.status(200).send('Users list');
});

app.post('/add-user', (req, res) => {
    res.status(201).send('User added successfully');
});

app.put('/user/:id', (req, res) => {
    res.status(201).send(`User with ID ${req.params.id} updated successfully`);
});

app.delete('/user/:id', (req, res) => {
    res.send(`User with ID ${req.params.id} deleted successfully`);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
