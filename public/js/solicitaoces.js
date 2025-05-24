  function buscarPost() {
     fetch('/usuarios/buscarSolici', {
      method: "GET"
     }) .then(async resposta => {
      var usersNegados = await resposta.json()

      var txt_card = ``      
        for (let i = usersNegados.length -1; i >= 0 ; i--) {
            var ft_user = 
          txt_card+= `
          <div class="card">
            <div class="img-relato"><img src="./uploads/${usersNegados[i].img_relato}"></div>
            <div class="desc-relato">${usersNegados[i].relato}</div>
          </div>`

          console.log(fkUsuario)
        }
          cards_soli.innerHTML = txt_card
     }) 
  } 