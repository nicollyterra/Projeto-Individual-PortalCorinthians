  function buscarPost() {
     fetch('/usuarios/buscarSolici', {
      method: "GET"
     }) .then(async resposta => {
      var usersNegados = await resposta.json()

      var txt_card = ``      
        for (let i = usersNegados.length - 1; i >= 0 ; i--) {
          txt_card+= `
          <div class="card">
            <div class="img-relato"><img src="./uploads/${usersNegados[i].img_relato}"></div>
            <div class="desc-relato">${usersNegados[i].relato}
            <button class="btn_aceitar" onclick="aceitar(${usersNegados[i].idpost}, 1)">Aceitar</button>
            <button class="btn_aceitar" onclick="aceitar(${usersNegados[i].idpost}, -1)">Negar</button></div>
          </div>`

        }
          cards_soli.innerHTML = txt_card
     }) 
  } 

  function aceitar(idPost, statusPost) {
    fetch('/usuarios/aceitar' , {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        idPostagem: idPost,
        statusPostagem: statusPost
      })
    }) .then(async resposta => {
      if (resposta.ok) {
        alert("Ação confirmada")
        location.reload()
      }
    })
  }

  function postsAceitos() {
    fetch('/usuarios/postsAceitos', {
      method:"GET"
    }).then (async resposta => {
      let postsGerais = await resposta.json()
      console.log(postsGerais)
    })
  }