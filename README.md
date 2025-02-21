# projeto-nwl-rockseat
# Evento Registration API

Este projeto é um sistema de inscrição para um evento, onde os usuários podem se registrar com e-mail e telefone. O back-end utiliza **Node.js**, **Express**, **SQLite** e **Nodemailer** para armazenar os dados e enviar e-mails de confirmação.

## 🚀 Tecnologias Utilizadas

- **Front-end:** HTML, CSS, JavaScript
- **Back-end:** Node.js, Express.js
- **Banco de Dados:** SQLite
- **Email Service:** Nodemailer
- **Cors:** Para permitir requisições entre domínios diferentes

---

## 📌 Funcionalidades

- Cadastro de usuários com e-mail e telefone.
- Armazenamento de dados no SQLite.
- Geração de link de indicação para novos participantes.
- Exibição do número de inscritos.
- Envio de e-mail de confirmação para os usuários cadastrados.

---

## 📂 Estrutura do Projeto

```
backend-evento/
│── node_modules/           # Dependências do Node.js
│── database.db             # Banco de dados SQLite
│── server.js               # Código do servidor
│── package.json            # Configuração do projeto e dependências
│── frontend/
    ├── index.html         # Página inicial do site
    ├── style.css          # Estilos do site
    ├── script.js          # Lógica de interação do usuário
```

---

## 🛠️ Como Rodar o Projeto

### 1️⃣ Instale as dependências
```sh
npm install
```

### 2️⃣ Execute o servidor
```sh
node server.js
```
O servidor será iniciado em `http://localhost:3000`

### 3️⃣ Abra o front-end
Basta abrir o arquivo `index.html` no navegador.

---

## 📬 Configuração do Envio de E-mails

O sistema utiliza o Nodemailer para enviar e-mails de confirmação aos usuários inscritos.

### Configurar credenciais de e-mail
No arquivo `server.js`, edite as configurações do Nodemailer:

```js
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "seuemail@gmail.com",
    pass: "suasenha"
  }
});
```

Se estiver usando o Gmail, ative o **Acesso a Apps Menos Seguros** ou gere uma **App Password**.

---

## 📋 Endpoints da API

### `POST /subscribe`
Registra um usuário e retorna seus dados.

**Requisição:**
```json
{
  "email": "usuario@email.com",
  "phone": "999999999"
}
```

**Resposta:**
```json
{
  "id": 1,
  "email": "usuario@email.com",
  "phone": "999999999",
  "ref": 1234,
  "refBy": null
}
```

---

## 📧 Contato
Caso tenha dúvidas ou sugestões, sinta-se à vontade para entrar em contato! 🚀


