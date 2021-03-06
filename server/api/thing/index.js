'use strict';

var express = require('express');
var controller = require('./thing.controller');

var router = express.Router();

router.get('/user/:id', controller.index);
router.get('/:id', controller.show);
router.post('/create', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
