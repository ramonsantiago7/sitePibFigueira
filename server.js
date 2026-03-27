const http = require("http");
const { Server } = require("socket.io");

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// conexão com banco
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "r4m0Nz11N.",
  database: "igreja"
});

db.connect(err => {
  if (err) {
    console.log("Erro ao conectar:", err);
  } else {
    console.log("Conectado ao MySQL 🔥");
  }
});

// rota de cadastro
app.post("/cadastro", (req, res) => {
  const { nome, email, senha } = req.body;

  const sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";

  db.query(sql, [nome, email, senha], (err, result) => {
    if (err) {
      return res.json({ erro: err });
    }
    res.json({ mensagem: "Usuário cadastrado com sucesso!" });
  });
});

// iniciar servidor
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log("Usuário conectado:", socket.id);

socket.on("mensagem", (msg) => {
  const { usuario, texto } = msg;

  const hora = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  // salvar no banco (AGORA COM HORA)
  const sql = "INSERT INTO mensagens (usuario, mensagem, hora) VALUES (?, ?, ?)";
  
  db.query(sql, [usuario, texto, hora], (err) => {
    if (err) {
      console.log("Erro ao salvar mensagem:", err);
    }
  });

  // enviar já com hora fixa
  io.emit("mensagem", {
    usuario,
    texto,
    mensagem: texto,
    hora
  });
});

  socket.on("disconnect", () => {
    console.log("Usuário desconectado:", socket.id);
  });
});

app.get("/mensagens", (req, res) => {
  const sql = "SELECT * FROM mensagens ORDER BY data_envio ASC";

  db.query(sql, (err, result) => {
    if (err) {
      console.log("Erro ao buscar mensagens:", err);
      return res.json([]);
    }

    res.json(result);
  });
});

server.listen(3000, () => {
  console.log("Servidor rodando com chat 🚀");
})

app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  const sql = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";

  db.query(sql, [email, senha], (err, result) => {
    if (err) return res.json({ erro: err });

    if (result.length > 0) {
      res.json({
        sucesso: true,
        nome: result[0].nome
      });
    } else {
      res.json({
        sucesso: false,
        mensagem: "Email ou senha inválidos"
      });
    }
  });
});