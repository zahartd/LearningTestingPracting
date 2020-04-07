export const percentItemList = document.querySelectorAll(".quiz-statistics__percent-item");
export const unitsList = document.querySelectorAll(".quiz-statistics__unit");
export let unitsCaptionList = document.querySelectorAll(".quiz-statistics__caption-item");


export function setStatisticsSettings(unit, percent) {
  unit[0].style.strokeDasharray = `${percent[0]} 100`;
  unit[0].style.strokeDashoffset = 0;
  unit[1].style.strokeDasharray = `${percent[1]} 100`;
  unit[1].style.strokeDashoffset = percent[0] * (-1);
  unit[2].style.strokeDasharray = `${percent[2]} 100`;
  unit[2].style.strokeDashoffset = (percent[0] + percent[1]) * (-1);
  // for ( let i = 1; i < unit.length; i++ ) {
  //   unit[i].style.strokeDasharray = `${percent[i]} 100`;
  //   if (percent[i - 1] == 0) {
  //     unit[i].style.strokeDashoffset = unit[i - 1].style.strokeDashoffset;
  //   } else if (percent[i + 1] == 0)  {
  //     unit[i].style.strokeDashoffset = percent[i - 1] * (-1);
  //   } else {
  //     if (i == unit.length - 1) {
  //       unit[i].style.strokeDashoffset = (100 - percent[i]) * (-1);
  //     } else {
  //       unit[i].style.strokeDashoffset = unit[i - 1].style.strokeDashoffset - percent[i];
  //     }
  //   }
  // }
}

export function hoveredStatistics(unitsList, unitsCaptionList) {
  unitsCaptionList.forEach(function (item, index) {
    item.addEventListener("mouseover", function () {
      if (index == 3) {
        unitsList[0].classList.add("quiz-statistics__unit_hovered");
        unitsList[1].classList.add("quiz-statistics__unit_hovered");
        unitsList[2].classList.add("quiz-statistics__unit_hovered");
      } else {
        unitsList[index].classList.add("hovered");
      }
    });

    item.addEventListener("mouseout", function () {
      if (index == 3) {
        unitsList[0].classList.remove("quiz-statistics__unit_hovered");
        unitsList[1].classList.remove("quiz-statistics__unit_hovered");
        unitsList[2].classList.remove("quiz-statistics__unit_hovered");
      } else {
        unitsList[index].classList.remove("quiz-statistics__unit_hovered");
      }
    });
  });
}
