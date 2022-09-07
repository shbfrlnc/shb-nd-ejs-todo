// script ini untuk routes

// import module express
const express = require('express');

// import model todo
const ToDo = require('../models/todo');

// buat router nya
const router = express.Router();

// handle request "/"
router.get('/', async (req, res, next) => {
    // dengan async await, list semua todo
    const todos = await ToDo.find({});

    // masukkan data todos ke view yang bernama index.ejs
    res.render('index', {
        results: todos
    })
});

// handle request "/add"
router.post('/add', async (req, res, next) => {
    // bongkar request body menjadi title dan description. ini sesuai dengan value dari attribute name di ejs.
    const { title, description } = req.body;

    // buat todo baru dengan data barusan
    let todo = new ToDo({
        title: title,
        description: description
    });

    // simpan ke database
    await todo.save();

    // redirect ke home
    res.redirect('/');
});

// handle request  "/edit"
router.post('/edit', async (req, res, next) => {
    // bongkar request body menjadi id, title, dan description. ini sesuai dengan value dari attribute name di ejs.
    const { id, title, description } = req.body;

    // update where _id = id set title dan desciption dengan data barusan
    await ToDo.updateOne({
        _id: id
    }, {
        $set: {
            title: title,
            description: description
        }
    })

    // redirect ke homepage
    res.redirect('/');
});

// handle request "/delete/<id-nya>"
router.get('/delete/:id', async (req, res, next) => {
    // delete where _id = req.params.id yang dilewatkan dari :id
    await ToDo.deleteOne({
        _id: req.params.id
    });

    // redirect ke homepage
    res.redirect('/');
});

module.exports = router;