
const questions = [
    {
        category: "SOLO LEVELING",
        question: "What is the name of the main character in Solo Leveling?",
        answers: [
            "Yoo Jinho",
            "Sung Jinwoo",
            "Cha Hae-In",
            "Go Gunhee"
        ],
        correct: 1
    },
    {
        category: "NARUTO",
        question: "What is Naruto's dream?",
        answers: [
            "To become a Samurai",
            "To find a Dragon Ball",
            "To become Hokage",
            "To become a doctor"
        ],
        correct: 2
    },
    {
        category: "ONE PIECE",
        question: "What is the name of Luffy's pirate crew?",
        answers: [
            "Red Hair Pirates",
            "Straw Hat Pirates",
            "Blackbeard Pirates",
            "Heart Pirates"
        ],
        correct: 1
    },
    {
        category: "DEMON SLAYER",
        question: "What is the name of Tanjiro's sister?",
        answers: [
            "Shinobu",
            "Kanao",
            "Mitsuri",
            "Nezuko"
        ],
        correct: 3
    },
    {
        category: "ATTACK ON TITAN",
        question: "Who is Eren Yeager's childhood friend?",
        answers: [
            "Mikasa Ackerman",
            "Historia Reiss",
            "Sasha Blouse",
            "Annie Leonhart"
        ],
        correct: 0
    },
    {
        category: "DRAGON BALL",
        question: "What is Goku's Saiyan birth name?",
        answers: [
            "Vegeta",
            "Broly",
            "Kakarot",
            "Bardock"
        ],
        correct: 2
    },
    {
        category: "JUJUTSU KAISEN",
        question: "Which character is known for wearing a blindfold?",
        answers: [
            "Megumi Fushiguro",
            "Satoru Gojo",
            "Yuji Itadori",
            "Kento Nanami"
        ],
        correct: 1
    },
    {
        category: "MY HERO ACADEMIA",
        question: "What is the name of Izuku Midoriya's hero power?",
        answers: [
            "Explosion",
            "Half-Cold Half-Hot",
            "One For All",
            "Erasure"
        ],
        correct: 2
    },
    {
        category: "SPY × FAMILY",
        question: "What special ability does Anya have?",
        answers: [
            "Telepathy",
            "Invisibility",
            "Time travel",
            "Super speed"
        ],
        correct: 0
    },
    {
        category: "DEATH NOTE",
        question: "What is the name of the Shinigami who drops the Death Note?",
        answers: [
            "Near",
            "L",
            "Mello",
            "Ryuk"
        ],
        correct: 3
    }
];

const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionNumber = document.getElementById("question-number");
const questionCategory = document.getElementById("question-category");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers");

const feedback = document.getElementById("feedback");
const currentScore = document.getElementById("current-score");
const progressBar = document.getElementById("progress-bar");
const progressTrack = document.getElementById("progress-track");

let currentQuestion = 0;
let score = 0;
let answered = false;

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    answered = false;

    currentScore.textContent = score;

    welcomeScreen.hidden = true;
    resultScreen.hidden = true;
    quizScreen.hidden = false;

    showQuestion();
}

function showQuestion() {
    answered = false;

    const item = questions[currentQuestion];

    questionNumber.textContent = String(currentQuestion + 1)
        .padStart(2, "0");

    questionCategory.textContent = item.category;
    questionText.textContent = item.question;

    feedback.textContent = "";
    feedback.className = "feedback";

    nextBtn.disabled = true;

    if (currentQuestion === questions.length - 1) {
        nextBtn.innerHTML = 'See Results <span>→</span>';
    } else {
        nextBtn.innerHTML = 'Next Question <span>→</span>';
    }

    const progress = currentQuestion / questions.length * 100;
    progressBar.style.width = `${progress}%`;

    progressTrack.setAttribute(
        "aria-valuenow",
        currentQuestion
    );

    answersContainer.replaceChildren();

    item.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "answer-btn";

        const letter = document.createElement("span");
        letter.className = "answer-letter";
        letter.textContent = String.fromCharCode(65 + index);

        const text = document.createElement("span");
        text.className = "answer-text";
        text.textContent = answer;

        button.append(letter, text);

        button.addEventListener("click", () => {
            selectAnswer(index);
        });

        answersContainer.appendChild(button);
    });
}

function selectAnswer(selectedIndex) {
    if (answered) return;

    answered = true;

    const item = questions[currentQuestion];
    const answerButtons = answersContainer.querySelectorAll("button");
    const isCorrect = selectedIndex === item.correct;

    answerButtons.forEach((button, index) => {
        button.disabled = true;

        if (index === item.correct) {
            button.classList.add("correct");

            const letter = button.querySelector(".answer-letter");
            letter.textContent = "✓";
        }
    });

    if (isCorrect) {
        score++;

        feedback.textContent = "Correct! Great job, anime fan! ✨";
        feedback.classList.add("good");
    } else {
        answerButtons[selectedIndex].classList.add("incorrect");

        const selectedLetter = answerButtons[selectedIndex]
            .querySelector(".answer-letter");

        selectedLetter.textContent = "×";

        feedback.textContent =
            `Not quite! The correct answer is ${item.answers[item.correct]}.`;

        feedback.classList.add("bad");
    }

    currentScore.textContent = score;
    nextBtn.disabled = false;
}

function nextQuestion() {
    if (!answered) return;

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizScreen.hidden = true;
    resultScreen.hidden = false;

    const total = questions.length;
    const percentage = Math.round((score / total) * 100);
    const incorrect = total - score;

    document.getElementById("final-score").textContent = score;
    document.getElementById("correct-count").textContent = score;
    document.getElementById("wrong-count").textContent = incorrect;

    document.getElementById("result-percent").textContent =
        `${percentage}% correct`;

    document.getElementById("result-bar").style.width =
        `${percentage}%`;

    const resultIcon = document.getElementById("result-icon");
    const resultTitle = document.getElementById("result-title");
    const resultMessage = document.getElementById("result-message");

    if (score === 10) {
        resultIcon.textContent = "👑";
        resultTitle.textContent = "Anime Legend!";
        resultMessage.textContent =
            "Perfect score! You truly know your anime.";
    } else if (score >= 7) {
        resultIcon.textContent = "🏆";
        resultTitle.textContent = "Amazing Work!";
        resultMessage.textContent =
            "You're a serious anime fan. Keep it up!";
    } else if (score >= 4) {
        resultIcon.textContent = "⭐";
        resultTitle.textContent = "Nice Try!";
        resultMessage.textContent =
            "You know some anime. Keep watching and learning!";
    } else {
        resultIcon.textContent = "🎌";
        resultTitle.textContent = "Keep Training!";
        resultMessage.textContent =
            "Every anime legend starts somewhere. Try again!";
    }

    progressBar.style.width = "100%";
    progressTrack.setAttribute("aria-valuenow", total);
}

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startQuiz);
