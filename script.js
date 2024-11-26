
const questions = [
    { question: "Vad är 2 + 2?", image: "./bilder/nedladdning.jpg", options: ["3", "4", "5"], answer: 1 },
    { question: "Vad är huvudstaden i Sverige?", image: "./bilder/nedladdning1.jpg", options: ["Göteborg", "Stockholm", "Malmö"], answer: 1 },
    { question: "Vilket år är det?", options: ["2023", "2024", "2025"], answer: 1 },
    { question: "Vad är färgen på himlen?", options: ["Blå", "Grön", "Röd"], answer: 0 },
    { question: "Vilken är den största planeten i vårt solsystem?", options: ["Jorden", "Mars", "Jupiter"], answer: 2 },
    { question: "Vad är 5 x 6?", options: ["30", "35", "40"], answer: 0 },
    { question: "Vilket land ligger norr om Sverige?", options: ["Norge", "Finland", "Danmark"], answer: 0 },
    { question: "Vad är huvudstaden i Frankrike?", options: ["Berlin", "Madrid", "Paris"], answer: 2 },
    { question: "Vilken är den största havet på jorden?", options: ["Atlanten", "Indiska oceanen", "Stilla havet"], answer: 2 },
    { question: "Vem skrev 'Romeo och Julia'?", options: ["Shakespeare", "Dickens", "Austen"], answer: 0 }
];


let currentQuestionIndex = 0;
let score = 0;

// Funktion för att ladda en fråga
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

// Funktion för att kolla svaret
function checkAnswer(button, isCorrect) {
    const options = document.querySelectorAll('.options button');

    // Inaktivera alla knappar och tona ner dem
    options.forEach(btn => {
        btn.disabled = true;
        btn.classList.add('dimmed');
    });

    // Markera vald knapp
    button.classList.remove('dimmed');
    button.classList.add('selected');

    // Om rätt svar, uppdatera poäng
    if (isCorrect) {
        score++;
        document.getElementById('score').textContent = score;
    }

    // Visa nästa-knappen
    document.querySelector('.next-btn').style.display = 'block';
}

// Funktion för nästa fråga
function nextQuestion() {
    currentQuestionIndex++;

    // Kolla om fler frågor finns
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        // Slut på frågor
        document.getElementById('quiz').innerHTML = `<h2>Quizet är över!</h2>
            <p>Du fick ${score} av ${questions.length} rätt.</p>`;
    }
}

// Ladda första frågan vid start
document.addEventListener('DOMContentLoaded', () => {
    // Skapa en container för bilden dynamiskt
    const quizElement = document.getElementById('quiz');
    const imageContainer = document.createElement('div');
    imageContainer.className = 'image-container';
    quizElement.insertBefore(imageContainer, document.querySelector('.options'));

    loadQuestion();
});



function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        document.getElementById('quiz').innerHTML = `<h2>Quizet är över!</h2>
            <p>Du fick ${score} av ${questions.length} rätt.</p>`;
    }
}

document.addEventListener('DOMContentLoaded', loadQuestion);


// Funktion för att kolla svaret
function checkAnswer(button, isCorrect) {
  const options = document.querySelectorAll('.options button');

  options.forEach(btn => {
      btn.disabled = true;
      btn.classList.add('dimmed');
  });

  button.classList.remove('dimmed');
  button.classList.add(isCorrect ? 'correct' : 'incorrect');

  if (isCorrect) {
      score++;
      document.getElementById('score').textContent = score;
  }

  document.querySelector('.next-btn').style.display = 'block';
}

score = 0;

function go(x){
  $({score: 0}).animate({score: x},{
    duration: 1000,
    easing:"linear",
    step: function(now, fx){
      $("#score").html(score + Math.floor(now));
    },
    queue:false,
    complete: function(now, fx){
      score += x;
    }
  });
  $("#tag").fadeIn({
    duration:700,
    easing:"linear",
    step:function(now, fx){
      $(this).css("top", -55 * now  +"px");
    }
  }).fadeOut({
    duration:300,
    step:function(now, fx){
      $(this).css("top",-55 * ( 2 - now) + "px");
    }
  });

}
  



