"use strict";


import katex from "katex";
import renderMathInElement from "katex/dist/contrib/auto-render.min.js";

let formula = [];
let capslock = false;
let shift = false;
let editorTextChild = "";
let removedEditorTextChild = "";
let keyboardInput = "";
let formulaPop = "";
let textNode = "";
let inputMode = [];
let modeHead = "";
let insertFormulaFractionBase = [];
let insertFormulaFractionA = [];
let insertFormulaFractionB = [];
let insertFormulaIndexBottomN = [];
let insertFormulaIndexBottomX = "";
let insertFormulaIndexTopX = [];
let insertFormulaIndexTopE = "";
const keyboard = document.querySelector(".keyboard");
const keyboardKeys = document.querySelectorAll(".keyboard .key");
const resultBase = document.querySelector("#resultBase");
const resultFractionA = document.querySelector("#resultFractionA");
const resultFractionB = document.querySelector("#resultFractionB");
const resultIndexBottom = document.querySelector("#resultIndexBottom");
const resultIndexTop = document.querySelector("#resultIndexTop");
const shiftKey = document.querySelector(".shift");
const capslockKey = document.querySelector(".capslock");
const editorText = document.querySelector(".math-editor__text");


function removeLastFormula() {
  try {
    editorTextChild = editorText.querySelectorAll(".katex");
    removedEditorTextChild = editorTextChild[editorTextChild.length - 1];
    removedEditorTextChild.remove();
    formulaPop = formula.pop();
  } catch(e) {
    console.log(e);
  }
  
  if (formula.length == 0) {
    inputMode = ["base"];
  }
  console.log(formula);
  return formulaPop;
}

function inputModeHead(i) {
  let inputModeHead;
  inputModeHead = inputMode[inputMode.length - i];

  return inputModeHead;
}

function changeModeInInput() {
  modeHead = inputModeHead(1);
  console.log("======");
  console.log(inputMode);
  console.log(modeHead);
  if (modeHead == "fractionA") {
    insertFormulaFractionA.pop();
    insertFormulaFractionA.push(keyboardInput);
    keyboardInput = "\\frac{" + insertFormulaFractionA.join("") + "}" + "{b}";
  } else if (modeHead == "fractionB") {
    insertFormulaFractionB.pop();
    insertFormulaFractionB.push(keyboardInput);
    keyboardInput = "\\frac{" + insertFormulaFractionA.join("") + "}" + "{" + insertFormulaFractionB.join("") + "}";
  }
  console.log(formula);
}



function changeModeInEnter() {
  modeHead = inputModeHead(2);
  if (!modeHead) {
    modeHead = inputModeHead(1);
  }
  console.log(inputMode);
  console.log(modeHead);
  if (modeHead == "fractionA") {
    inputMode.push("fractionA");
    resultFractionA.focus();
    inputFractionA();
  } else if (modeHead == "fractionB") {
    inputMode.push("fractionB");
    resultFractionB.focus();
    inputFractionB();
  } else {
    resultBase.focus();
  }
  console.log(formula);
}


// Input Base

function inputBase() {
  console.log("base");
  window.addEventListener("keydown", keydownBackspaceBase);
  window.removeEventListener("keydown", keydownBackspaceIndexBottom);
  window.removeEventListener("keydown", keydownEnterIndexBottom);
  window.removeEventListener("keydown", keydownBackspaceIndexTop);
  window.removeEventListener("keydown", keydownEnterIndexTop);
  window.removeEventListener("keydown", keydownBackspaceFractionB);
  window.removeEventListener("keydown", keydownEnterFractionB);
  inputKeyboardFormula();
  resultBase.oninput = function () {
    keyboardInput = resultBase.value;
    resultBase.value = "";
    textNode = katex.renderToString(keyboardInput) + " ";
    formula.push(keyboardInput);
    console.log(formula);
    console.log(textNode);
    editorText.insertAdjacentHTML("beforeend", textNode);
    resultBase.focus();
  };

}

function keydownBackspaceBase() {
  if (event.code === "Backspace") {
    removeLastFormula();
    resultBase.value = resultBase.value.slice(0, resultBase.value.length - 1);
    console.log(formula);
    resultBase.focus();
    if (formula.length == 0) {
      inputMode = ["base"];
    }
  }
}

// Input FractionA

