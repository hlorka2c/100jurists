const TEXT_STATES = ["140px", "auto"];
const BUTTON_STATES = ["Показать весь текст", "Свернуть"];

const containerNode = document.querySelector(".container");
const juristsList = document.querySelectorAll(".call__jurists-list__item");
const toggleTextButton = document.querySelector(".seo__more");
const seoText = document.querySelector(".seo__description");
const sliderRight = document.querySelector(".slider-right");
const sliderLeft = document.querySelector(".slider-left");
const sliderItem = document.querySelector(".reviews__list__item");
const juristsMainNode = document.querySelector(".jurists__main-content");

let leftValue = 0,
    textState = 0,
    sliderScroll = 0,
    sliderCurrentPos = 1,
    sliderEndPos = juristsList.length,
    containerWidth = 0,
    list,
    gap;



document.addEventListener("DOMContentLoaded", () => {
    juristsList.forEach(setLeft);

    setContainerWidth();

    if (window.innerWidth >= 1440) {
        juristsMainNode.style.width = Math.ceil(containerWidth * 32.152 / 100) + "px";
    }

    toggleTextButton.addEventListener("click", () => toggleText(seoText));

    sliderRight.addEventListener("click", () => {
        // листаем влево
        slide("left");
    })

    sliderLeft.addEventListener("click", () => {
        // листаем вправо
        slide("right");
    })
});

function addPX(value) {
    return value + "px";
}

function setContainerWidth() {
    containerWidth = +(getComputedStyle(containerNode).width.split("px")[0]);
}

function setLeft(element) {
    element.style.left = addPX(leftValue);
    leftValue -= 31;
}

function toggleText(element) {
    textState = +!textState;
    element.style.height = TEXT_STATES[textState];
    toggleTextButton.innerHTML = BUTTON_STATES[textState];
}

function getElementWidth(element) {
    return +getComputedStyle(element).width.split("px")[0];
}

function getSliderStepWidth(itemWidth) {
    list = document.querySelector(".reviews__list");
    gap = +getComputedStyle(list).gap.split("px")[0];

    return itemWidth + gap;
}

function slide(direction) {
    switch (direction) {
        case "right":
            [sliderLeft, sliderRight].forEach(item => item.classList.remove("disable"));

            sliderCurrentPos--;
            sliderScroll += getSliderStepWidth(getElementWidth(sliderItem))
            sliderItem.style.marginLeft = addPX(sliderScroll);

            if (sliderCurrentPos === 1) {
                sliderLeft.classList.add("disable");
                return;
            };
            break;

        case "left":
            [sliderLeft, sliderRight].forEach(item => item.classList.remove("disable"));

            sliderCurrentPos++;
            sliderScroll -= getSliderStepWidth(getElementWidth(sliderItem))
            sliderItem.style.marginLeft = addPX(sliderScroll);

            if (sliderCurrentPos === sliderEndPos) {
                sliderRight.classList.add("disable");
                return;
            };
            break;
    }
}