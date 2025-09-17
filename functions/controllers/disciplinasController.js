const admin = require('firebase-admin');
const db = admin.firestore();

exports.createDisciplina = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { nome, professor, cor } = req.body;

    if (!nome) {
      return res.status(400).json({ message: 'O nome da disciplina é obrigatório.' });
    }

    const novaDisciplina = {
      userId,
      nome,
      professor: professor || '',
      cor: cor || '#CCCCCC',
      criadoEm: new Date().toISOString()
    };

    const docRef = await db.collection('disciplinas').add(novaDisciplina);
    res.status(201).json({ id: docRef.id, ...novaDisciplina });

  } catch (error) {
    console.error('Erro ao criar disciplina:', error);
    res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
  }
};


exports.getDisciplinasDoUsuario = async (req, res) => {
  try {
    const userId = req.user.uid;

    const snapshot = await db.collection('disciplinas').where('userId', '==', userId).orderBy('nome').get();

    if (snapshot.empty) {
      return res.status(200).json([]);
    }

    const disciplinas = [];
    snapshot.forEach(doc => {
      disciplinas.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(disciplinas);

  } catch (error) {
    console.error('Erro ao buscar disciplinas:', error);
    res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
  }
};

exports.updateDisciplina = async (req, res) => {
  try {
    const userId = req.user.uid;
    const disciplinaId = req.params.id;
    const novosDados = req.body; 

    const disciplinaRef = db.collection('disciplinas').doc(disciplinaId);
    const doc = await disciplinaRef.get();

    // VERIFICAÇÃO DE SEGURANÇA
    if (!doc.exists) {
      return res.status(404).json({ message: 'Disciplina não encontrada.' });
    }
    if (doc.data().userId !== userId) {
      return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para editar esta disciplina.' });
    }

    await disciplinaRef.update(novosDados);

    res.status(200).json({ message: 'Disciplina atualizada com sucesso!', id: disciplinaId });

  } catch (error) {
    console.error('Erro ao atualizar disciplina:', error);
    res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
  }
};

exports.deleteDisciplina = async (req, res) => {
  try {
    const userId = req.user.uid;
    const disciplinaId = req.params.id;

    const disciplinaRef = db.collection('disciplinas').doc(disciplinaId);
    const doc = await disciplinaRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'Disciplina não encontrada.' });
    }
    if (doc.data().userId !== userId) {
      return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para deletar esta disciplina.' });
    }

    await disciplinaRef.delete();

    res.status(200).json({ message: 'Disciplina deletada com sucesso!' });

  } catch (error) {
    console.error('Erro ao deletar disciplina:', error);
    res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
  }
};

exports.getDisciplinaById = async (req, res) => {
  try {
    const userId = req.user.uid;
    const disciplinaId = req.params.id;

    const disciplinaRef = db.collection('disciplinas').doc(disciplinaId);
    const doc = await disciplinaRef.get();

    // VERIFICAÇÃO DE SEGURANÇA
    if (!doc.exists) {
      return res.status(404).json({ message: 'Disciplina não encontrada.' });
    }
    if (doc.data().userId !== userId) {
      return res.status(403).json({ message: 'Acesso negado a esta disciplina.' });
    }

    // Se passou na segurança, retorna os dados da disciplina
    res.status(200).json({ id: doc.id, ...doc.data() });

  } catch (error) {
    console.error('Erro ao buscar disciplina:', error);
    res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
  }
};
