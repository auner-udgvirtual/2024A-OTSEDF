const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require("cors");

var corsOptions = {
    origin: "http://localhost:5173"
};


const app = express();
const port = 3000;
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = new sqlite3.Database('database.db');

// Configurar la base de datos SQLite
db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS tutorials (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, published BOOLEAN)');
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


//SECTION - Endpoints

// Obtener todos los tutoriales
app.get('/api/tutorials', (req, res) => {
    db.all('SELECT * FROM tutorials', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ tutorials: rows });
    });
});

// Obtener un tutorial por ID
app.get('/api/tutorials/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM tutorials WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'Tutorial not found' });
        }
        res.json({ tutorial: row });
    });
});

// Agregar un nuevo tutorial
app.post('/api/tutorials', (req, res) => {
    const { title, description, published } = req.body;
    db.run('INSERT INTO tutorials (title, description, published) VALUES (?, ?, ?)', [title, description, published], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID });
    });
});

// Actualizar un tutorial por ID
app.put('/api/tutorials/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, published } = req.body;
    db.run('UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id = ?', [title, description, published, id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Tutorial updated successfully' });
    });
});

// Eliminar un tutorial por ID
app.delete('/api/tutorials/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM tutorials WHERE id = ?', [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Tutorial deleted successfully' });
    });
});

// Eliminar todos los tutoriales
app.delete('/api/tutorials', (req, res) => {
    db.run('DELETE FROM tutorials', (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'All tutorials deleted successfully' });
    });
});

// Buscar tutoriales por título
app.get('/api/tutorials', (req, res) => {
    const { title } = req.query;
    if (!title) {
        return res.status(400).json({ error: 'Title parameter is required for search' });
    }

    db.all('SELECT * FROM tutorials WHERE title LIKE ?', [`%${title}%`], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ tutorials: rows });
    });
});


//!SECTION