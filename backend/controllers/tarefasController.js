const admin = require('firebase-admin');
const db = admin.firestore();

exports.createTarefa = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { disciplinaId } = req.params;
    const { descricao, dataEntrega } = req.body;

    if (!descricao) {
      return res.status(400).json({ message: 'A descrição da tarefa é obrigatória.' });
    }

    const disciplinaRef = db.collection('disciplinas').doc(disciplinaId);
    const doc = await disciplinaRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'Disciplina não encontrada.' });
    }
    if (doc.data().userId !== userId) {
      return res.status(403).json({ message: 'Acesso negado. Você não pode adicionar tarefas a esta disciplina.' });
    }

    const novaTarefa = {
      userId,
      disciplinaId,
      descricao,
      dataEntrega: dataEntrega || null, // Permite que a data seja opcional
      concluida: false,
      criadoEm: new Date().toISOString()
    };

    const tarefaRef = await db.collection('tarefas').add(novaTarefa);
    res.status(201).json({ id: tarefaRef.id, ...novaTarefa });

  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
  }
};

exports.getTarefasDaDisciplina = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { disciplinaId } = req.params;

    const disciplinaRef = db.collection('disciplinas').doc(disciplinaId);
    const doc = await disciplinaRef.get();

    if (!doc.exists || doc.data().userId !== userId) {
      return res.status(403).json({ message: 'Acesso negado a esta disciplina.' });
    }

    const snapshot = await db.collection('tarefas')
      .where('disciplinaId', '==', disciplinaId)
      .orderBy('criadoEm', 'desc') // Mostra as mais recentes primeiro
      .get();

    if (snapshot.empty) {
      return res.status(200).json([]);
    }

    const tarefas = [];
    snapshot.forEach(doc => {
      tarefas.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(tarefas);

  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
  }
};

exports.updateTarefa = async (req, res) => {
  try {
    const userId = req.user.uid;
    const tarefaId = req.params.id;
    const novosDados = req.body;

    const tarefaRef = db.collection('tarefas').doc(tarefaId);
    const doc = await tarefaRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'Tarefa não encontrada.' });
    }
    if (doc.data().userId !== userId) {
      return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para editar esta tarefa.' });
    }

    await tarefaRef.update(novosDados);
    res.status(200).json({ message: 'Tarefa atualizada com sucesso!', id: tarefaId });

  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
  }
};

exports.deleteTarefa = async (req, res) => {
  try {
    const userId = req.user.uid;
    const tarefaId = req.params.id;

    const tarefaRef = db.collection('tarefas').doc(tarefaId);
    const doc = await tarefaRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'Tarefa não encontrada.' });
    }
    if (doc.data().userId !== userId) {
      return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para deletar esta tarefa.' });
    }

    await tarefaRef.delete();
    res.status(200).json({ message: 'Tarefa deletada com sucesso!' });
    
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
    res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
  }
};