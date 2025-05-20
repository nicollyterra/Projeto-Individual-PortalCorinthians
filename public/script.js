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


// código modal 

// Criando uma função arrow chamada switchModal, 
// que fará o seguinte processo quando executada:

document.addEventListener('DOMContentLoaded', () => {
  const switchModal = () => {
    const modal = document.querySelector('.modal')
    const actualStyle = modal.style.display

    if (actualStyle === 'block') {
      modal.style.display = 'none'
    } else {
      modal.style.display = 'block'
    }
  }

  const btn_craque = document.querySelector('.btn_craque')
  if (btn_craque) {
    btn_craque.addEventListener('click', switchModal)
  }

  window.onclick = function (event) {
    const modal = document.querySelector('.modal')
    if (event.target === modal) {
      switchModal()
    }
  }
})





   