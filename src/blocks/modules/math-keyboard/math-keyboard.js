import katex from "katex";
import renderMathInElement from "katex/dist/contrib/auto-render.min.js";


const keyboardKeys = document.querySelectorAll(".keyboard .key");
const result = document.querySelector("#result");
const resultA = document.querySelector("#result-a");
const resultB = document.querySelector("#result-b");
const resultIU = document.querySelector("#result-iu");
const resultIndexTop = document.querySelector("#resultIndexTop");
const shiftKey = document.querySelector(".shift");
const capslockKey = document.querySelector(".capslock");
const editorText = document.querySelector(".math-editor__text");
let formula = [];
let capslock = false;
let shift = false;
let editorTextChild;
let removedEditorTextChild;
let keyboardInput;
let textNode;
let inputMode = "base";
let insertFormula;
let insertFormulaA = [];
let insertFormulaB = [];
let insertFormulaN = [];
let insertFormulaX = "";
let insertFormulaIndexTopE = "";
let insertFormulaIndexTopX = "";
let mode = "base";

function removeLastFormula() {
    editorTextChild = editorText.querySelectorAll(".katex");
    removedEditorTextChild = editorTextChild[editorTextChild.length - 1];
    removedEditorTextChild.remove();
}

function inputFormuls(mode) {
    if (mode == "fractionA") {
        console.log("fractionA");
        window.addEventListener("keydown", keydownBackspaceFractionA);
        window.addEventListener("keydown", keydownEnterFractionA);
        window.removeEventListener("keydown", keydownBackspaceBase);
        window.removeEventListener("keydown", keydownBackspaceIndexUnder);
        window.removeEventListener("keydown", keydownEnterIndex);
        inputKeyboardFormula(mode);
        resultA.oninput = function() {
            insertFormulaA.push(resultA.value);
            resultA.value = "";
            keyboardInput = "\\frac{" + insertFormulaA.join("") + "}" + "{b}";
            console.log(keyboardInput);
            textNode = katex.renderToString(keyboardInput) + " ";
            console.log(textNode);
            formula.pop();
            formula.push(keyboardInput);
            removeLastFormula();
            editorText.insertAdjacentHTML("beforeend", textNode);
            resultA.focus();
        };

    } else if (mode == "fractionB") {
        console.log("fractionB");
        window.addEventListener("keydown", keydownBackspaceFractionB);
        window.addEventListener("keydown", keydownEnterFractionB);
        window.removeEventListener("keydown", keydownBackspaceFractionA);
        window.removeEventListener("keydown", keydownEnterFractionA);
        inputKeyboardFormula(mode);
        resultB.oninput = function() {
            insertFormulaB.push(resultB.value);
            resultB.value = "";
            keyboardInput = "\\frac{" + insertFormulaA.join("") + "}" + "{" + insertFormulaB.join("") + "}";
            console.log(keyboardInput);
            textNode = katex.renderToString(keyboardInput) + " ";
            console.log(textNode);
            formula.pop();
            formula.push(keyboardInput);
            removeLastFormula();
            editorText.insertAdjacentHTML("beforeend", textNode);
            resultB.focus();
        };
    } else if (mode == "IU") {
        console.log("IU");
        window.addEventListener("keydown", keydownBackspaceIndexUnder);
        window.addEventListener("keydown", keydownEnterIndex);
        window.removeEventListener("keydown", keydownBackspaceBase);
        inputKeyboardFormula(mode);
        resultIU.oninput = function() {
            insertFormulaN.push(resultIU.value);
            resultIU.value = "";
            keyboardInput = insertFormulaX + "_" + "{" + insertFormulaN.join("") + "}" + " ";
            console.log(keyboardInput);
            textNode = katex.renderToString(keyboardInput) + " ";
            console.log(textNode);
            formula.pop();
            formula.push(keyboardInput);
            removeLastFormula();
            editorText.insertAdjacentHTML("beforeend", textNode);
            resultIU.focus();
        };
    } else if (mode == "indexTop") {
        console.log("indexTop");
        window.addEventListener("keydown", keydownBackspaceIndexTop);
        window.addEventListener("keydown", keydownEnterIndex);
        window.removeEventListener("keydown", keydownBackspaceBase);
        inputKeyboardFormula(mode);
        resultIndexTop.oninput = function() {
            insertFormulaIndexTopX += resultIndexTop.value;
            resultIndexTop.value = "";
            keyboardInput = insertFormulaIndexTopE + "^" + "{" + insertFormulaIndexTopX + "}" + " ";
            console.log(keyboardInput);
            textNode = katex.renderToString(keyboardInput) + " ";
            console.log(textNode);
            removeLastFormula();
            formula.pop();
            formula.push(keyboardInput);
            editorText.insertAdjacentHTML("beforeend", textNode);
            resultIndexTop.focus();
        };
    } else if (mode == "base") {
        console.log("base");
        window.addEventListener("keydown", keydownBackspaceBase);
        window.removeEventListener("keydown", keydownBackspaceIndexUnder);
        window.removeEventListener("keydown", keydownBackspaceIndexTop);
        inputKeyboardFormula(mode);
        result.oninput = function() {
            keyboardInput = result.value;
            result.value = "";
            textNode = katex.renderToString(keyboardInput) + " ";
            formula.push(keyboardInput);
            console.log(formula);
            console.log(textNode);
            editorText.insertAdjacentHTML("beforeend", textNode);
            result.focus();
        };
    }

}

