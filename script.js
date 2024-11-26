
const questions = [
    { question: "Vad är 2 + 2?", image: "./bilder/nedladdning.jpg", options: ["3", "4", "5"], answer: 1 },
    { question: "Vad är huvudstaden i Sverige?", options: ["Göteborg", "Stockholm", "Malmö"], answer: 1 },
    { question: "Vilket år är det?", options: ["2023", "2024", "2025"], answer: 1 },
    { question: "Vad är färgen på himlen?", options: ["Blå", "Grön", "Röd"], answer: 0 },
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

// Ladda en fråga
function loadQuestion() {
    const questionContainer = document.querySelector('.question');
    const imageContainer = document.querySelector('.image-container');
    const optionsContainer = document.querySelector('.options');
    const nextButton = document.querySelector('.next-btn');

    // Nollställ tidigare innehåll
    questionContainer.textContent = questions[currentQuestionIndex].question;
    optionsContainer.innerHTML = '';
    nextButton.style.display = 'none';

    // Lägg till bild om den finns
    if (questions[currentQuestionIndex].image) {
        imageContainer.innerHTML = `<img src="${questions[currentQuestionIndex].image}" alt="Frågeillustration" class="question-image">`;
    } else {
        imageContainer.innerHTML = ''; // Ta bort eventuell tidigare bild
    }

    // Lägg till alternativ
    questions[currentQuestionIndex].options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(button, index === questions[currentQuestionIndex].answer);
        optionsContainer.appendChild(button);
    });
}

// Kolla svaret
function checkAnswer(button, isCorrect) {
  clearInterval(timer); // Stoppa timern om användaren svarar
  const options = document.querySelectorAll('.options button');

  // Inaktivera alla knappar och tona ner dem
  options.forEach(btn => {
      btn.disabled = true;
      btn.classList.add('dimmed');
  });

  // Markera vald knapp
  button.classList.remove('dimmed');
  button.classList.add(isCorrect ? 'correct' : 'incorrect');

  // Om användaren svarar fel, markera också rätt svar
  if (!isCorrect) {
      const correctIndex = questions[currentQuestionIndex].answer;
      options[correctIndex].classList.remove('dimmed');
      options[correctIndex].classList.add('correct');
  }

  // Uppdatera poäng om svaret är rätt
  if (isCorrect) {
      score++;
      document.getElementById('score').textContent = score;
  }

  // Visa nästa-knappen
  document.querySelector('.next-btn').style.display = 'block';
}


function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
      loadQuestion();
      starttimer(); // Starta om timern för nästa fråga
  } else {
      document.getElementById('quiz').innerHTML = `<h2>Quizet är över!</h2>
          <p>Du fick ${score} av ${questions.length} rätt.</p>`;
  }
}


// Starta timern
function starttimer() {
  clearInterval(timer); // Avbryt eventuell tidigare timer
  timeLeft = 10; // Återställ tiden till 10 sekunder
  timerEl.textContent = `Timer ${timeLeft}s`; // Uppdatera visningen
  timerEl.classList.remove('red-bg'); // Återställ till standardfärgen
  timerEl.classList.add('green-bg'); // Sätt till grön i början

  timer = setInterval(() => {
      timeLeft--;
      timerEl.textContent = `Timer ${timeLeft}s`;

      // Byt bakgrundsfärg till röd när 3 sekunder är kvar
      if (timeLeft <= 3) {
          timerEl.classList.remove('green-bg');
          timerEl.classList.add('red-bg');
      }

      if (timeLeft <= 0) {
          clearInterval(timer); // Stoppa timern
          showCorrectAnswer(); // Visa rätt svar
      }
  }, 1000); // Timer uppdateras varje sekund
}


function showCorrectAnswer() {
  const options = document.querySelectorAll('.options button');
  const correctIndex = questions[currentQuestionIndex].answer;

  // Inaktivera alla knappar och tona ner dem
  options.forEach((btn, index) => {
      btn.disabled = true;
      btn.classList.add('dimmed');
      if (index === correctIndex) {
          btn.classList.remove('dimmed');
          btn.classList.add('correct'); // Markera rätt svar
      }
  });

  // Visa nästa-knappen
  document.querySelector('.next-btn').style.display = 'block';
}



// Vid sidladdning
document.addEventListener('DOMContentLoaded', () => {
    const quizElement = document.getElementById('quiz');
    const imageContainer = document.createElement('div');
    imageContainer.className = 'image-container';
    quizElement.insertBefore(imageContainer, document.querySelector('.options'));

    loadQuestion(); // Ladda första frågan
    starttimer();   // Starta timern
});