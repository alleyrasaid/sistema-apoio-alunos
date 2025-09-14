// routes/tarefas.js

const express = require('express');
const router = express.Router();

const tarefasController = require('../controllers/tarefasController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.put('/:id', tarefasController.updateTarefa);

router.delete('/:id', tarefasController.deleteTarefa);

module.exports = router;