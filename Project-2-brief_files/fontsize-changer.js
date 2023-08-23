const fontPlus = document.querySelector("#font-plus");
const fontMinus = document.querySelector("#font-minus");
const content = document.querySelector("#tg-sb-content");

let fontSizeNumber = 1.5;
if (localStorage.getItem("fontSize")) {
  fontSizeNumber = parseFloat(localStorage.getItem("fontSize"));
  content.style.fontSize = `${fontSizeNumber}rem`;
}

fontPlus.onclick = function () {
  fontSizeNumber += 0.2;
  localStorage.setItem("fontSize", fontSizeNumber);
  const fontSizeUpdate = `${fontSizeNumber}rem`;
  content.style.fontSize = fontSizeUpdate;
};

fontMinus.onclick = function () {
  fontSizeNumber -= 0.2;
  localStorage.setItem("fontSize", fontSizeNumber);
  const fontSizeUpdate = `${fontSizeNumber}rem`;
  content.style.fontSize = fontSizeUpdate;
};
