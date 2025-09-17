const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(cors({origin: true}));
app.use(express.json());

// Rotas
const usersRouter = require("./routes/users.js");
const disciplinasRouter = require("./routes/disciplinas.js");
const tarefasRouter = require("./routes/tarefas.js");

app.get("/", (req, res) => {
  res.send("API do Sistema de Apoio ao Aluno VIVA!");
});

app.use("/api/users", usersRouter);
app.use("/api/disciplinas", disciplinasRouter);
app.use("/api/tarefas", tarefasRouter);

exports.api = functions.https.onRequest(app);