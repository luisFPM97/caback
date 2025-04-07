const { getAll, create, getOne, remove, update } = require('../controllers/caso');
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const routerCaso = express.Router();

routerCaso.route('/coasos')
    .get(authMiddleware,getAll)
    .post(authMiddleware,create);

routerCaso.route('/coasos/:id')
    .get(authMiddleware, getOne)
    .delete(authMiddleware, remove)
    .put(authMiddleware, update);

module.exports = routerCaso;