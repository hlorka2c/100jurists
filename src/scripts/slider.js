import Swiper from "swiper";
import "swiper/css"
import 'swiper/css/navigation';
import { Navigation } from "swiper/modules";


const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    modules: [Navigation],
    loop: false,
    speed: 300,

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        addIcons: false,
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