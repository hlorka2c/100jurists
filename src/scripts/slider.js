const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,
    speed: 300,

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        addIcons: false,
        enabled: false,
    },

    slidesPerView: 1.09,
    spaceBetween: 10,
    // Responsive breakpoints
    breakpoints: {
        1024: {
            slidesPerView: 3,
            spaceBetween: 10,
        },
    },
});