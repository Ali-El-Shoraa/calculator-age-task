// [day,month,year] array all span class invalid
let invalidInput = document.querySelectorAll(".invalid");

// [day,month,year] array all span class text-birthday
let writeBirthdayArray = document.querySelectorAll(".text-birthday");

// [day,month,year] array all tag input
let inputsBirthday = document.querySelectorAll("input");

let btnSubmit = document.querySelector("#btn-submit");
let btnClear = document.querySelector("#btn-clear");

// /* *************************************************************************************** */
// function to caclutor age
function calculateAge(birthday) {
  const now = new Date();
  const birthDate = new Date(birthday);

  let years = now.getFullYear() - birthDate.getFullYear();
  let months = now.getMonth() - birthDate.getMonth();
  let days = now.getDate() - birthDate.getDate();

  if (months < 0) {
    years--;
    months += 12;
  }

  if (days < 0) {
    months--;
    days += new Date(years, months, 0).getDate() + 1;
  }

  return { years, months, days };
}

// /* *************************************************************************************** */

// check every think in input if is wrong
function isWrog() {
  // day
  invalidInput[0].innerHTML =
    inputsBirthday[0].value > 31 ||
    inputsBirthday[0].value == 0 ||
    inputsBirthday[0].value == "" ||
    /[^0-9]/gi.test(inputsBirthday[0].value)
      ? "invalid"
      : "";

  // month
  invalidInput[1].innerHTML =
    inputsBirthday[1].value > 12 ||
    inputsBirthday[1].value == 0 ||
    inputsBirthday[1].value == "" ||
    /[^0-9]/gi.test(inputsBirthday[1].value)
      ? "invalid"
      : "";

  // year
  invalidInput[2].innerHTML =
    inputsBirthday[2].value < 999 ||
    inputsBirthday[2].value == 0 ||
    inputsBirthday[2].value == "" ||
    new Date().getFullYear() <= +inputsBirthday[2].value ||
    /[^0-9]/gi.test(inputsBirthday[2].value)
      ? "invalid"
      : "";
}

/* *************************************************************************************** */

// to submit data to the page => (DOM)
function submitData() {
  const birthday = `${inputsBirthday[2].value}-${inputsBirthday[1].value}-${inputsBirthday[0].value}`;
  const age = calculateAge(birthday);

  // check if any input is wrong or not
  if (
    !(
      inputsBirthday[2].value > 999 &&
      inputsBirthday[0].value != 0 &&
      inputsBirthday[0].value != "" &&
      new Date().getFullYear() > inputsBirthday[2].value &&
      age.days &&
      age.months &&
      age.years
    )
  )
    return isWrog();

  writeBirthdayArray[0].innerHTML = age.days;
  writeBirthdayArray[1].innerHTML = age.months;
  writeBirthdayArray[2].innerHTML = age.years;

  invalidInput.forEach((element) => {
    element.innerHTML = "";
  });
}

/* *************************************************************************************** */

// event to start code
btnSubmit.addEventListener("click", () => {
  inputsBirthday.forEach((element, index) => {
    if (
      /[^0-9]/gi.test(element.value) ||
      inputsBirthday[index].value == 0 ||
      inputsBirthday[index].value == ""
    ) {
      invalidInput[index].innerHTML = "invalid input";
    } else {
      invalidInput[index].innerHTML = "";
    }
  });

  writeBirthdayArray.forEach((element) => {
    element.innerHTML = "--";
  });

  submitData();
});

/* *************************************************************************************** */

// event to clear every think
btnClear.addEventListener("click", () => {
  writeBirthdayArray.forEach((element) => {
    element.innerHTML = "--";
  });

  invalidInput.forEach((element) => {
    element.innerHTML = "";
  });

  inputsBirthday.forEach((element) => {
    element.value = "";
  });
});
