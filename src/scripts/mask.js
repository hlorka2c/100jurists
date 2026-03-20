let maskOptions = {
  mask: '+{7}(000)000-00-00'
};

const popupInput = document.querySelector(".popup input");

let elements = document.querySelectorAll(".input-wrapper--phone input");
elements.forEach((element) => {
  let mask = IMask(element, maskOptions);
  mask.on('accept', () => {
    console.log('Значение: ' + mask.value + '. Длина значения: ' + mask.value.length);
    
  })
})
