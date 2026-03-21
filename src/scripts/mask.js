import IMask from 'imask';
import { setActive, unsetActive, popupSuccessNode, menuBackgrounNode, popupNode } from './script';

const formNodes = document.querySelectorAll("form");

let maskOptions = {
  mask: '+{7}(000)000-00-00',
  min: 16,
};

let masksList = {},
  isPhoneLengthCorrect;


let elements = document.querySelectorAll(".input-wrapper--phone input");
elements.forEach((element) => {
  let mask = IMask(element, maskOptions);
  masksList[element.id] = mask;
})

document.addEventListener("DOMContentLoaded", () => {
  formNodes.forEach((form) => {
    form.addEventListener("submit", e => {
      e.preventDefault()
      submit(form);
    });
  })
})

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

function submit(form) {
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

    validateFormPhone(phone);
  }

  if (!isFormValid) return;

  setActive(popupSuccessNode, menuBackgrounNode);
  if (isPopupForm) unsetActive(popupNode);

  phone.value = "";
  if (isFormContainName) name.value = "";
  if (isFormContainTextArea) textarea.value = "";
}