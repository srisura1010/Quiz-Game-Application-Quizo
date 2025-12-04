const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-btns");
const scoreDisplay = document.getElementById("score-display");

let currentQuestionIndex = 0;
let shuffledQuestions;
let score;

nextButton.addEventListener("click", () => {
  setNextQuestion();
});

startButton.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  scoreDisplay.innerText = "";
  startButton.classList.add("hide");
  questionContainer.classList.remove("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  setNextQuestion();
});

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    let button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");

    if (answer.correct) {
      button.dataset.correct = true;
    }
    answerButtonsElement.appendChild(button);

    button.addEventListener("click", selectAnswer);
  });
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;

  if (correct) {
    score++;
    currentQuestionIndex++;
  } else {
    currentQuestionIndex++;
  }

  Array.from(answerButtonsElement.children).forEach((button) => {
    button.disabled = true;
    if (button.dataset.correct) {
      button.classList.add("correct");
    } else {
      button.classList.add("wrong");
    }
  });

  if (currentQuestionIndex < shuffledQuestions.length) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
    scoreDisplay.innerText = `Your Score is ${score}/${shuffledQuestions.length}`
  }
}

function resetState() {
  nextButton.classList.add("hide");
  clearStatusClass(document.body);
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function setStatusClass() {}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "Who had the tallest header recorded in soccer history",
    answers: [
      { text: "Cristiano Ronaldo", correct: true },
      { text: "Didier Drogba", correct: false },
      { text: "Gareth Bale", correct: false },
      { text: "Robinho", correct: false },
    ],
  },
  {
    question: "Which country has the most FIFA World Cup Titles?",
    answers: [
      { text: "Italy", correct: false },
      { text: "Portugal", correct: false },
      { text: "Brazil", correct: true },
      { text: "Germany", correct: false },
    ],
  },
];