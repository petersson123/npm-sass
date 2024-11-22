
const questions = [
    {
        question: "Vad är huvudstaden i Sverige?",
        options: ["Stockholm", "Göteborg", "Malmö", "Uppsala"],
        answer: 0 
    },
    {
        question: "Vilken planet är känd som den röda planeten?",
        options: ["Mars", "Venus", "Jupiter", "Merkurius"],
        answer: 0
    },
    {
        question: "Vilket år blev Sverige medlem i EU?",
        options: ["1991", "1995", "2000", "2005"],
        answer: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;

// Funktion för att ladda en fråga
function loadQuestion() {
    const questionContainer = document.querySelector('.question');
    const optionsContainer = document.querySelector('.options');
    const nextButton = document.querySelector('.next-btn');

    // Nollställ tidigare innehåll
    questionContainer.textContent = questions[currentQuestionIndex].question;
    optionsContainer.innerHTML = '';
    nextButton.style.display = 'none';

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
    button.classList.add(isCorrect ? 'correct' : 'incorrect');

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
document.addEventListener('DOMContentLoaded', loadQuestion);
