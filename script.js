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