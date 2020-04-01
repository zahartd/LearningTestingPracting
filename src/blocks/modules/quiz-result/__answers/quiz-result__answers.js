export default function insertAnswers(questionsNum, trueContent, userContent) {
  for (let i = 0; i < questionsNum; i++) {
    let answersItem = document.createElement("div");
    let answersItemTrue = document.createElement("span");
    let answersItemUser = document.createElement("span");
    answersItem.classList.add("quiz-result__answers-item");
    answersItemTrue.classList.add(".quiz-result__true-answer");
    answersItemUser.classList.add("quiz-result__user-answer");
    answersItemTrue.insertAdjacentHTML("beforeend", trueContent);
    answersItemUser.insertAdjacentHTML("beforeend", userContent);
    answersItem.insertAdjacentHTML("beforeend", answersItemTrue);
    answersItem.insertAdjacentHTML("beforeend", answersItemUser);
  }
}
