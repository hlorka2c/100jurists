const TEXT_STATES = ["140px", "auto"];
const LEFT__VARIANTS = [31, 16, 24];
const BUTTON_STATES = ["Показать весь текст", "Свернуть"];

const containerNode = document.querySelector(".container");
const juristsList = document.querySelectorAll(".call__jurists-list__item");
const toggleTextButton = document.querySelector(".seo__more");
const seoText = document.querySelector(".seo__description");
const sliderRight = document.querySelector(".slider-right");
const sliderLeft = document.querySelector(".slider-left");
const sliderItem = document.querySelector(".reviews__list__item");
const juristsMainNode = document.querySelector(".jurists__main-content");
const burgerMenu = document.querySelector(".burger-menu");
const menu = document.querySelector(".menu");
const menuBackground = document.querySelector(".menu__background");
const menuClose = document.querySelector(".menu__close");
const searchMobileButton = document.querySelector(".header-mobile__buttons__search");
const searchMobile = document.querySelector(".search-mobile");
const searchCloseButton = document.querySelector(".search__close");
const popupJuristsList = document.querySelectorAll(".popup__jurists-list__item");
const popupButton = document.querySelector(".main__actions-button");
const popup = document.querySelector(".popup");
const popupSuccess = document.querySelector(".popup__success");
const popupSuccessButton = document.querySelector(".popup__success-button");
const popupSuccessClose = document.querySelector(".popup__success-close");
const questionButton = document.querySelector(".question");
const popupCloseButton = document.querySelector(".popup__close");
const actionButtons = document.querySelectorAll(".tutorial__variants__item-action");
const inputWrappers = document.querySelectorAll(".input-wrapper");
const popupForm = document.querySelector(".popup form");

const forms = document.querySelectorAll("form");

let leftValue = 0,
    textState = 0,
    sliderScroll = 0,
    sliderCurrentPos = 1,
    sliderEndPos = juristsList.length,
    containerWidth = 0,
    desctopFormat = true,
    list,
    gap,
    isPhoneLengthCorrect;



document.addEventListener("DOMContentLoaded", () => {
    juristsList.forEach(setLeft);
    leftValue = 0;

    popupJuristsList.forEach(setLeft);
    leftValue = 0;

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

    burgerMenu.addEventListener("click", () => {
        showMenu();
    })

    menuClose.addEventListener("click", () => {
        hideMenu();
    })

    popupButton.addEventListener("click", () => {
        setActive(popup, menuBackground);
    });

    questionButton.addEventListener("click", () => {
        setActive(popup, menuBackground);
    });

    actionButtons.forEach((item) => {
        item.addEventListener("click", () => {
            setActive(popup, menuBackground);
        });
    })

    popupCloseButton.addEventListener("click", () => {
        unsetActive(popup, menuBackground);
    })

    popupSuccessClose.addEventListener("click", () => {
        unsetActive(popupSuccess, menuBackground);
    });

    popupSuccessButton.addEventListener("click", () => {
        unsetActive(popupSuccess, menuBackground);
    })

    forms.forEach((form) => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            let phone = form.querySelector(".input-wrapper--phone input"),
                name = form.querySelector(".input-wrapper--name input"),
                textarea = form.querySelector("textarea");

            let isFormContainName = !!name,
                isFormContainTextArea = !!textarea,
                isNameNotEmpty = isFormContainName ? !!name.value.trim() : false,
                isTextareaNotEmpty = isFormContainTextArea ? !!textarea.value.trim() : false,
                isPopupForm = form.classList.contains("popup__form"),
                isFormValid;

            isPhoneLengthCorrect = phone.value.length === 16;

            if (isFormContainTextArea) {
                isFormValid = isPhoneLengthCorrect && isNameNotEmpty && isTextareaNotEmpty;

                validateFormName(name);
                validateFormPhone(phone);
                validateFormTextarea(textarea);
            } else if (isFormContainName) {
                isFormValid = isPhoneLengthCorrect && isNameNotEmpty;

                validateFormName(name);
                validateFormPhone(phone);
            } else {
                isFormValid = isPhoneLengthCorrect;

                validateFormPhone();
            }

            if (!isFormValid) return;

            setActive(popupSuccess, menuBackground);
            if (isPopupForm) unsetActive(popup);

            phone.value = "";
            if (isFormContainName) name.value = "";
            if (isFormContainTextArea) textarea.value = "";
        })
    })

    window.addEventListener("resize", () => {
        if (window.innerWidth <= 1080 && desctopFormat === true) {
            desctopFormat = false;
            juristsList.forEach(setLeft);
        } else if (window.innerWidth > 1080 && desctopFormat === false) {
            desctopFormat = true;
            juristsList.forEach(setLeft);
        }
        leftValue = 0;
    });

    searchMobileButton.addEventListener("click", () => {
        setActive(searchMobile, menuBackground);
    })

    searchCloseButton.addEventListener("click", () => {
        unsetActive(searchMobile, menuBackground);
    })
});

function validateFormName(name) {
    if (!name.value.trim()) {
        name.classList.add("error");
        setTimeout(() => { name.classList.remove("error") }, 1000);
    }
}

function validateFormPhone(phone) {
    if (!isPhoneLengthCorrect) {
        phone.classList.add("error");
        setTimeout(() => { phone.classList.remove("error") }, 1000);
    }
}

function validateFormTextarea(textarea) {
    if (!textarea.value.trim()) {
        textarea.classList.add("error");
        setTimeout(() => { textarea.classList.remove("error") }, 1000);

    }
}

function addPX(value) {
    return value + "px";
}

function setContainerWidth() {
    containerWidth = +(getComputedStyle(containerNode).width.split("px")[0]);
}

function setLeft(element) {
    element.style.left = addPX(leftValue);
    let itPopup = element.classList.contains("popup__jurists-list__item") || element.classList.contains("popup__jurists-list__more");

    leftValue -= itPopup ? 20 : window.innerWidth > 1080 ? 31 : 16;
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

function setActive(...items) {
    items.forEach(item => item.classList.add("active"));
}

function unsetActive(...items) {
    items.forEach(item => item.classList.remove("active"));
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