export default function insertAnswers(answerNum, trueContent, userContent, statusOfAns) {
  const quizAnswers = document.querySelector(".quiz-result__table-body");
  let answersItem = document.createElement("tr");
  let answersItemNum = document.createElement("td");
  let answersItemUser = document.createElement("td");
  let answersItemTrue = document.createElement("td");

  answersItem.classList.add("quiz-result__table-row");

  answersItemNum.classList.add("quiz-result__table-cell");
  answersItemNum.classList.add("quiz-result__num-answer");

  answersItemUser.classList.add("quiz-result__table-cell");
  answersItemUser.classList.add("quiz-result__user-answer");

  if (statusOfAns == true) {
    answersItemUser.classList.add("quiz-result__table-cell_true");
  } else if(statusOfAns == null) {
    answersItemUser.classList.add("quiz-result__table-cell_null");
  } else {
    answersItemUser.classList.add("quiz-result__table-cell_wrong");
  }

  answersItemTrue.classList.add("quiz-result__table-cell");
  answersItemTrue.classList.add("quiz-result__true-answer");
  answersItemTrue.classList.add("quiz-result__table-cell_true");

  answersItemNum.textContent = answerNum;

  answersItemUser.insertAdjacentHTML("beforeend", userContent);
  answersItemTrue.insertAdjacentHTML("beforeend", trueContent);

  answersItem.insertAdjacentElement("beforeend", answersItemNum);
  answersItem.insertAdjacentElement("beforeend", answersItemUser);
  answersItem.insertAdjacentElement("beforeend", answersItemTrue);
  
  quizAnswers.insertAdjacentElement("beforeend", answersItem);
}
