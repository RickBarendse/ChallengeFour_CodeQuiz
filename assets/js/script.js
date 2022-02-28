// question and answers in an array

var questions = [ 
    {
        questionText: "Commonly used data types DO NOT includes:",
        options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        answer: "3. alerts",
    },

    {
        questionText: "The condition in an if/else statement is enclosed with _____________.",
        options: ["1. quotes", "2. curly brackets", "3. paranthesis", "4. square brackets"],
        answer: "3. paranthesis",
    },

    {
        questionText: "Arrays in JavaScript can be used to store _________.",
        options: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        answer: "4. all of the above",
    },

    {
        questionText: "String values must be enclosed within __________ when being assigned to variables.",
        options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
        answer: "3. quotes",
    },

    {
        questionText: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
        answer: "4. console.log",
    },

]// select which card div to display by id and assign to variables
var startCard = document.querySelector("#intro_start_card");
var questionCard = document.querySelector("#questions_card");
var scoreCard = document.querySelector("#score_card");
var leaderboardCard = document.querySelector("#leaderboard_card");

// hide all cards
function hideCards() {
    startCard.setAttribute("hidden", true);
    questionCard.setAttribute("hidden", true);
    scoreCard.setAttribute("hidden", true);
    leaderboardCard.setAttribute("hidden", true);
}

var results = document.querySelector("#results");
var resultsText = document.querySelector("results_text");

// hide results section
function hideResultText() {
    results.style.display = "none";
}

// global variables
var intervalID;
var time;
var currentQuestion;

document.querySelector("#start_button").addEventListener("click", startQuiz);

function startQuiz() {
    // show questions card
    hideCards();
    questionCard.removeAttribute("hidden");

    // assign value to currentQuestion whne quiz starts, then display the question
    currentQuestion = 0;
    displayQuestion();

    // set timer
    time = 50;

    // executes function countdown and display on page
    intervalID = setInterval(countdown, 1000);

    // display the time after start of quiz
    displayTime();
}

// reduce time and display, if timer runs out then end quiz
function countdown() {
    time--;
    displayTime();
    if (time < 1) {
        endQuiz();
    }
}

// display time on page
var timeDisplay = document.querySelector("#time");
function displayTime() {
    timeDisplay.textContent = time;
}

// display the question and answer options for current question
function displayQuestion() {
    var question = questions[currentQuestion];
    var options = question.options; 

    var questionText = document.querySelector("#question_text")
    questionText.textContent = question.questionText;

    for (let i = 0; i < options.length; i++) {
        var option = options[i];
        var optionButton = document.querySelector("#option" + i);
        optionButton.textContent = option;
    }
}

// user clicks on an answer
document.querySelector("#question_options").addEventListener("click", checkAnswer);

// compare user selected option with correct answer
function optionIsCorrect(optionButton) {
    return optionButton.textContent === questions[currentQuestion].answer;
}

// if answer is incorrect reduce time by 10 seconds
function checkAnswer(eventObject) {
    var optionButton = eventObject.target;
    results.style.display = "block";
    if (optionIsCorrect(optionButton)) {
        resultsText.textContent = "Correct!";
        setTimeout(hideResultsText, 1000);
    } else {
        resultsText.textContent = "Incorrect!";
        setTimeout(hideResultText, 1000)
        if (time >= 10) {
            time = time -10;
            displayTime();
        } else {
            // if timer is under 10 seconds end the quiz
            time = 0;
            displayTime();
            endQuiz();
        }
    }

    // move on to the next question
    currentQuestion++;
    // if no more queztions remain
    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        endQuiz()
    }
}

// display score
var score = document.querySelector("#score");

// at end of quiz display score as the remaining time
function endQuiz() {
    clearInterval(intervalID);
    hideCards();
    scoreCard.removeAttribute("hidden");
    score.textContent = time;
}

var submitButton = document.querySelector("#submit_button");
var inputText = document.querySelector("#initials");

// store initials and score when submit is clicked
submitButton.addEventListener("click", storeScore);

function storeScore(event) {
    event.preventDefault();

    // make sure user enters initials
    if (!inputText.value) {
        alert("Please enter you initials!");
        return;
    }

    var leaderboardEntry = {
        initials: inputText.value, 
        socre: time,
    };

    updateStoredLeaderboard(leaderboardEntry);

    // display leaderboard
    hideCards();
    leaderboardCard.removeAttribute("hidden");

    showLeaderboard();
}

// update local storage
function updateStoredLeaderboard(leaderboardEntry) {
    var leaderboardLeaders = getLeaderboard();
    // append leaderboard with new entry
    leaderboardLeaders.push(leaderboardEntry);
    localStorage.setItem("leaderboardLeaders", JSON.stringify(leaderboardLeaders));
}

// get list of leaders from local storage sand convert to an array
function getLeaderboard() {
    var storedLeaderboard = localStorage.getItem("leaderboardLeaders");
    if (storedLeaderboard !== null) {
        var leaderboardLeaders = JSON.parse(storedLeaderboard);
        return leaderboardLeaders;
    } else {
        leaderboardLeaders = [];
    }
    return leaderboardItems;
}

// display leader board
function showLeaderboard() {
    
}










