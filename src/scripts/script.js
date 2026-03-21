const LEFT__VARIANTS = [31, 16, 24];
const TEXT_STATES = ["140px", "auto"];
const BUTTON_STATES = ["Показать весь текст", "Свернуть"];

// Node variables
const menuNode = document.querySelector(".menu");
export const popupNode = document.querySelector(".popup");
const seoMoreNode = document.querySelector(".seo__more");
const questionNode = document.querySelector(".question");
const containerNode = document.querySelector(".container");
// const popupFormNode = document.querySelector(".popup form");
const menuCloseNode = document.querySelector(".menu__close");
const burgerMenuNode = document.querySelector(".burger-menu");
const popupCloseNode = document.querySelector(".popup__close");
const searchCloseNode = document.querySelector(".search__close");
const searchMobileNode = document.querySelector(".search-mobile");
export const popupSuccessNode = document.querySelector(".popup__success");
export const menuBackgrounNode = document.querySelector(".menu__background");
const seoDescriptionNode = document.querySelector(".seo__description");
const swiperButtonPrevNode = document.querySelector(".swiper-button-prev");
const swiperButtonNextNode = document.querySelector(".swiper-button-next");
const popupSuccessCloseNode = document.querySelector(".popup__success-close");
const mainActionsButtonNode = document.querySelector(".main__actions-button");
const juristsMainContentNode = document.querySelector(".jurists__main-content");
const popupSuccessButtonNode = document.querySelector(".popup__success-button");
const callJuristsListItemNode = document.querySelectorAll(".call__jurists-list__item");
const headerMobileButtonsSearchNode = document.querySelector(".header-mobile__buttons__search");

// Nodes variables
const popupJuristsListItemNodes = document.querySelectorAll(".popup__jurists-list__item");
const tutorialVariantsItemActionNodes = document.querySelectorAll(".tutorial__variants__item-action");


let leftValue = 0,
    textState = 0,
    containerWidth = 0,
    desctopFormat = true,
    list,
    gap;
    


document.addEventListener("DOMContentLoaded", () => {
    callJuristsListItemNode.forEach(setLeft);
    leftValue = 0;

    popupJuristsListItemNodes.forEach(setLeft);
    leftValue = 0;

    setContainerWidth();

    if (window.innerWidth >= 1440) {
        juristsMainContentNode.style.width = Math.ceil(containerWidth * 32.152 / 100) + "px";
    }

    seoMoreNode.addEventListener("click", () => toggleText(seoDescriptionNode));

    burgerMenuNode.addEventListener("click", () => {
        setActive(menuNode, menuBackgrounNode);
    })

    menuCloseNode.addEventListener("click", () => {
        unsetActive(menuNode, menuBackgrounNode);
    })

    mainActionsButtonNode.addEventListener("click", () => {
        setActive(popupNode, menuBackgrounNode);
    });

    questionNode.addEventListener("click", () => {
        setActive(popupNode, menuBackgrounNode);
    });

    tutorialVariantsItemActionNodes.forEach((item) => {
        item.addEventListener("click", () => {
            setActive(popupNode, menuBackgrounNode);
        });
    })

    popupCloseNode.addEventListener("click", () => {
        unsetActive(popupNode, menuBackgrounNode);
    })

    popupSuccessCloseNode.addEventListener("click", () => {
        unsetActive(popupSuccessNode, menuBackgrounNode);
    });

    popupSuccessButtonNode.addEventListener("click", () => {
        unsetActive(popupSuccessNode, menuBackgrounNode);
    })

    if (window.innerWidth <= 800) {
        toggleClass("swiper-button-hidden", swiperButtonNextNode, swiperButtonPrevNode);
    }

    window.addEventListener("resize", () => {
        resize();
    });

    headerMobileButtonsSearchNode.addEventListener("click", () => {
        setActive(searchMobileNode, menuBackgrounNode);
    });

    searchCloseNode.addEventListener("click", () => {
        unsetActive(searchMobileNode, menuBackgrounNode);
    });
});

function addPX(value) {
    return value + "px";
}

function setContainerWidth() {
    containerWidth = +(getComputedStyle(containerNode).width.split("px")[0]);
}

function setLeft(element) {
    element.style.left = addPX(leftValue);
    let itPopup = element.classList.contains("popup__jurists-list__item") || element.classList.contains("popup__jurists-list__more");

    leftValue -= itPopup ? 20 : window.innerWidth > 1024 ? 31 : 16;
}

function toggleText(element) {
    textState = +!textState;
    element.style.height = TEXT_STATES[textState];
    seoMoreNode.innerHTML = BUTTON_STATES[textState];
}

function toggleClass(itemClass, ...items) {
    items.forEach(item => item.classList.toggle(itemClass));
}

function resize() {
    if (window.innerWidth < 1024 && desctopFormat === true) {
        desctopFormat = false;
        callJuristsListItemNode.forEach(setLeft);
        toggleClass("swiper-button-hidden", swiperButtonNextNode, swiperButtonPrevNode);
    } else if (window.innerWidth >= 1024 && desctopFormat === false) {
        desctopFormat = true;
        callJuristsListItemNode.forEach(setLeft);
        toggleClass("swiper-button-hidden", swiperButtonNextNode, swiperButtonPrevNode);
    }
    leftValue = 0;
}

export function setActive(...items) {
    items.forEach(item => item.classList.add("active"));
}

export function unsetActive(...items) {
    items.forEach(item => item.classList.remove("active"));
}