renderMathInElement(document.body);

result.onfocus = function() {
    inputFormuls("base");
};

// resultIU.onfocus = function() {
//     inputFormuls('iu', null);
// }

function keydownBackspaceBase() {
    if (event.code === "Backspace") {
        removeLastFormula();
        result.value = result.value.slice(0, result.value.length - 1);
        formula.pop();
        console.log(formula);
        result.focus();
    }
}

function keydownBackspaceIndexUnder() {
    if (event.code === "Backspace") {
        removeLastFormula();
        // if (mode == 'keyboard') {


        // } else if (mode == 'editor') {
        resultIU.value = resultIU.value.slice(0, resultIU.value.length - 1);
        console.log("bs_index");
        insertFormulaN.pop();
        console.log(insertFormulaN);
        keyboardInput = insertFormulaX + "_" + "{" + insertFormulaN.join("") + "}" + " ";
        console.log(keyboardInput);
        textNode = katex.renderToString(keyboardInput) + " ";
        console.log(textNode);
        editorText.insertAdjacentHTML("beforeend", textNode);
    }
}

function keydownBackspaceIndexTop() {
    if (event.code === "Backspace") {
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
    }
}

function keydownBackspaceFractionA() {
    if (event.code === "Backspace") {
        removeLastFormula();
        resultA.value = resultA.value.slice(0, resultA.value.length - 1);
        console.log("bs_fracA");
        insertFormulaA.pop();
        console.log(insertFormulaA);
        keyboardInput = "\\frac{" + insertFormulaA.join("") + "}" + "{b}";
        console.log(keyboardInput);
        textNode = katex.renderToString(keyboardInput) + " ";
        console.log(textNode);
        editorText.insertAdjacentHTML("beforeend", textNode);
    }
}

function keydownBackspaceFractionB() {
    if (event.code === "Backspace") {
        removeLastFormula();
        resultB.value = resultB.value.slice(0, resultB.value.length - 1);
        console.log("bs_fracB");
        insertFormulaB.pop();
        console.log(insertFormulaB);
        keyboardInput = "\\frac{" + insertFormulaA.join("") + "}" + "{" + insertFormulaB.join("") + "}";
        console.log(keyboardInput);
        textNode = katex.renderToString(keyboardInput) + " ";
        console.log(textNode);
        editorText.insertAdjacentHTML("beforeend", textNode);
    }
}

function keydownEnterIndex() {
    if (event.code === "Enter") {
        inputMode = "base";
        result.focus();
    }
}

function keydownEnterFractionA() {
    if (event.code === "Enter") {
        inputMode = "fractionB";
        resultB.focus();
        inputFormuls("fractionB");
    }
}

function keydownEnterFractionB() {
    if (event.code === "Enter") {
        inputMode = "base";
        result.focus();
    }
}

// keydownBackspace('base');

// window.addEventListener('keydown', (event) => {
//     if (event.code === 'CapsLock') {

//         if (capslock) {
//             capslockKey.style.color = "#4e2f2f";
//             capslock = false;
//         } else {
//             capslockKey.style.color = "#ffffff";
//             capslock = true;
//         }
//     }
// });

// window.addEventListener('keydown', (event) => {
//     if (event.code === 'ShiftLeft') {

//         if (shift) {
//             shiftKey.style.color = "#4e2f2f";
//             shift = false;
//         } else {
//             shiftKey.style.color = "#ffffff";
//             shift = true;
//         }
//     }
// });


