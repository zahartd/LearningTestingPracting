export const percentItemList = document.querySelectorAll(".quiz-statistics__percent-item");
export const unitsList = document.querySelectorAll(".quiz-statistics__unit");
let unitsCaptionList = document.querySelectorAll(".quiz-statistics__caption-item");


export function insertTotal(questionsNum) {
  const resultTotal = document.querySelector(".quiz-statistics_total span");
  resultTotal.innerHTML = `${questionsNum}`;
}

export function setStatisticsSettings(unit, percent) {
  unit[0].style.strokeDasharray = `${percent[0]} 100`;
  unit[0].style.strokeDashoffset = 0;
  for (let i = 1; i < unit.length; i++) {
    unit[i].style.strokeDasharray = `${percent[i]} 100`;
    if (percent[i - 1] == 0) {
      unit[i].style.strokeDashoffset = unit[i - 1].style.strokeDashoffset;
    } else if (percent[i + 1] == 0)  {
      unit[i].style.strokeDashoffset = percent[i - 1] * (-1);
    } else {
      if (i == unit.length - 1) {
        unit[i].style.strokeDashoffset = (100 - percent[i]) * (-1);
      } else {
        unit[i].style.strokeDashoffset = unit[i - 1].style.strokeDashoffset - percent[i];
      }
    }
  }
}

export function hoveredStatistics() {
  unitsCaptionList.forEach(function (item, index) {
    item.addEventListener("mouseover", function () {
      unitsList[index].classList.add("hovered");
    });

    item.addEventListener("mouseout", function () {
      unitsList[index].classList.remove("hovered");
    });
  });
}
