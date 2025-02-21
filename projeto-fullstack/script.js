const app = document.getElementById("app")
const users = [
  {
    email: 'teste@teste.com',
    phone: '99999999999',
    ref: 100,
    refBy: null
  },
  {
    email: 'tust@tust.com',
    phone: '99999999999',
    ref: 200,
    refBy: 100
  },
  {
    email: 'tost@tost.com',
    phone: '99999999999',
    ref: 300,
    refBy: 200
  }
]

const getUser = (userData) => {
  return users.find((user) => {
    return user.email == userData.email
  })
}

const getTotalSubscribers = (userData) => {
  const subs = users.filter((user) => {
    return user.refBy == userData.ref
  })
  return subs.length
}

const showInvite = (userData) => {
  app.innerHTML = `
  <main>
    <h3>Inscrição confirmada!</h3>

    <p>
      Convide mais pessoas e concorra a prêmios!
      <br>Compartilhe o link e acompanhe as inscrições:
    </p>

    <div class="input-group">
      <label for="link">
        <img src="link.svg" alt="link incon">
      </label>
      <input type="text" id="link" value="https://evento.com?ref=${userData.ref}" disabled>
    </div>
  </main>

  <section class="stats">
    <h4>
      ${getTotalSubscribers(userData)}
    </h4>
    <p>Inscricoes feitas</p>
  </section>
  `
  app.setAttribute('class', 'page-invite')
  updateImagemLinks()
}
const saveUser = (userData) => {
  const newUser = {
    ...userData,
    ref: Math.round(Math.random() * 4000),
    refBy: 100
  }

  users.push(newUser)
  console.log(users)
  return newUser
}


const formAction = () => {
  const form = document.getElementById("form");
  
  form.onsubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    
    // Extrair os dados do formulário
    const userData = {
      email: formData.get('email'),
      phone: formData.get('phone'),
      // Se você quiser enviar também uma referência de indicação (refBy), adicione aqui
      // refBy: algumaFunçãoQueRecupereARefDaURL()
    };

    try {
      // Envia os dados para a API do back-end
      const response = await fetch("http://localhost:3000/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) {
        // Caso ocorra um erro na resposta, lance um erro
        throw new Error("Erro na inscrição.");
      }
      
      const newUser = await response.json();
      
      // Agora que o usuário foi cadastrado no back-end,
      // você pode chamar a função que exibe o convite na página
      showInvite(newUser);
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Ocorreu um erro ao realizar a inscrição. Tente novamente.");
    }
  };
};


const updateImagemLinks = () => {
  document.querySelectorAll('img').forEach((img) => {
    const src = img.getAttribute("src");
    if(src && !src.startsWith("http")) {
      img.src = `https://raw.githubusercontent.com/maykbrito/my-public-files/main/nlw-19/${src}`;
    }
  })
}

const startApp = () => {
  const content = `
    <main>
    <section class="about">
      <div class="section-header">
        <h2>
          Sobre o evento
        </h2>
        <span class="badge">AO VIVO</span>
      </div>
      <p>
        Um evento feito por e para pessoas desenvolvedoras apaixonadas por criar soluções inovadoras e compartilhar conhecimento. Vamos mergulhar nas tendências mais recentes em desenvolvimento de software, arquitetura de sistemas e tecnologias emergentes, com palestras, workshops e hackathons. <br><br>Dias 15 a 17 de março | Das 18h às 21h | Online & Gratuito
      </p>
    </section>

    <section class="registration">
      <h2>Inscricao</h2>
      <form id="form">
        <div class="input-wrapper">
          <div class="input-group">
            <label for="email">
              <img src="mail.svg" alt="Email icon">
            </label>
            <input type="email" id="email" name="email" placeholder="E-mail">
          </div>

          <div class="input-group">
            <label for="phone">
              <img src="phone.svg" alt="Phone icon">
            </label>
            <input type="text" id="phone" name="phone" placeholder="Telefone">
          </div>
        </div>


        <button>
          Confirmar
          <img src="arrow.svg" alt="arrow right">
        </button>
      </form>
    </section>
  </main>
  `

  app.innerHTML = content
  app.setAttribute('class', 'page-start')
  updateImagemLinks()
  formAction()
}
startApp()
// showInvite({
//   emal: 'teste@teste.com',
//   phone: '999',
//   ref: 100
// })
document.querySelector("header").onclick = ()  => startApp()