function inputFractionA() {
  console.log("fractionA");
  window.removeEventListener("keydown", keydownBackspaceBase);
  window.removeEventListener("keydown", keydownBackspaceIndexBottom);
  window.removeEventListener("keydown", keydownEnterIndexBottom);
  window.removeEventListener("keydown", keydownBackspaceIndexTop);
  window.removeEventListener("keydown", keydownEnterIndexTop);
  window.addEventListener("keydown", keydownBackspaceFractionA);
  window.addEventListener("keydown", keydownEnterFractionA);
  keyboard.onclick = function () {
    if (inputModeHead(1) != "fractionA") {
      inputMode.push("fractionA");
    }
    inputKeyboardFormula();
  };
  resultFractionA.oninput = function () {
    insertFormulaFractionA.push(resultFractionA.value);
    resultFractionA.value = "";
    keyboardInput = "\\frac{" + insertFormulaFractionA.join("") + "}" + "{b}";
    textNode = katex.renderToString(keyboardInput) + " ";
    removeLastFormula();
    formula.push(keyboardInput);
    editorText.insertAdjacentHTML("beforeend", textNode);
    resultFractionA.focus();
    console.log(formula);
    console.log(insertFormulaFractionA);
  };
}

function keydownBackspaceFractionA() {
  if (event.code === "Backspace") {
    console.log("bs_fracA");
    resultFractionA.value = resultFractionA.value.slice(0, resultFractionA.value.length - 1);
    insertFormulaFractionA.pop();
    keyboardInput = "\\frac{" + insertFormulaFractionA.join("") + "}" + "{b}";
    textNode = katex.renderToString(keyboardInput) + " ";
    removeLastFormula();
    editorText.insertAdjacentHTML("beforeend", textNode);
  }
}

function keydownEnterFractionA() {
  if (event.code === "Enter") {
    inputMode.pop();
    if (inputModeHead(1) != "fractionB") {
      inputMode.push("fractionB");
    }
    resultFractionB.focus();
    inputFractionB();
  }
}

// Input FractionB

function inputFractionB() {
  console.log("fractionB");
  window.removeEventListener("keydown", keydownBackspaceFractionA);
  window.removeEventListener("keydown", keydownEnterFractionA);
  window.removeEventListener("keydown", keydownEnterIndexBottom);
  window.removeEventListener("keydown", keydownEnterIndexTop);
  window.addEventListener("keydown", keydownBackspaceFractionB);
  window.addEventListener("keydown", keydownEnterFractionB);
  keyboard.onclick = function () {
    if (inputModeHead(1) != "fractionB") {
      inputMode.push("fractionB");
    }
    inputKeyboardFormula();
  };
  resultFractionB.oninput = function () {
    insertFormulaFractionB.push(resultFractionB.value);
    resultFractionB.value = "";
    keyboardInput = "\\frac{" + insertFormulaFractionA.join("") + "}" + "{" + insertFormulaFractionB.join("") + "}";
    textNode = katex.renderToString(keyboardInput) + " ";
    removeLastFormula();
    formula.push(keyboardInput);
    editorText.insertAdjacentHTML("beforeend", textNode);
    resultFractionB.focus();
    console.log(formula);
    console.log(insertFormulaFractionB);
  };
}

function keydownBackspaceFractionB() {
  if (event.code === "Backspace") {
    console.log("bs_fracB");
    resultFractionB.value = resultFractionB.value.slice(0, resultFractionB.value.length - 1);
    insertFormulaFractionB.pop();
    keyboardInput = "\\frac{" + insertFormulaFractionA.join("") + "}" + "{" + insertFormulaFractionB.join("") + "}";
    textNode = katex.renderToString(keyboardInput) + " ";
    removeLastFormula();
    console.log(formula);
    editorText.insertAdjacentHTML("beforeend", textNode);
  }
}

function keydownEnterFractionB() {
  if (event.code === "Enter") {
    inputMode.pop();
    insertFormulaFractionA = [];
    insertFormulaFractionB = [];
    resultBase.focus();
    console.log(formula);
  }
}

// Input IndexBottom

