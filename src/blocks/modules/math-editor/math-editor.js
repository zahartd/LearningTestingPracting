export const editorText = document.querySelector(".math-editor__text");
export const mathEditor = document.querySelector(".math-editor");
const result = document.querySelector("#resultBase");


mathEditor.onclick = function() {
  result.focus();
};
