const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});



const usersRouter = require('./routes/users.js');
const disciplinasRouter = require('./routes/disciplinas.js');
const tarefasRouter = require('./routes/tarefas.js');

app.get('/', (req, res) => {
  res.send('API do Sistema de Apoio ao Aluno no ar! Sabadão produtivo!');
});


app.use('/users', usersRouter);
app.use('/disciplinas', disciplinasRouter);
app.use('/tarefas', tarefasRouter);




app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}. Acesse http://localhost:3000`);
});