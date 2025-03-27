"use strict";
let $ = document;
const nameInput = $.getElementById("name-input");


let userEnteredName = null;

const nameRegex = /^[A-Za-z\s]+$/;

function userInputFunc(e) {
  userEnteredName = e.target.value;

  if (e.keyCode === 13 && nameRegex.test(userEnteredName)) {
    fetch(`https://api.genderize.io?name=${userEnteredName}`)
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
}

nameInput.addEventListener("keyup", userInputFunc);