function inputIndexBottom() {
  console.log("indexBottom");
  window.removeEventListener("keydown", keydownBackspaceBase);
  window.removeEventListener("keydown", keydownBackspaceIndexTop);
  window.removeEventListener("keydown", keydownBackspaceFractionA);
  window.removeEventListener("keydown", keydownBackspaceFractionB);
  window.removeEventListener("keydown", keydownEnterFractionA);
  window.removeEventListener("keydown", keydownEnterFractionB);
  window.removeEventListener("keydown", keydownEnterIndexTop);
  window.addEventListener("keydown", keydownBackspaceIndexBottom);
  window.addEventListener("keydown", keydownEnterIndexBottom);
  keyboard.onclick = function () {
    if (inputModeHead(1) != "indexBottom") {
      inputMode.push("indexBottom");
    }
    inputKeyboardFormula();
  };
  resultIndexBottom.oninput = function () {
    insertFormulaIndexBottomN.push(resultIndexBottom.value);
    resultIndexBottom.value = "";
    keyboardInput = insertFormulaIndexBottomX + "_" + "{" + insertFormulaIndexBottomN.join("") + "}";
    changeModeInInput();
    console.log(keyboardInput);
    textNode = katex.renderToString(keyboardInput) + " ";
    console.log(textNode);
    removeLastFormula();
    formula.push(keyboardInput);
    editorText.insertAdjacentHTML("beforeend", textNode);
    console.log(formula);
    resultIndexBottom.focus();
  };
}

function keydownBackspaceIndexBottom() {
  if (event.code === "Backspace") {
    console.log("bs_indexBottom");
    removeLastFormula();
    resultIndexBottom.value = resultIndexBottom.value.slice(0, resultIndexBottom.value.length - 1);
    insertFormulaIndexBottomN.pop();
    console.log(insertFormulaIndexBottomN);
    keyboardInput = insertFormulaIndexBottomX + "_" + "{" + insertFormulaIndexBottomN.join("") + "}";
    changeModeInInput();
    console.log(keyboardInput);
    textNode = katex.renderToString(keyboardInput) + " ";
    console.log(textNode);
    formula.push(keyboardInput);
    console.log(formula);
    editorText.insertAdjacentHTML("beforeend", textNode);
  }
}

function keydownEnterIndexBottom() {
  if (event.code === "Enter") {
    inputMode.pop();
    changeModeInEnter();
    insertFormulaIndexBottomN = [];
    console.log(formula);
  }
}

// Input IndexTop

function inputIndexTop() {
  console.log("indexTop");
  window.removeEventListener("keydown", keydownBackspaceBase);
  window.removeEventListener("keydown", keydownBackspaceIndexBottom);
  window.removeEventListener("keydown", keydownBackspaceFractionA);
  window.removeEventListener("keydown", keydownBackspaceFractionB);
  window.removeEventListener("keydown", keydownEnterFractionA);
  window.removeEventListener("keydown", keydownEnterFractionB);
  window.removeEventListener("keydown", keydownEnterIndexBottom);
  window.addEventListener("keydown", keydownBackspaceIndexTop);
  window.addEventListener("keydown", keydownEnterIndexTop);
  keyboard.onclick = function () {
    if (inputModeHead(1) != "indexTop") {
      inputMode.push("indexTop");
    }
    inputKeyboardFormula();
  };
  resultIndexTop.oninput = function () {
    insertFormulaIndexTopX.push(resultIndexTop.value);
    resultIndexTop.value = "";
    keyboardInput = insertFormulaIndexTopE + "^" + "{" + insertFormulaIndexTopX.join("") + "}";
    changeModeInInput();
    console.log(keyboardInput);
    textNode = katex.renderToString(keyboardInput) + " ";
    console.log(textNode);
    removeLastFormula();
    formula.push(keyboardInput);
    console.log(formula);
    editorText.insertAdjacentHTML("beforeend", textNode);
    resultIndexTop.focus();
  };
}

function keydownBackspaceIndexTop() {
  if (event.code === "Backspace") {
    console.log("bs_indexTop");
    removeLastFormula();
    resultIndexTop.value = resultIndexTop.value.slice(0, resultIndexTop.value.length - 1);
    insertFormulaIndexTopX = insertFormulaIndexTopX.slice(0, insertFormulaIndexTopX.length - 1);
    console.log(insertFormulaIndexTopX);
    keyboardInput = insertFormulaIndexTopE + "^" + "{" + insertFormulaIndexTopX + "}";
    changeModeInInput();
    console.log(keyboardInput);
    textNode = katex.renderToString(keyboardInput) + " ";
    console.log(textNode);
    formula.push(keyboardInput);
    console.log(formula);
    editorText.insertAdjacentHTML("beforeend", textNode);
  }
}

