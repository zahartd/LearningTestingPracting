"use strict";


import katex from "%node_modules%/katex/dist/katex.js";
import renderMathInElement from "%node_modules%/katex/dist/contrib/auto-render.js";
// import answersQuestions from "./assets/answers.json";
import * as progress from "%modules%/quiz-progress/quiz-progress.js";
import * as editor from "%modules%/math-editor/math-editor.js";
import * as keyboard from "%modules%/math-keyboard/math-keyboard.js";
import * as statistics from "%modules%/quiz-statistics/quiz-statistics.js";
import insertAnswers from "%modules%/quiz-result/__answers/quiz-result__answers.js";


const quizPages = document.querySelector(".quiz-pages");
const quizResult = document.querySelector(".quiz-result");
const quizTheme = quizPages.getAttribute("data-quiz-theme");
const requestURL = "http://ltp.mcdir.ru/assets/answers.json";
let answersQuestions = Object.create({}, {});
let questionsNum = 0;
let percentPlus = 0;
let percent = 0;
let percentTrue = 0;
let percentWrong = 0;
let percentNull = 0;
let percentList = [];
let answersArray = [];
let pointsTrue = 0;
let pointsWrong = 0;
let pointsNull = 0;
let pointsList = [];
let ans = "";
let trueContent = "";
let userContent = "";

// Отправка запроса на сервер
function sendRequest(method, url, body = undefined) {
  return new Promise((resolve) => {
    const  headers = {
      "Content-Type": "application/json"
    };

    return fetch(url, {
      method: method,
      body: JSON.stringify(body),
      headers: headers
    }).then(response => {
      if (response.ok) {
        resolve(response.json());
      }

      response.json().then(error => {
        const e = new Error("Error!!");
        e.data = error;
        throw e;
      });
    });
  });
}

// Отправка JSON
function postQuizJSON(url, json) {
  sendRequest("POST", url, json)
    .then(data => answersQuestions = data)
    .catch(err => console.error(err));
}

// Запись ответов пользователя в JSON
function pushQuestionToJSON(answersQuestions, answersArray, quizTheme) {
  for (let i = 0; i < answersArray.length; i++) {
    answersQuestions[quizTheme][i]["userAnswer"] = answersArray[i];
  }
}

// Извлечение настроек из JSON
function getQuizSettings(answersQuestions, quizTheme) {
  console.log(answersQuestions);
  console.log(quizTheme);
  const questionsNum = answersQuestions[quizTheme]["length"];
  const percentPlus = Math.round(100 / questionsNum);
  return [questionsNum, percentPlus];
}

// Проверка ответов
function checkAnswers(answersArray, answersQuestions, quizTheme) {
  for (let i = 0; i < answersArray.length; i++) {
    // Вставка привильных ответов и ответов пользователя
    ans = answersArray[i];
    trueContent = katex.renderToString(answersQuestions[quizTheme][i]["trueAnswer"].replace("\\\\", "\\"));
    userContent = katex.renderToString(ans);
    insertAnswers(questionsNum, trueContent, userContent);
    
    pushQuestionToJSON(answersQuestions, answersArray, quizTheme);
    postQuizJSON(requestURL, answersQuestions);

    // Проверка ответов и зачисление очков
    if (ans === answersQuestions[quizTheme][i]["trueAnswer"]) {
      answersQuestions[quizTheme][i]["userAnswer"] = ans;
      pointsTrue++;
    } else if (ans == "" || ans == null) {
      pointsNull++;
    }
    pointsWrong = questionsNum - pointsTrue - pointsNull;

  }

  console.log(pointsTrue);
  console.log(pointsWrong);
  console.log(pointsNull);
  

  // Перевод очков в проценты
  percentTrue = Math.round(pointsTrue / questionsNum * 100);
  percentWrong = Math.round(pointsWrong / questionsNum * 100);
  percentNull = 100 - percentTrue - percentWrong;
  pointsList.push(pointsTrue, pointsWrong, pointsNull);
  percentList.push(percentTrue, percentWrong, percentNull);
  console.log(pointsList);

  return [pointsList, percentList];
}

