const progressCircle = document.querySelector(".progress-ring__circle");
const resultCircleTrue = document.querySelector(".result-ring__circle_true");
const resultCircleWrong = document.querySelector(".result-ring__circle_wrong");
const progressRadius = progressCircle.r.baseVal.value;
const resultRadius = resultCircleTrue.r.baseVal.value;
const resultCircumFerence = 2 * Math.PI * resultRadius;
const progressCircumFerence = 2 * Math.PI * progressRadius;

progressCircle.style.strokeDasharray = `${progressCircumFerence} ${progressCircumFerence}`;
progressCircle.style.strokeDashoffset = progressCircumFerence;

resultCircleTrue.style.strokeDasharray = `${resultCircumFerence} ${resultCircumFerence}`;
resultCircleTrue.style.strokeDashoffset = resultCircumFerence;

// resultCircleWrong.style.strokeDasharray = `${resultCircumFerence} ${resultCircumFerence}`;
resultCircleWrong.style.strokeDashoffset = resultCircumFerence;