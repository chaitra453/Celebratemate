const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/celebratemate')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Define schema and model for reminders
const reminderSchema = new mongoose.Schema({
    eventType: String,
    name: String,
    eventDate: Date,
    email: String,
    phone: String
});

const Reminder = mongoose.model('Reminder', reminderSchema);

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

// Routes
app.post('/reminders', async (req, res) => {
    try {
        const reminder = new Reminder(req.body);
        await reminder.save();
        res.status(201).send('Reminder set successfully!');
    } catch (err) {
        res.status(400).send(err);
    }
});

app.get('/reminders', async (req, res) => {
    try {
        const reminders = await Reminder.find();
        res.json(reminders);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
