export const quizPercent = document.querySelector(".progress-ring__text");
export const progressCircle = document.querySelector(".progress-ring__circle");
export const progressRadius = progressCircle.r.baseVal.value;
export const progressCircumFerence = 2 * Math.PI * progressRadius;


export function setCircleSettings() {
  progressCircle.style.strokeDasharray = `${progressCircumFerence} ${progressCircumFerence}`;
  progressCircle.style.strokeDashoffset = progressCircumFerence;
}

export function setProgress(percent, circle, circumference) {
  const offset = circumference - percent / 100 * circumference;
  circle.style.strokeDashoffset = offset;
}
