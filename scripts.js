const question = document.getElementById('questions');
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById("progressBarFull");

//NEW VARIABLES CREATED
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scripting>",
        answer: 1
    },

    {
        question: "What is the correct syntax for referring to an external script called xxx.js?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3
    },

    {
        question: "How  do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4
    },

    {
        question: "Which built-in method returns the index within the calling String object of the first occurrence of the specified value?",
        choice1: "getIndex();",
        choice2: "location();",
        choice3: "indexOf();",
        choice4: "None of the Above();",
        answer: 3
    },

    {
        question: "Which of the following function of Array object returns true if every element in this array satisfies the provided testing function?",
        choice1: "concat();",
        choice2: "every();",
        choice3: "push();",
        choice4: "some();",
        answer: 2
    },

]

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [ ...questions];
    console.log(availableQuestions); 
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //GO TO THE END PAGE
        return window.location.assign("end.html");
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });
//This prevents our function from re-selecting the same question
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e =>{
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const SelectedChoice = e.target;
        const selectedAnswer = SelectedChoice.dataset["number"];

        const classToApply =  
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }

        console.log(classToApply);

        SelectedChoice.parentElement.classList.add(classToApply);

        setTimeout( () => {
            SelectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame()

//TIMER
let clock = 60;
let timer;
const timerelement = document.getElementById("timer");

function countdown () {
    //this takes off 1 second 
clock --;
timerelement.textContent=clock;

if (clock <= 0) {
    clock = 0;
    endgame();
};
};
//CUT AND PASTE THIS INTO START QUIZ FUNCTION
timer = setInterval(countdown, 1000);

//ENDGAME
// Two places to call - if time runs (done above) and when last question is answered 
function endgame() {
clearInterval(timer);
};