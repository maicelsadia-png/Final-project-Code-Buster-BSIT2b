const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// IMPORTANT: These middleware MUST be before your routes
app.use(cors());
app.use(express.json());  // This parses JSON bodies
app.use(express.urlencoded({ extended: true }));  // This parses form data

// In-memory storage
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', phonenumber: '1234567890' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'admin', phonenumber: '0987654321' }
];
let nextId = 3;

// GET all users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// GET single user
app.get('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
});

// POST - Create new user
app.post('/api/users', (req, res) => {
    console.log('Request body received:', req.body);
    
    // Check if body exists
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ 
            message: 'Request body is empty. Please send JSON data with Content-Type: application/json' 
        });
    }
    
    const { name, email, role, phonenumber } = req.body;
    
    // Validate required fields
    if (!name || !email) {
        return res.status(400).json({ 
            message: 'Name and email are required fields' 
        });
    }
    
    const newUser = {
        id: nextId++,
        name: name,
        email: email,
        role: role || 'user',
        phonenumber: phonenumber || ''
    };
    
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT - Update user
app.put('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }
    
    const { name, email, role, phonenumber } = req.body;
    
    users[userIndex] = {
        ...users[userIndex],
        name: name || users[userIndex].name,
        email: email || users[userIndex].email,
        role: role || users[userIndex].role,
        phonenumber: phonenumber || users[userIndex].phonenumber
    };
    
    res.json(users[userIndex]);
});

// DELETE - Delete user
app.delete('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }
    
    users.splice(userIndex, 1);
    res.status(204).send();
});

// Test endpoints
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.get('/test', (req, res) => {
    res.json({ message: 'Server is working!' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`\n✅ Available endpoints:`);
    console.log(`   GET    http://localhost:${PORT}/api/users`);
    console.log(`   GET    http://localhost:${PORT}/api/users/:id`);
    console.log(`   POST   http://localhost:${PORT}/api/users`);
    console.log(`   PUT    http://localhost:${PORT}/api/users/:id`);
    console.log(`   DELETE http://localhost:${PORT}/api/users/:id`);
});
