// estilizações da página


window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


var swiper = new Swiper('.news-swiper', {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

var swiper = new Swiper('.torcida-swiper', {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: false,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

var swiper = new Swiper('.organizada-swiper', {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next-to',
        prevEl: '.swiper-button-prev-to',
    },
});

const sidebar = document.querySelector('.sidebar');
const toggleButton = document.querySelector('.toggle-button');
const mainContent = document.querySelector('.main-content');

toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    mainContent.classList.toggle('sidebar-open');
});

// código modal 

// Criando uma função arrow chamada switchModal, 
// que fará o seguinte processo quando executada:

const switchModal = () => { //não usa o this próprio
    const modal = document.querySelector('.modal') // armazenando o modal em uma constante usando o querySelector e selecionando elemento com a classe modal 
    const actualStyle = modal.style.display // pegando o estilo atual em outra constante usando o do modal já armazenado 

    if (actualStyle == 'block') {
        modal.style.display = 'none' 
    } 
    else {
        modal.style.display = 'block' // aqui o modal aparece
    }
}

    const btn_craque = document.querySelector('.btn_craque')
    btn_craque.addEventListener('click', switchModal) //diz que quando o botão for clicado chama a arrow function de switch modal 

    window.onclick = function (event) {
        const modal = document.querySelector ('.modal')
    if (event.target == modal) {
        switchModal()
    }
    }