function inputKeyboardFormula(mode) {
    for (let i = 0; i < keyboardKeys.length; i++) {
        const keyboardKey = keyboardKeys[i];
        let keyboardKeyText = keyboardKey.textContent;
        const keyboardKeyClass = keyboardKey.querySelector("span").className;

        keyboardKey.onclick = function() {
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
                        result.value = result.value.slice(0, result.value.length - 1);
                        formula.pop();
                        console.log(formula);
                        result.focus();
                        break;
                    case "fractionA":
                        removeLastFormula();
                        resultA.value = resultA.value.slice(0, resultA.value.length - 1);
                        console.log("bs_fracA");
                        insertFormulaA.pop();
                        console.log(insertFormulaA);
                        keyboardInput = "\\frac{" + insertFormulaA.join("") + "}" + "{b}";
                        console.log(keyboardInput);
                        textNode = katex.renderToString(keyboardInput) + " ";
                        console.log(textNode);
                        editorText.insertAdjacentHTML("beforeend", textNode);
                        resultA.focus();
                        break;
                    case "fractionB":
                        removeLastFormula();
                        resultB.value = resultB.value.slice(0, resultB.value.length - 1);
                        console.log("bs_fracB");
                        insertFormulaB.pop();
                        console.log(insertFormulaB);
                        keyboardInput = "\\frac{" + insertFormulaA.join("") + "}" + "{" + insertFormulaB.join("") + "}";
                        console.log(keyboardInput);
                        textNode = katex.renderToString(keyboardInput) + " ";
                        console.log(textNode);
                        editorText.insertAdjacentHTML("beforeend", textNode);
                        resultB.focus();
                        break;
                    case "IU":
                        removeLastFormula();
                        resultIU.value = resultIU.value.slice(0, resultIU.value.length - 1);
                        console.log("bs_index");
                        insertFormulaN.pop();
                        console.log(insertFormulaN);
                        keyboardInput = insertFormulaX + "_" + "{" + insertFormulaN.join("") + "}" + " ";
                        console.log(keyboardInput);
                        textNode = katex.renderToString(keyboardInput) + " ";
                        console.log(textNode);
                        editorText.insertAdjacentHTML("beforeend", textNode);
                        resultIU.focus();
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
                    result.value = result.value + "        ";
                    editorText.textContent = editorText.textContent + "        ";
                    result.focus();
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
                    result.value = result.value + " ";
                    result.focus();
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

                switch(keyboardKeyClass) {
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
                    insertFormula = formula.join("");
                    console.log(insertFormula);
                    editorText.innerHTML = "";
                    formula = [];
                    keyboardKeyText = "\\sqrt{" + insertFormula + "}";
                    break;
                case "vector":
                    insertFormula = formula.pop();
                    removeLastFormula();
                    console.log(insertFormula);
                    keyboardKeyText = "\\vec{"+ insertFormula +"}";
                    break;
                case "index-u":
                    inputMode = "IU";
                    resultIU.focus();
                    console.log(formula);
                    insertFormulaX = formula.pop();
                    console.log(insertFormulaX);
                    removeLastFormula();
                    console.log(formula);
                    inputFormuls(inputMode);
                    console.log(formula);
                    keyboardKeyText = insertFormulaX + "_n";
                    break;
                case "index-t":
                    inputMode = "indexTop";
                    resultIndexTop.focus();
                    console.log(formula);
                    insertFormulaIndexTopE = formula.pop();
                    console.log(insertFormulaIndexTopE);
                    removeLastFormula();
                    console.log(formula);
                    inputFormuls(inputMode);
                    console.log(formula);
                    keyboardKeyText = insertFormulaIndexTopE + "^x";
                    break;
                case "fraction":
                    inputMode = "fractionA";
                    resultA.focus();
                    console.log(formula);
                    inputFormuls(inputMode);
                    console.log(formula);
                    keyboardKeyText = "\\frac{a}{b}";
                    break;
                default:
                    console.log("it is goodness");
                }


                if ( keyboardKeyClass == "index-u" || keyboardKeyClass == "index-t" || keyboardKeyClass == "fraction" ) {
                    console.log("LOL2");
                } else {
                    mode = "base";
                }

                switch(mode) {
                case "base":
                    formula.push(keyboardKeyText);
                    console.log(formula);
                    textNode = katex.renderToString(keyboardKeyText) + " ";
                    console.log(textNode);
                    editorText.insertAdjacentHTML("beforeend", textNode);
                    console.log(keyboardKeyClass);
                    if ( keyboardKeyClass == "index-u" || keyboardKeyClass == "index-t" || keyboardKeyClass == "fraction" ) {
                        console.log("LOL");
                    } else {
                        result.focus();
                    }
                    break;
                case "fractionA":
                    insertFormulaA.push(keyboardKeyText);
                    keyboardInput = "\\frac{" + insertFormulaA.join("") + "}" + "{b}";
                    console.log(keyboardInput);
                    textNode = katex.renderToString(keyboardInput) + " ";
                    console.log(textNode);
                    removeLastFormula();
                    editorText.insertAdjacentHTML("beforeend", textNode);
                    resultA.focus();
                    break;
                case "fractionB":
                    insertFormulaB.push(keyboardKeyText);
                    keyboardInput = "\\frac{" + insertFormulaA.join("") + "}" + "{" + insertFormulaB.join("") + "}";
                    console.log(keyboardInput);
                    textNode = katex.renderToString(keyboardInput) + " ";
                    console.log(textNode);
                    removeLastFormula();
                    editorText.insertAdjacentHTML("beforeend", textNode);
                    resultB.focus();
                    break;
                case "IU":
                    insertFormulaN.push(keyboardKeyText);
                    keyboardInput = insertFormulaX + "_" + "{" + insertFormulaN.join("") + "}" + " ";
                    console.log(keyboardInput);
                    textNode = katex.renderToString(keyboardInput) + " ";
                    console.log(textNode);
                    removeLastFormula();
                    editorText.insertAdjacentHTML("beforeend", textNode);
                    resultIU.focus();
                    break;
                case "indexTop":
                    insertFormulaIndexTopX += keyboardKeyText;
                    keyboardInput = insertFormulaIndexTopE + "^" + "{" + insertFormulaIndexTopX + "}" + " ";
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
            }
        };
      
    }
}

inputKeyboardFormula(mode);

