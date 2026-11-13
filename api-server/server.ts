import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();

app.use(express.json());


const filePath = path.join(
    process.cwd(),
    'testData',
    'users.json'
);

function readUsers() {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function saveUsers(users: any[]) {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

// GET
app.get('/users', (req, res) => {
    res.json(readUsers());
});

// GET by ID
app.get('/users/:id', (req, res) => {
    const users = readUsers();
    const user = users.find((u: any) => u.id === Number(req.params.id));

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
});

// POST
app.post('/users', (req, res) => {
    const users = readUsers();

    const newUser = {
        id: users.length ? Math.max(...users.map((u: any) => u.id)) + 1 : 1,
        ...req.body
    };

    users.push(newUser);
    saveUsers(users);

    res.status(201).json(newUser);
});

// PUT
app.put('/users/:id', (req, res) => {
    const users = readUsers();
    const index = users.findIndex((u: any) => u.id === Number(req.params.id));

    if (index === -1) return res.status(404).json({ message: 'User not found' });

    users[index] = { id: Number(req.params.id), ...req.body };
    saveUsers(users);

    res.json(users[index]);
});

// DELETE
app.delete('/users/:id', (req, res) => {
    const users = readUsers();
    const filteredUsers = users.filter((u: any) => u.id !== Number(req.params.id));

    if (users.length === filteredUsers.length) {
        return res.status(404).json({ message: 'User not found' });
    }

    saveUsers(filteredUsers);

    res.status(204).send();
});

app.listen(3000, () => {
    console.log('API Server running at http://localhost:3000');
});