// Вставка вопросов
function insertQuestions(answersQuestions, questionsNum, quizTheme) {
  for ( let i = 0; i < questionsNum; i++ ) {
    // Создание элемнов
    let quizPage = document.createElement("div");
    let quizPageTitle = document.createElement("h2");
    let quizPageNext = document.createElement("button");

    // if (i == questionsNum - 1) {
    //   quizPageNext = document.createElement("a");
    //   quizPageNext.setAttribute("href", "result.html");
    // }

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
    quizPageTitle.textContent = answersQuestions[quizTheme][i]["question"];

    // Вставка элементов
    quizPage.insertAdjacentElement( "beforeend", quizPageTitle );
    quizPage.insertAdjacentElement( "beforeend", quizPageNext );
    quizPages.insertAdjacentElement( "beforeend", quizPage );
  }
}

// Переход между вопросами
function quizNextOnClick(percentPlus) {
  return new Promise((resolve) => {
    const quizPage = document.querySelectorAll(".quiz-page");
    const quizNextList = document.querySelectorAll(".quiz-page__next");

    for ( let j = 0; j < quizNextList.length; j++ ) {
      const quizNext = quizNextList[j];

      quizNext.onclick = function() {
        answersArray.push(keyboard.formula.join(""));
        console.log(percentPlus);
        percent += percentPlus;
        progress.quizPercent.innerHTML = `${percent} %`;
        progress.setProgress(percent, progress.progressCircle, progress.progressCircumFerence);
        window.scrollTo(0,0);
        console.log(answersArray);
        editor.editorText.innerHTML = "";
        keyboard.nextQuestion();
        if ( j == quizNextList.length - 1 ) {
          quizPage[j].classList.toggle("display-none");
          resolve(answersArray);
        } else {
          setTimeout(() => {
            quizPage[j].classList.toggle("display-none");
            quizPage[j + 1].classList.toggle("display-none");
          }, 400);
        }
      };
    }
  });
}

function renderStatistics(pointsList, percentList, questionsNum) {
  // Вставка очков
  statistics.percentItemList[0].innerHTML = `${pointsList[0]}`;
  statistics.percentItemList[1].innerHTML = `${pointsList[1]}`;
  statistics.percentItemList[2].innerHTML = `${pointsList[2]}`;
  statistics.percentItemList[3].innerHTML = `${questionsNum}`;

  // Отрисовка статистики
  statistics.setStatisticsSettings(statistics.unitsList, percentList);
  statistics.hoveredStatistics(statistics.unitsList, statistics.unitsCaptionList);
}

// Завершение квиза
function quizEnd() {
  editor.mathEditor.classList.toggle("display-none");
  keyboard.mathKeyboard.classList.toggle("display-none");
  quizResult.classList.toggle("display-none");
}


// Рендер Математики на странице
renderMathInElement(document.body);

// Старт квиза
sendRequest("GET", requestURL)  // Получение JSON с Quiz данными
  .then(data => {
    answersQuestions = data;
    return getQuizSettings(answersQuestions, quizTheme);
  })
  .then( arrayOfData => {
    console.log(answersQuestions);
    questionsNum = arrayOfData[0];
    percentPlus = arrayOfData[1];
    return insertQuestions(answersQuestions, questionsNum, quizTheme);
  })
  .then( function() {
    return keyboard.startMathKeyboard();
  })
  .then( function() {
    return progress.setCircleSettings();
  })
  .then( function() {
    return quizNextOnClick(percentPlus);
  })
  .then( function() {
    return quizEnd();
  })
  .then( function() {
    return checkAnswers(answersArray, answersQuestions, quizTheme);
  })
  .then( arrayOfData => {
    console.log(arrayOfData);
    pointsList = arrayOfData[0];
    percentList = arrayOfData[1];
    return renderStatistics(pointsList, percentList, questionsNum);
  })
  .catch(err => console.error(err));
