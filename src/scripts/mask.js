let maskOptions = {
  mask: '+{7}(000)000-00-00'
};

const popupInput = document.querySelector(".popup input");

// 'accept' event fired on input when mask value has changed

// const maskPopup = IMask(popupInput, maskOptions);
// const log = (mask) => console.log(mask.value.length);

// maskPopup.on('accept', log);

let elements = document.querySelectorAll(".input-wrapper--phone input");
elements.forEach((element) => {
  let mask = IMask(element, maskOptions);
  mask.on('accept', () => {
    console.log('Значение: ' + mask.value + '. Длина значения: ' + mask.value.length);
    
  })
})

// const maskOrderForm = IMask(document.querySelector(".order-call input"), maskOptions);
// const maskSentQuestion = IMask(document.querySelector(".send-question input"), maskOptions);
// const maskBigForm = IMask(document.querySelector(".jurists input"), maskOptions);
