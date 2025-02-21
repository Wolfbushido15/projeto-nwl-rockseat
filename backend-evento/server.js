const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const db = new sqlite3.Database("./database.db", (err)=> {
  if(err) {
    return console.error("Erro ao conectar com o banco de dados:", err.message);
  }
  console.log("conectado ao banco de dados SQLite");
});

db.run(`CREATE TABLE IF NOT EXISTS subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  ref INTEGER,
  refBy INTEGER
  )`, (err) => {
    if (err) {
      console.error("error ao criar a tabela:", err.message);
    }else {
      console.log("tabela criada")
    }
  });

app.post("/subscribe", (req, res) => {
  const {email, phone, refBy } = req.body;
  if(!email || !phone) {
    return res.status(400).json({ error: "Email e telefone sao obrigatorios"});
  }

  const ref = Math.floor(Math.random() *10000);

  const query = ` INSERT INTO subscribers (email, phone, ref, refBy) VALUES (?, ?, ?, ?)`;;
  db.run(query, [email, phone,ref, refBy || null ], function(err) {
    if (err) {
      console.error("Error ao inserir dados:", err.message);
      return res.status(500).json({ error: "Error interno no servidor."});
    }
    res.json({id: this.lastID, email, phone, ref, refBy});
  });
});

app.get("/subscribers", (req, res) => {
  const query = `SELECT * FROM subscribers`;
  db.all(query, [], (err, rows) =>{
    if(err){
      console.error("Erro ao Buscar incritos:", err.message);
      return res.status(500).json({error: "Erro interno do servidor."});
    }
    res.json(rows);
  });
});

app.get("/total", (req, res) => {
  const query = `SELECT COUNT(*) as total FROM subscribers`;
  db.get(query, [], (err, row) => {
    if (err) {
      console.error("Erro ao contar inscrições:", err.message);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
    res.json(row);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
  console.log(`Servidor rodando na porta ${PORT}`)
})