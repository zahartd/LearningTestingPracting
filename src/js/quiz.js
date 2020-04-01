"use strict";


import katex from "%node_modules%/katex/dist/katex.js";
import renderMathInElement from "%node_modules%/katex/dist/contrib/auto-render.js";
import answerQuestions from "./assets/answers.json";
import * as progress from "%modules%/quiz-progress/quiz-progress.js";
import * as editor from "%modules%/math-editor/math-editor.js";
import * as keyboard from "%modules%/math-keyboard/math-keyboard.js";
import * as statistics from "%modules%/quiz-statistics/quiz-statistics.js";
import insertAnswers from "%modules%/quiz-result/__answers/quiz-result__answers.js";


const quizPages = document.querySelector(".quiz-pages");
const quizTheme = quizPages.getAttribute("data-quiz-theme");
const questionsNum = answerQuestions[quizTheme]["length"];
const percentPlus = Math.round(100 / questionsNum);
let percent = 0;
let percentTrue = null;
let percentWrong = null;
let percentNull = null;
let percentList = [];
// let formula = keyboard.formula;
let answersArray = [];
let pointsTrue = 0;
let pointsWrong = 0;
let pointsNull = 0;
let ans = "";
let trueContent = null;
let userContent = null;



// Проверка ответов
function checkAnswers(quizTheme) {
  for (let i = 0; i < answersArray.length; i++) {
    // Вставка привильных ответов и ответов пользователя
    ans = answersArray[i];
    trueContent = katex.renderToString(answerQuestions[quizTheme][i]["trueAnswer"].replace("\\\\", "\\"));
    userContent = katex.renderToString(ans);
    insertAnswers(questionsNum, trueContent, userContent);

    // Проверка ответов и зачисление очков
    if (ans === answerQuestions[quizTheme][i]["trueAnswer"]) {
      answerQuestions[quizTheme][i]["userAnswer"] = ans;
      pointsTrue++;
    } else if (ans == "" || ans == null) {
      pointsNull++;
    }
    pointsWrong = questionsNum - pointsTrue - pointsNull;

  }

  // Перевод очков в проценты
  percentTrue = Math.round(pointsTrue / questionsNum * 100);
  percentWrong = Math.round(pointsWrong / questionsNum * 100);
  percentNull = 100 - percentTrue - percentWrong;
  percentList.push(percentTrue, percentWrong, percentNull);

  // Вставка очков
  statistics.percentItemList[0].innerHTML = `${pointsTrue}`;
  statistics.percentItemList[1].innerHTML = `${pointsWrong}`;
  statistics.percentItemList[2].innerHTML = `${pointsNull}`;

  // Отрисовка статистики
  statistics.setStatisticsSettings(statistics.unitsList, percentList);
}

// Вставка вопросов
function insertQuestions(answerQuestions, questionsNum, quizTheme) {
  for ( let i = 0; i < questionsNum; i++ ) {
    // Создание элемнов
    let quizPage = document.createElement("div");
    let quizPageTitle = document.createElement("h2");
    let quizPageNext = document.createElement("button");

    if (i == questionsNum - 1) {
      quizPageNext = document.createElement("a");
      quizPageNext.setAttribute("href", "result.html");
    }

    // Добавление классов элементам
    quizPage.classList.add("quiz-page");
    quizPageTitle.classList.add("quiz-page__title");
    quizPageNext.classList.add("quiz-page__next");
    // Добавление класса display-none
    if (i > 0) {
      quizPage.classList.add("display-none");
    }

    // Добавление текста
    quizPageNext.textContent = "Далее";
    quizPageTitle.textContent = answerQuestions[quizTheme][i]["question"];

    // Вставка элементов
    quizPage.insertAdjacentElement( "beforeend", quizPageTitle );
    quizPage.insertAdjacentElement( "beforeend", quizPageNext );
    quizPages.insertAdjacentElement( "beforeend", quizPage );
  }
}

function quizNextOnClick() {
  const quizPage = document.querySelectorAll(".quiz-page");
  const quizNextList = document.querySelectorAll(".quiz-page__next");

  for ( let j = 0; j < quizNextList.length; j++ ) {
    const quizNext = quizNextList[j];

    quizNext.onclick = function() {
      answersArray.push(keyboard.formula.join(""));
      percent += percentPlus;
      progress.quizPercent.innerHTML = `${percent} %`;
      progress.setProgress(percent, progress.progressCircle, progress.progressCircumFerence);
      window.scrollTo(0,0);
      console.log(answersArray);
      editor.editorText.innerHTML = "";
      keyboard.nextQuestion();
      if ( j == quizNextList.length - 1 ) {
        editor.mathEditor.classList.toggle("display-none");
        keyboard.mathKeyboard.classList.toggle("display-none");
        quizEnd();
      }
      setTimeout(() => {
        quizPage[j].classList.toggle("display-none");
        quizPage[j + 1].classList.toggle("display-none");
      }, 400);
    };
  }
}

function quizEnd() {
  statistics.insertTotal(questionsNum);
  statistics.hoveredStatistics();
  checkAnswers(quizTheme);
}

function startQuiz() {
  insertQuestions( answerQuestions, questionsNum, quizTheme );
  keyboard.startMathKeyboard();
  progress.setCircleSettings();
  quizNextOnClick();
}


renderMathInElement(document.body);

startQuiz();
