const timerEl = document.getElementById('timer');

let secondsLeft = 60;

// Timer function
// function startTimer() {
//     timerEl.textContent = secondsLeft;
//     let timerInterval = setInterval(
//         () => {
//             secondsLeft--;
//             timerEl.textContent = secondsLeft;
//             if (secondsLeft <= 0) {
//                 clearInterval(timerInterval);
//                 endGame();
//             }
//         }, 1000);
//     };