
const questions = [


    { question: "Vad heter denna typen av åkstil?", image: "./bilder/1.jpg", options: ["Freeride", "Piståkning", "Freestyle"], answer: 0 },
    { question: "Var i backen passar denna skidan bäst?", image: "./bilder/2.jpg", options: ["Pist", "Off-pist", "All-mountain"], answer: 1 },
    { question: "Vilket är sveriges största skidsystem?", options: ["Åre", "Branäs", "Sälen"], answer: 2 },
    { question: "Vilket år kom längskidåkning till OS?", image: "./bilder/4.jpg", options: ["1936", "1924", "1932"], answer: 1 },

    { question: "Vilka 2 disciplinerna ingår i alpin skidåkning?", 
        options: ["Storslalom, Super-G,", "Skicross, puckelpist", "Telemark, Sprint" ], answer: 0 },
    { question: "Vad kallas den punkt på en backhoppningsbana där hopparna förväntas landa för att få optimala poäng?", options: ["G-punkt", "F-punkt", "k-punkt"], answer: 2 }, 
    { question: "I vilket land arrangerades det första VM i alpin skidåkning, och vilket år hölls det?", options: ["Norge, Trysil, år 1935", "Mürren, Schweiz, år 1931", "Italien, Cervino, år 1932"], answer: 1 },
    { question: "Vad kostar denna lavinutrustning", image: "./bilder/5.jpg", options: ["cirka 12 000kr", "cirka 5000kr", "cirka 8000kr"], answer: 2 },
    { question: "Vilken säkerhetsutrustning är obligatorisk vid alpin tävlingsåkning?", options: ["Hjälm", "Hjälm, käkskydd", "Hjälm, handskar"], answer: 0 },
    { question: "Hur många världscuplopp vann Ingemar Stenmark?", options: ["83", "85", "87", "86"], answer: 3 }
];


const timerEl = document.getElementById("timer");
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
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
        clearInterval(timer); 

       
        document.getElementById('timer').style.display = 'none';
        const scoreElements = document.querySelectorAll('.score');
        scoreElements.forEach(scoreElement => {
            scoreElement.style.display = 'none'; 
        });

        
        document.getElementById("quiz").innerHTML = `
            <h2>Quizet är över!</h2>
            <p>Du fick ${score} av ${questions.length} rätt.</p>
            <a class="home-btn" href="index.html">Till huvudmeny</a>
        `;
    }
}


function starttimer() {
    clearInterval(timer); 
    timeLeft = 15; 
    timerEl.textContent = `Timer ${timeLeft}s`; 
    timerEl.classList.remove('red-bg'); 
    timerEl.classList.add('green-bg'); 
    
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Timer ${timeLeft}s`;

        if (timeLeft === 3) {
            timerEl.classList.remove('green-bg');
            timerEl.classList.add('red-bg');
                
const maker = document.querySelector('#pattern-maker');
const visualizer = document.querySelector('#pattern-visualizer');
const recordButton = document.querySelector('#record');
const playButton = document.querySelector('#play');
const stopButton = document.querySelector('#stop');
const ripple = document.querySelector('#ripple');

visualizer.innerHTML = '';

let pattern = [];

const patternLength = 3000;
let startTime = 0;
let currentTime = 0;
let patternTime = 0;
const frames = [];

const visualizerWidth = visualizer.offsetWidth;

const moveRipple = (e) => {
  const touches = [...e.changedTouches];

  if(touches.length) {
    const {pageX, pageY} = touches[0];
    ripple.style.top = `${pageY}px`;
    ripple.style.left = `${pageX}px`;
  }
};

const addPatternEntry = (e) => {
  e.preventDefault();

  const {type} = e;
  const touches = [...e.changedTouches];

  frames.map(cancelAnimationFrame);

  type === 'touchstart' ? maker.addEventListener('touchmove', moveRipple) : maker.removeEventListener('touchmove', moveRipple);
  ripple.style.display = type === 'touchstart' ? 'block' : 'none';

  if(touches.length) {
    const {pageX, pageY} = touches[0];
    ripple.style.top = `${pageY}px`;
    ripple.style.left = `${pageX}px`;
  }

  if(startTime !== 0 && Date.now() - startTime >= patternLength) {
    return false;
  }

  if(startTime === 0) {
    startTime = Date.now();
    visualizer.innerHTML = '';
    pattern = [];
  }

  if(patternTime !== 0) {
    pattern.push(currentTime - patternTime);
  }

  patternTime = Date.now();

  const className = type === 'touchstart' ? 'on' : 'off';
  visualizer.insertAdjacentHTML('beforeend', ``);

  const curDiv = visualizer.lastChild;

  const run = () => {

    currentTime = Date.now();

    const w = ((currentTime - patternTime) / patternLength) * visualizerWidth;

    curDiv.style.width = `${w}px`;

    if(currentTime - startTime < patternLength) {
      frames.push(requestAnimationFrame(run));
    }
    else {
      pattern.push(currentTime - patternTime);

      startTime = 0;
      currentTime = 0;
      patternTime = 0;

      recordButton.disabled = false;
      playButton.disabled = false;
      ripple.style.display = 'none';

      const totalWidth = [...visualizer.querySelectorAll('div')]
      .reduce((sum, div) => sum + parseFloat(div.style.width), 0);

      const diff = visualizerWidth - totalWidth;
      curDiv.style.width = `${parseFloat(curDiv.style.width) + diff}px`;

      maker.removeEventListener('touchstart', addPatternEntry);
      maker.removeEventListener('touchend', addPatternEntry);
    }
  };

  requestAnimationFrame(run);
};

let playId;

const playVibration = () => {
  playButton.disabled = true;
  stopButton.disabled = false;

  navigator.vibrate(pattern);

  playId = setTimeout(() => {
    playButton.disabled = false;
    stopButton.disabled = true;
  }, patternLength);
};

const stopVibration = () => {
  navigator.vibrate(0);

  clearTimeout(playId);

  playButton.disabled = false;
  stopButton.disabled = true;
};

playButton.addEventListener('click', playVibration);
stopButton.addEventListener('click', stopVibration);

recordButton.addEventListener('click', () => {
  visualizer.innerHTML = '';
  recordButton.disabled = true;
  playButton.disabled = true;

  maker.addEventListener('touchstart', addPatternEntry);
  maker.addEventListener('touchend', addPatternEntry);
});    
    

            
        
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