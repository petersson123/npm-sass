
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

function loadQuestion() {
    const questionContainer = document.querySelector('.question');
    const optionsContainer = document.querySelector('.options');
    const nextButton = document.querySelector('.next-btn');

    questionContainer.textContent = questions[currentQuestionIndex].question;
    optionsContainer.innerHTML = '';
    nextButton.style.display = 'none';

    questions[currentQuestionIndex].options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(button, index === questions[currentQuestionIndex].answer);
        optionsContainer.appendChild(button);
    });
}

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
  



