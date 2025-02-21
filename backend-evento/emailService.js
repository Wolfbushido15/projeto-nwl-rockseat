const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // Ou outro provedor SMTP
  auth: {
    user: 'seuemail@gmail.com', // Seu e-mail
    pass: 'suasenha' // Senha ou App Password (veja abaixo)
  }
});

const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: '"Nome do Evento" <seuemail@gmail.com>',
      to,
      subject,
      text
    });
    console.log("E-mail enviado: " + info.response);
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
  }
};

module.exports = sendEmail;
