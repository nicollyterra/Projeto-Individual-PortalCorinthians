function preCadastro() {


  if (sessionStorage.ID_USUARIO == undefined) {


    modal_voto.innerHTML = `
         <div style="
          display: flex;
          align-items: center;
          justify-content: center;
          background: #131313;
          background: linear-gradient(328deg,rgb(132, 114, 72) 15%, rgba(255, 255, 246, 1) 92%);
          color: #000;
          height: 100%; 
          width: 100%; 
          border-radius: 10px; 
        ">
          <div style="text-align: center;">
            <img src='./imagens/corinthianskkkk.png' alt='Corinthians' style=' height: 200%; ' />
          </div>

          <div style="min-width: 400px; text-align: center;">
            <h2 style="font-size: 40px;margin-bottom: 10px; ">EAI FIEL!</h2>
            <p style="font-size: 25px; margin-bottom: 25px; color:"#FFFFF6; ">
              VOCÊ PRECISA ESTAR CADASTRADO EM NOSSO SITE <br>PARA VOTAR NAS PARTIDAS!
            </p>

            <button onclick="window.location.href='login.html'" style="
              background-color: #131313;
              color: white;
              font-weight: bold;
              border: none;
              padding: 12px 32px;
              border-radius: 6px;
              font-size: 20px;
              cursor: pointer;
              font-family: 'Bebas Neue';
              letter-spacing: 2px; 
              transition: all 0.3s ease;
              box-shadow: 0 0 0px  #131313;

            " onmouseover="this.style.boxShadow='0 0 12px #131313, 0 0 20px #131313'" 
               onmouseout="this.style.boxShadow='0 0 0px #131313'">
              CADASTRE-SE
            </button>

          </div>
        </div>
`
  } else {
    btn_login.innerHTML = `
         
         <a href="minha-conta.html">
            <img src="../uploads/${JSON.parse(sessionStorage.IMG_USER)}" style="width: 60px; height: 60px; border-radius: 50px; border: black 3px solid">
            </a>`

    console.log(JSON.parse(sessionStorage.IMG_USER))
    //  sessionStorage.IMG_USER = JSON.stringify(json[0].imagem_usuario)
    
  }


}

function logout(){
  sessionStorage.clear() 
   
    alert("Logout realizado com sucesso!");

    setTimeout(() => {
        window.location = "/index.html";
    }, 500);
}