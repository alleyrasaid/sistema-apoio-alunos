const express = require('express');
const router = express.Router();

const disciplinasController = require('../controllers/disciplinasController');
const tarefasController = require('../controllers/tarefasController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', disciplinasController.createDisciplina);
router.get('/', disciplinasController.getDisciplinasDoUsuario);
router.put('/:id', disciplinasController.updateDisciplina);
router.delete('/:id', disciplinasController.deleteDisciplina);

router.post('/:disciplinaId/tarefas', tarefasController.createTarefa);
router.get('/:disciplinaId/tarefas', tarefasController.getTarefasDaDisciplina);

module.exports = router;