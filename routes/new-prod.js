var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const {Product} = require('../models');

router.post('/', function (req, res, next) {
    body('name', 'Empty name').trim().isLength({ min: 1 }).escape();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('new-prod', { title: 'WJ9 Studios' });
    } else {
        let prodFile = {
            buffer: req.files[0].buffer, mimetype: req.files[0].mimetype,
            encoding: req.files[0].encoding
        }
        let prod = new Product(req.body);
        prod.file = prodFile
        prod.save()
        res.redirect('/');
    }
})
/* GET new product form */
router.get('/', function (req, res, next) {
    res.render('new-prod', { title: 'WJ9 Studios・New Product' })
});

module.exports = router;