function keydownEnterIndexTop() {
  if (event.code === "Enter") {
    inputMode.pop();
    changeModeInEnter();
    insertFormulaIndexTopX = [];
    console.log(formula);
  }
}



function inputKeyboardFormula() {
  for (let i = 0; i < keyboardKeys.length; i++) {
    const keyboardKey = keyboardKeys[i];
    let keyboardKeyText = keyboardKey.textContent;
    const keyboardKeyClass = keyboardKey.querySelector("span").className;

    keyboardKey.onclick = function () {
      if (keyboardKeyText == "Tab" ||
        keyboardKeyText == "Caps Lock" ||
        keyboardKeyText == "Shift" ||
        keyboardKeyText == "Backspace" ||
        keyboardKeyText == "Space") {

        console.log(keyboardKeyText);

        if (keyboardKeyText == "Backspace") {
          switch (inputMode) {
          case "base":
            removeLastFormula();
            resultBase.value = resultBase.value.slice(0, resultBase.value.length - 1);
            formula.pop();
            console.log(formula);
            resultBase.focus();
            break;
          case "fractionA":
            removeLastFormula();
            resultFractionA.value = resultFractionA.value.slice(0, resultFractionA.value.length - 1);
            console.log("bs_fracA");
            insertFormulaFractionA.pop();
            console.log(insertFormulaFractionA);
            keyboardInput = "\\frac{" + insertFormulaFractionA.join("") + "}" + "{b}";
            console.log(keyboardInput);
            textNode = katex.renderToString(keyboardInput) + " ";
            console.log(textNode);
            editorText.insertAdjacentHTML("beforeend", textNode);
            resultFractionA.focus();
            break;
          case "fractionB":
            removeLastFormula();
            resultFractionB.value = resultFractionB.value.slice(0, resultFractionB.value.length - 1);
            console.log("bs_fracB");
            insertFormulaFractionB.pop();
            console.log(insertFormulaFractionB);
            keyboardInput = "\\frac{" + insertFormulaFractionA.join("") + "}" + "{" + insertFormulaFractionB.join("") + "}";
            console.log(keyboardInput);
            textNode = katex.renderToString(keyboardInput) + " ";
            console.log(textNode);
            editorText.insertAdjacentHTML("beforeend", textNode);
            resultFractionB.focus();
            break;
          case "IU":
            removeLastFormula();
            resultIndexBottom.value = resultIndexBottom.value.slice(0, resultIndexBottom.value.length - 1);
            console.log("bs_index");
            insertFormulaIndexBottomN.pop();
            console.log(insertFormulaIndexBottomN);
            keyboardInput = insertFormulaIndexBottomX + "_" + "{" + insertFormulaIndexBottomN.join("") + "}" + " ";
            console.log(keyboardInput);
            textNode = katex.renderToString(keyboardInput) + " ";
            console.log(textNode);
            editorText.insertAdjacentHTML("beforeend", textNode);
            resultIndexBottom.focus();
            break;
          case "indexTop":
            removeLastFormula();
            resultIndexTop.value = resultIndexTop.value.slice(0, resultIndexTop.value.length - 1);
            console.log("bs_index");
            insertFormulaIndexTopX = insertFormulaIndexTopX.slice(0, insertFormulaIndexTopX.length - 1);
            console.log(insertFormulaIndexTopX);
            keyboardInput = insertFormulaIndexTopE + "^" + "{" + insertFormulaIndexTopX + "}" + " ";
            console.log(keyboardInput);
            textNode = katex.renderToString(keyboardInput) + " ";
            console.log(textNode);
            editorText.insertAdjacentHTML("beforeend", textNode);
            resultIndexTop.focus();
            break;
          default:

            break;
          }
        }


        if (keyboardKeyText == "Tab") {
          resultBase.value = resultBase.value + "        ";
          editorText.textContent = editorText.textContent + "        ";
          resultBase.focus();
        }

        if (keyboardKeyText == "Caps Lock") {

          if (capslock) {
            capslockKey.style.color = "#4e2f2f";
            capslock = false;
          } else {
            capslockKey.style.color = "#ffffff";
            capslock = true;
          }
        }

        if (keyboardKeyText == "Shift") {

          if (shift) {
            shiftKey.style.color = "#4e2f2f";
            shift = false;
          } else {
            shiftKey.style.color = "#ffffff";
            shift = true;
          }
        }

        if (keyboardKeyText == "Space") {
          editorText.insertAdjacentHTML("beforeend", " ");
          resultBase.value = resultBase.value + " ";
          resultBase.focus();
        }

      } else {
        if (capslock) {
          keyboardKeyText = keyboardKeyText.toUpperCase();
        }

        if (shift) {
          keyboardKeyText = shift.querySelector("sup").textContent;
        }

        console.log(keyboardKeyText);
        console.log(keyboardKeyClass);

        switch (keyboardKeyClass) {
        case "derivative":
          keyboardKeyText = "'";
          break;
        case "two-derivative":
          keyboardKeyText = "''";
          break;
        case "sum":
          keyboardKeyText = "\\sum";
          break;
        case "integral":
          keyboardKeyText = "\\int";
          break;
        case "plus":
          keyboardKeyText = "+";
          break;
        case "minus":
          keyboardKeyText = "-";
          break;
        case "times":
          keyboardKeyText = "*";
          break;
        case "division":
          keyboardKeyText = "/";
          break;
        case "plus-minus":
          keyboardKeyText = "\\pm";
          break;
        case "cosine":
          keyboardKeyText = "\\cos";
          break;
        case "sine":
          keyboardKeyText = "\\sin";
          break;
        case "tan":
          keyboardKeyText = "\\tg";
          break;
        case "equally":
          keyboardKeyText = "=";
          break;
        case "phi":
          keyboardKeyText = "\\phi";
          break;
        case "rho":
          keyboardKeyText = "\\rho";
          break;
        case "nu":
          keyboardKeyText = "\\nu";
          break;
        case "alpha":
          keyboardKeyText = "\\alpha";
          break;
        case "beta":
          keyboardKeyText = "\\beta";
          break;
        case "gamma":
          keyboardKeyText = "\\gamma";
          break;
        case "delta":
          keyboardKeyText = "\\delta";
          break;
        case "eta":
          keyboardKeyText = "\\eta";
          break;
        case "lambda":
          keyboardKeyText = "\\lambda";
          break;
        case "mu":
          keyboardKeyText = "\\mu";
          break;
        case "pi":
          keyboardKeyText = "\\pi";
          break;
        case "sigma":
          keyboardKeyText = "\\sigma";
          break;
        case "epsilon":
          keyboardKeyText = "\\epsilon";
          break;
        case "varepsilon":
          keyboardKeyText = "\\varepsilon";
          break;
        case "vartheta":
          keyboardKeyText = "\\vartheta";
          break;
        case "thetasym":
          keyboardKeyText = "\\thetasym";
          break;
        case "varphi":
          keyboardKeyText = "\\varphi";
          break;
        case "varDelta":
          keyboardKeyText = "\\varDelta";
          break;
        case "infinity":
          keyboardKeyText = "\\infty";
          break;
        case "percent":
          keyboardKeyText = "\\%";
          break;
        case "prod":
          keyboardKeyText = "\\prod";
          break;
        case "sqrt":
          console.log(formula);
          insertFormulaFractionBase = formula.join("");
          editorText.innerHTML = "";
          formula = [];
          keyboardKeyText = "\\sqrt{" + insertFormulaFractionBase + "}";
          break;
        case "vector":
          console.log(formula);
          console.log(inputMode);
          modeHead = inputModeHead(1);
          switch (modeHead) {
          case "base":
            insertFormulaFractionBase = formula.pop();
            removeLastFormula();
            resultBase.focus();
            break;
          case "fractionA":
            insertFormulaFractionBase = insertFormulaFractionA.pop();
            resultFractionA.focus();
            break;
          case "fractionB":
            insertFormulaFractionBase = insertFormulaFractionB.pop();
            resultFractionB.focus();
            break;
          }
          keyboardKeyText = "\\vec{" + insertFormulaFractionBase + "}";
          console.log(formula);
          break;
        case "index-b":
          console.log(formula);
          resultIndexBottom.focus();
          inputIndexBottom();
          modeHead  = inputModeHead(1);
          console.log(modeHead);
          switch (modeHead) {
          case "base":
            insertFormulaIndexBottomX = removeLastFormula();
            break;
          case "fractionA":
            insertFormulaIndexBottomX = insertFormulaFractionA.pop();
            break;
          case "fractionB":
            insertFormulaIndexBottomX = insertFormulaFractionB.pop();
            break;
          }

          console.log(formula);
          console.log(insertFormulaIndexBottomX);
          keyboardKeyText = insertFormulaIndexBottomX + "_n";
          break;
        case "index-t":
          console.log(formula);
          resultIndexTop.focus();
          inputIndexTop();
          modeHead  = inputModeHead(1);
          console.log(modeHead);
          switch (modeHead) {
          case "base":
            insertFormulaIndexTopE = removeLastFormula();
            break;
          case "fractionA":
            insertFormulaIndexTopE = insertFormulaFractionA.pop();
            break;
          case "fractionB":
            insertFormulaIndexTopE = insertFormulaFractionB.pop();
            break;
          }
          
          console.log(formula);
          keyboardKeyText = insertFormulaIndexTopE + "^x";
          break;
        case "fraction":
          console.log(formula);
          resultFractionA.focus();
          inputFractionA();
          keyboardKeyText = "\\frac{a}{b}";
          console.log(formula);
          break;
        default:
          console.log("it is goodness");
        }
        
        inputMode[0] = "base";
        console.log(inputMode);
        console.log(formula);
        modeHead = inputModeHead(1);
        console.log(modeHead);
        switch (modeHead) {
        case "base":
          formula.push(keyboardKeyText);
          console.log(formula);
          textNode = katex.renderToString(keyboardKeyText) + " ";
          console.log(textNode);
          editorText.insertAdjacentHTML("beforeend", textNode);
          console.log(keyboardKeyClass);
          if (keyboardKeyClass == "index-b" || keyboardKeyClass == "index-t" || keyboardKeyClass == "fraction") {
            console.log("LOL");
          } else {
            resultBase.focus();
          }
          break;
        case "fractionA":
          insertFormulaFractionA.push(keyboardKeyText);
          console.log(keyboardKeyText);
          console.log(insertFormulaFractionA);
          keyboardInput = "\\frac{" + insertFormulaFractionA.join("") + "}" + "{b}";

          console.log(keyboardInput);
          textNode = katex.renderToString(keyboardInput) + " ";
          console.log(textNode);
          removeLastFormula();
          formula.push(keyboardInput);
          editorText.insertAdjacentHTML("beforeend", textNode);
          if (inputMode == "fractionA") {
            resultFractionA.focus();
          }
          break;
        case "fractionB":
          insertFormulaFractionB.push(keyboardKeyText);
          keyboardInput = "\\frac{" + insertFormulaFractionA.join("") + "}" + "{" + insertFormulaFractionB.join("") + "}";
          console.log(keyboardInput);
          textNode = katex.renderToString(keyboardInput) + " ";
          console.log(textNode);
          removeLastFormula();
          editorText.insertAdjacentHTML("beforeend", textNode);
          if (inputMode == "fractionB") {
            resultFractionB.focus();
          }
          break;
        case "indexBottom":
          insertFormulaIndexBottomN.push(keyboardKeyText);
          keyboardInput = insertFormulaIndexBottomX + "_" + "{" + insertFormulaIndexBottomN.join("") + "}";
          console.log(keyboardInput);
          textNode = katex.renderToString(keyboardInput) + " ";
          console.log(textNode);
          removeLastFormula();
          editorText.insertAdjacentHTML("beforeend", textNode);
          resultIndexBottom.focus();
          break;
        case "indexTop":
          insertFormulaIndexTopX += keyboardKeyText;
          keyboardInput = insertFormulaIndexTopE + "^" + "{" + insertFormulaIndexTopX + "}";
          console.log(keyboardInput);
          textNode = katex.renderToString(keyboardInput) + " ";
          console.log(textNode);
          removeLastFormula();
          editorText.insertAdjacentHTML("beforeend", textNode);
          resultIndexTop.focus();
          break;
        default:
          console.log("zz");
        }
        console.log(formula);
      }
    };

  }
}

resultBase.onfocus = function () {
  changeModeInEnter();
  inputKeyboardFormula();
  inputBase();
};

inputMode.push("base");

modeHead = inputModeHead(1);

inputKeyboardFormula();

renderMathInElement(document.body);
