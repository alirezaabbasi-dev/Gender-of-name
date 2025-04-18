"use strict";
let $ = document;
const nameInput = $.getElementById("name-input");
const showOutPutElem = $.getElementById("show-output");
const searchBtn = $.getElementById("Search");

let userEnteredName, output;
const nameRegex = /^[A-Za-z\s]+$/;

function userInputFunc(e) {
  userEnteredName = e.target.value;

  if (e.keyCode === 13 && nameRegex.test(userEnteredName)) {
    getFromApi(userEnteredName);
  }
}

function getFromApi(userEnteredName) {
  fetch(`https://api.genderize.io?name=${userEnteredName}`)
    .then((res) => res.json())
    .then((res) => {
      output = res;

      if (output.gender) {
        showOutPutElem.innerHTML = `${output.name} is ${output.gender} with ${(
          output.probability * 100
        ).toFixed()}% certainty`;

        document.title = `${output.name} is ${output.gender}`;
      } else {
        showOutPutElem.innerHTML = `${userEnteredName} is not name`;

        document.title = "Gender of name";
      }
    })
    .catch(
      (err) =>
        (showOutPutElem.innerHTML = "There was a problem, please try again.")
    );
}

nameInput.addEventListener("keyup", userInputFunc);
searchBtn.addEventListener("click", () => {
  if (nameRegex.test(userEnteredName)) {
    getFromApi(userEnteredName);
  }
});
