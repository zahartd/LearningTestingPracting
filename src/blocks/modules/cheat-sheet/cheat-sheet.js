"use strict";

const accordionTriggers = document.querySelectorAll(".accordionTrigger");
const accordionThead = document.querySelectorAll(".cheat-sheet__thead");
const accordionTBody = document.querySelectorAll(".cheat-sheet__tbody");
console.log(accordionTriggers);
console.log(accordionThead);
console.log(accordionTBody);

for (let i = 0; i < accordionTriggers.length; i++) {
  const accordionTrigger = accordionTriggers[i];
  accordionTrigger.onclick = function () {
    accordionThead[i].classList.toggle("cheat-sheet__thead_collapsed");
    accordionTBody[i].classList.toggle("cheat-sheet__tbody_collapsed");
    accordionTrigger.classList.toggle("cheat-sheet__title_expanded");
  };
}