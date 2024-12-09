
const questions = [
<<<<<<< HEAD
    { question: "Vad heter denna typen av åkstil?", image: "./bilder/milky_way_galaxy_1.jpg", options: ["Freeride", "Piståkning", "Freestyle"], answer: 1 },
    { question: "Var i backen passar denna skidan bäst?", image: "./bilder/nedladdning1.jpg", options: ["Pist", "Off-pist", "All-mountain"], answer: 1 },
    { question: "Vilket är sveriges största skidsystem?", options: ["Åre", "Branäs", "Sälen"], answer: 2 },
    { question: "Vilket år kom längskidåkning till OS?", options: ["1936", "1924", "1932"], answer: 1 },
=======
    { question: "Vad heter våran galax?", image: "./bilder/fraga1.jpg", options: ["3", "4", "5"], answer: 1 },
    { question: "Vad är huvudstaden i Sverige?", image: "./bilder/fraga2.jpg", options: ["Göteborg", "Stockholm", "Malmö"], answer: 1 },
    { question: "Vilket år är det?", options: ["2023", "2024", "2025"], answer: 1 },
    { question: "Vad är färgen på himlen?", options: ["Blå", "Grön", "Röd"], answer: 0 },
>>>>>>> 4900af97ed56a78ba433eb58aaabb33d267dee39
    { question: "Vilken är den största planeten i vårt solsystem?", options: ["Jorden", "Mars", "Jupiter"], answer: 2 },
    { question: "Vad är 5 x 6?", options: ["30", "35", "40"], answer: 0 },
    { question: "Vilket land ligger norr om Sverige?", options: ["Norge", "Finland", "Danmark"], answer: 0 },
    { question: "Vad är huvudstaden i Frankrike?", options: ["Berlin", "Madrid", "Paris"], answer: 2 },
    { question: "Vilken är den största havet på jorden?", options: ["Atlanten", "Indiska oceanen", "Stilla havet"], answer: 2 },
    { question: "Vem skrev 'Romeo och Julia'?", options: ["Shakespeare", "Dickens", "Austen"], answer: 0 }
];


const timerEl = document.getElementById("timer");
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;

function loadQuestion() {
    const questionContainer = document.querySelector('.question');
    const imageContainer = document.querySelector('.image-container');
    const optionsContainer = document.querySelector('.options');
    const nextButton = document.querySelector('.next-btn');

    questionContainer.textContent = questions[currentQuestionIndex].question;
    optionsContainer.innerHTML = '';
    nextButton.style.display = 'none';

    if (questions[currentQuestionIndex].image) {
        imageContainer.innerHTML = `<img src="${questions[currentQuestionIndex].image}" alt="Frågeillustration" class="question-image">`;
    } else {
        imageContainer.innerHTML = ''; 
    }

    questions[currentQuestionIndex].options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(button, index === questions[currentQuestionIndex].answer);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(button, isCorrect) {
  clearInterval(timer); 
  const options = document.querySelectorAll('.options button');

  
  options.forEach(btn => {
      btn.disabled = true;
      btn.classList.add('dimmed');
  });


  button.classList.remove('dimmed');
  button.classList.add(isCorrect ? 'correct' : 'incorrect');

  if (!isCorrect) {
      const correctIndex = questions[currentQuestionIndex].answer;
      options[correctIndex].classList.remove('dimmed');
      options[correctIndex].classList.add('correct');
  }

  if (isCorrect) {
      score++;
      document.getElementById('score').textContent = score;
  }

  document.querySelector('.next-btn').style.display = 'block';
}


function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
      loadQuestion();
      starttimer(); 
  } else {
      document.getElementById('quiz').innerHTML = `<h2>Quizet är över!</h2>
          <p>Du fick ${score} av ${questions.length} rätt.</p>`;
  }
}


function starttimer() {
  clearInterval(timer); 
  timeLeft = 10; 
  timerEl.textContent = `Timer ${timeLeft}s`; 
  timerEl.classList.remove('red-bg'); 
  timerEl.classList.add('green-bg'); 
  timer = setInterval(() => {
      timeLeft--;
      timerEl.textContent = `Timer ${timeLeft}s`;

      if (timeLeft <= 3) {
          timerEl.classList.remove('green-bg');
          timerEl.classList.add('red-bg');
      }

      if (timeLeft <= 0) {
          clearInterval(timer); 
          showCorrectAnswer(); 
      }
  }, 1000); 
}


function showCorrectAnswer() {
  const options = document.querySelectorAll('.options button');
  const correctIndex = questions[currentQuestionIndex].answer;

  options.forEach((btn, index) => {
      btn.disabled = true;
      btn.classList.add('dimmed');
      if (index === correctIndex) {
          btn.classList.remove('dimmed');
          btn.classList.add('correct'); 
      }
  });

  document.querySelector('.next-btn').style.display = 'block';
}



document.addEventListener('DOMContentLoaded', () => {
    const quizElement = document.getElementById('quiz');
    const imageContainer = document.createElement('div');
    imageContainer.className = 'image-container';
    quizElement.insertBefore(imageContainer, document.querySelector('.options'));

    loadQuestion(); 
    starttimer();   
});