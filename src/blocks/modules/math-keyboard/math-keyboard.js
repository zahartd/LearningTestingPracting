import katex from "katex";
import renderMathInElement from "katex/dist/contrib/auto-render.min.js";
renderMathInElement(document.body);

const keyboardKeys = document.querySelectorAll(".keyboard .key");
const result = document.querySelector("#result");
const shiftKey = document.querySelector(".shift");
const capslockKey = document.querySelector(".capslock");
const editorText = document.querySelector(".editor__text");
let capslock = false;
let shift = false;
let keyboardKeyText;
let editorTextChild;
let removedEditorTextChild;

for (let i = 0; i < keyboardKeys.length; i++) {
    const keyboardKey = keyboardKeys[i];
    keyboardKeyText = keyboardKey.textContent;

    keyboardKey.onclick = function() {
        if (keyboardKeyText == "Backspace" ||
            keyboardKeyText == "Tab" ||
            keyboardKeyText == "Caps Lock" ||
            keyboardKeyText == "Shift" ||
            keyboardKeyText == "Space") {
            console.log(keyboardKeyText);

            if (keyboardKeyText == "Backspace") {
                editorTextChild = editorText.querySelectorAll(".katex");
                removedEditorTextChild = editorTextChild[editorTextChild.length - 1];
                removedEditorTextChild.remove();
                result.value = result.value.slice(0, result.value.length - 1);
                result.focus();
            }

            if (keyboardKeyText == "Tab") {
                result.value = result.value + "        ";
                editorText.textContent = editorText.textContent + "        ";
                result.focus();
            }

            if (keyboardKeyText == "Caps Lock") {

                if (capslock) {
                    capslockKey.style.color = "#929292";
                    capslock = false;
                } else {
                    capslockKey.style.color = "#ffffff";
                    capslock = true;
                }
            }

            if (keyboardKeyText == "Shift") {

                if (shift) {
                    shiftKey.style.color = "#929292";
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
            let textNode = katex.renderToString(keyboardKeyText);
            console.log(textNode);
            editorText.insertAdjacentHTML("beforeend", textNode);
            result.focus();
        }
    };
  
}