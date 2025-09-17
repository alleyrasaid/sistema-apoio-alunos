const admin = require('firebase-admin');

exports.signup = async (req, res) => {
  try {
    const { email, password, nome } = req.body;

    if (!email || !password || !nome) {
      return res.status(400).json({ message: 'Email, senha e nome são obrigatórios.' });
    }

    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      displayName: nome,
    });

    const usersDb = admin.firestore().collection('users');
    await usersDb.doc(userRecord.uid).set({
      nome: nome,
      email: email,
      criadoEm: new Date().toISOString()
    });

    res.status(201).json({ message: 'Usuário criado com sucesso!', uid: userRecord.uid });

  } catch (error) {
    console.error('Erro ao criar usuário:', error);

    if (error.code === 'auth/email-already-exists') {
        return res.status(409).json({ message: 'Este email já está em uso.' });
    }
    res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
  }
};

exports.syncUserProfile = async (req, res) => {
  try {
    const { uid, name, email } = req.user; 
    const userRef = admin.firestore().collection('users').doc(uid);

    await userRef.set({
      nome: name,
      email: email
    }, { merge: true });

    res.status(200).json({ message: 'Perfil do usuário sincronizado com sucesso.' });
  } catch (error) {
    console.error("Erro ao sincronizar perfil:", error);
    res.status(500).json({ message: 'Erro ao sincronizar perfil do usuário.' });
  }
};