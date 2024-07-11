const buttons = document.querySelectorAll("button");
const inputResult = document.getElementById("user-input")
const outputResult = document.getElementById("output-result")
let expression = "";

let buttonArray = Array.from(buttons)

buttonArray.forEach(element => {
  element.addEventListener("click", () => {
    const value = element.value

    if (value == "ac") {
      clearAll();
    }
    else if (value == "del") {
      expression = expression.slice(0, -1)
      inputResult.value = expression
      outputResult.value = eval(expression)
      if (expression == "") (outputResult.value = "0");
    }
    else if (!isNaN(value)) {
      number(value)
    }
    else if (value == "+" || value == "-" || value == "*" || value == "/" || value == "%" || value == ".") {
      operator(value);
    }
    else if (value == "=") {
      output();
      if (inputResult == "") outputResult.value = ""
    }
  })
})

let clearAll = () => {
  expression = ""
  inputResult.value = ""
  outputResult.value = ""
}

let output = () => {
  let value = inputResult.value
  if (isNaN(value.slice(-1)) || value == " ") value = value.slice(0, -1);

  // console.log(value, value.length)
  outerLoop:
  for (let i = 0; i < value.length; i++) {
    while (value.charAt(i) === "0" || value.charAt(i) === " ") {
      if (value.charAt(i) === "0" && value.charAt(i + 1) === ".") break outerLoop;
      value = value.slice(1);
    }
  }

  inputResult.value = value.trim()

  try {
    outputResult.value = eval(value.trim());
  } catch (error) {
    outputResult.value = "Error";
  }
}

let operator = (value) => {
  expression += value;
  inputResult.value = expression
}

let number = (value) => {
  expression += value;
  inputResult.value = expression
  outputResult.value = eval(expression)
}

const switchTheme = document.querySelectorAll("#theme-switcher a")

switchTheme.forEach(element => {
  const linkTheme = document.getElementById("theme-link")

  element.addEventListener("click", () => {
    let theme = element.getAttribute("title")
    // console.log(theme)
    linkTheme.setAttribute("href", `./css/themes/${theme}.css`)

    switchTheme.forEach(active => active.classList.remove("active"));
    element.classList.toggle("active");
  })
});
