const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    res.render('../views/index.ejs', { title:'HomePage' });
});

router.get('/users', (req,res)=>{
    res.send(String('All users'));
});

module.exports = router;