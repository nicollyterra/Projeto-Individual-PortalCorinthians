function buscarPost() {
    fetch('/usuarios/buscarSolici', {
        method: "GET"
    }).then(async resposta => {
        var usersNegados = await resposta.json()

        var txt_card = ``
        for (let i = usersNegados.length - 1; i >= 0; i--) {
            txt_card += `
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
    fetch('/usuarios/aceitar', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idPostagem: idPost,
            statusPostagem: statusPost
        })
    }).then(async resposta => {
        if (resposta.ok) {
            alert("Ação confirmada")
            location.reload()
        }
    })
}

function postsAceitos() {
    fetch('/usuarios/postsAceitos', {
        method: "GET"
    }).then(async resposta => {
        let postsGerais = await resposta.json()
        console.log(postsGerais)


        for (let i = 0; i < postsGerais.length; i++) {

            carrossel.innerHTML += `
             <div class="swiper-slide">
              <div class='card-torcida style="${postsGerais[i].img_relato}">
                <div class='info'>
                  <h1 class='title'></h1>
                  <p class='description'>${postsGerais[i].relato}<span style="color: #847248;">${postsGerais[i].nome}</span></p>
                </div>
              </div>
            </div>`


        }
    })
}


// dados da dashboard 

function kpiVotos() {
    fetch('/usuarios/kpiVotos', {
        method: "GET"
    }).then(res => res.json())
      .then(function (resultado){
        var kpi = document.getElementById('num-kpi')
        var votos = resultado[0].votos
        kpi.innerHTML = `<p>${votos}</p>`

      })
}

function kpiUsers() {
    fetch('/usuarios/kpiUsers', {
        method: "GET"
    }).then(res => res.json())
      .then(function (resultado){
        var kpi = document.getElementById('num-kpi-users')
        var users = resultado[0].usuarios
        kpi.innerHTML = `<p>${users}</p>`

      })
}


function iniciarPagnia(){
    kpiVotos();
    kpiUsers();
}