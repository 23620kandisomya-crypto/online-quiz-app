document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "What does HTML stand for?",
            options: ["Hyper Text Markup Language", "High Tech Multi Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"],
            answer: "Hyper Text Markup Language"
        },
        {
            question: "Which of the following is used to link a CSS file to an HTML document?",
            options: ["<script>", "<link>", "<style>", "<meta>"],
            answer: "<link>"
        },
        {
            question: "What is the primary purpose of JavaScript?",
            options: ["To style web pages", "To structure web content", "To add interactivity to web pages", "To manage databases"],
            answer: "To add interactivity to web pages"
        },
        {
            question: "Which HTML tag is used to define an internal style sheet?",
            options: ["<script>", "<css>", "<style>", "<link>"],
            answer: "<style>"
        },
        {
            question: "How do you declare a JavaScript variable?",
            options: ["variable carName;", "var carName;", "v carName;", "string carName;"],
            answer: "var carName;"
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    let timeLeft = 15; // Time in seconds for each question
    let selectedOption = null;

    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('options-container');
    const nextButton = document.getElementById('next-button');
    const timerElement = document.getElementById('timer');
    const quizHeader = document.getElementById('quiz-header');
    const questionArea = document.getElementById('question-area');
    const resultArea = document.getElementById('result-area');
    const scoreSpan = document.getElementById('score');
    const totalQuestionsSpan = document.getElementById('total-questions');
    const feedbackParagraph = document.getElementById('feedback');
    const restartButton = document.getElementById('restart-button');

    function startTimer() {
        clearInterval(timer); // Clear any existing timer
        timeLeft = 15; // Reset time for the new question
        updateTimerDisplay();

        timer = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            if (timeLeft <= 0) {
                clearInterval(timer);
                alert("Time's up for this question!");
                handleNextQuestion(); // Automatically move to next question if time runs out
            }
        }, 1000);
    }

    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `Time Left: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function loadQuestion() {
        if (currentQuestionIndex < questions.length) {
            selectedOption = null; // Reset selected option for new question
            nextButton.disabled = true; // Disable next button until an option is selected

            const currentQuestion = questions[currentQuestionIndex];
            questionElement.textContent = currentQuestion.question;
            optionsContainer.innerHTML = ''; // Clear previous options

            currentQuestion.options.forEach(option => {
                const button = document.createElement('button');
                button.textContent = option;
                button.classList.add('option-btn');
                button.addEventListener('click', () => selectOption(button, option, currentQuestion.answer));
                optionsContainer.appendChild(button);
            });
            startTimer();
        } else {
            showResults();
        }
    }

    function selectOption(button, option, correctAnswer) {
        // Only allow selection if an option hasn't been selected yet for this question
        if (selectedOption === null) {
            selectedOption = option;
            const allOptionButtons = optionsContainer.querySelectorAll('.option-btn');
            allOptionButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            nextButton.disabled = false; // Enable next button once an option is selected
            
            // Immediately check and provide feedback after selection
            clearInterval(timer); // Stop the timer once an answer is chosen

            if (selectedOption === correctAnswer) {
                score++;
                button.classList.add('correct');
            } else {
                button.classList.add('incorrect');
                // Show the correct answer
                allOptionButtons.forEach(btn => {
                    if (btn.textContent === correctAnswer) {
                        btn.classList.add('correct');
                    }
                });
            }
            // Disable all options after selection
            allOptionButtons.forEach(btn => btn.disabled = true);
        }
    }

    function handleNextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }

    function showResults() {
        clearInterval(timer); // Stop the timer definitively
        questionArea.classList.add('hidden');
        quizHeader.classList.add('hidden'); // Hide timer and quiz header
        resultArea.classList.remove('hidden');
        scoreSpan.textContent = score;
        totalQuestionsSpan.textContent = questions.length;

        if (score === questions.length) {
            feedbackParagraph.textContent = "Excellent! You got all the answers correct!";
        } else if (score > questions.length / 2) {
            feedbackParagraph.textContent = "Great job! You passed the quiz.";
        } else {
            feedbackParagraph.textContent = "Keep practicing! You'll get there.";
        }
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        timeLeft = 15;
        selectedOption = null;

        resultArea.classList.add('hidden');
        quizHeader.classList.remove('hidden'); // Show header again
        questionArea.classList.remove('hidden');
        
        loadQuestion();
    }

    // Event Listeners
    nextButton.addEventListener('click', handleNextQuestion);
    restartButton.addEventListener('click', restartQuiz);

    // Initial Load
    loadQuestion();
});
