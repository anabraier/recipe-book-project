const express = require('express');
const Recipe = require('../models/recipe');
const router = express.Router();

router.get('/', async (req, res) => {
    if (!req.session.user) return res.redirect('/auth/login');
    const recipes = await Recipe.find({ createdBy: req.session.user._id });
    res.render('recipes', { recipes });
});

router.get('/add', (req, res) => {
    if (!req.session.user) return res.redirect('/auth/login');
    res.render('add-recipe');
});

router.post('/add', async (req, res) => {
    if (!req.session.user) return res.redirect('/auth/login');
    const { title, ingredients, instructions } = req.body;
    const recipe = new Recipe({ title, ingredients, instructions, createdBy: req.session.user._id });
    await recipe.save();
    res.redirect('/recipes');
});

router.get('/edit/:id', async (req, res) => {
    if (!req.session.user) return res.redirect('/auth/login');
    const recipe = await Recipe.findById(req.params.id);
    res.render('edit-recipe', { recipe });
});

router.post('/edit/:id', async (req, res) => {
    const { title, ingredients, instructions } = req.body;
    await Recipe.findByIdAndUpdate(req.params.id, { title, ingredients, instructions });
    res.redirect('/recipes');
});

router.get('/delete/:id', async (req, res) => {
    await Recipe.findByIdAndDelete(req.params.id);
    res.redirect('/recipes');
});

module.exports = router;

