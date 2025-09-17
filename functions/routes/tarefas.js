// routes/tarefas.js

const express = require('express');
const router = express.Router();

const tarefasController = require('../controllers/tarefasController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/:id', tarefasController.getTarefaById);

router.put('/:id', tarefasController.updateTarefa);

router.delete('/:id', tarefasController.deleteTarefa);

router.get('/', tarefasController.getAllTarefasDoUsuario);

module.exports = router;