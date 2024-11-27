const express = require('express');
const router = express.Router();

// Landing Page
router.get('/', (req, res) => {
    res.render('landing');
});

// Main Index Page
router.get('/index', (req, res) => {
    res.render('index');
});

module.exports = router;
