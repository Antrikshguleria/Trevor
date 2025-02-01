import React, { useEffect, useState } from 'react';
import fetchQuizzes from '../api/quizAPI'; 
import QuizCard from '../components/QuizCard';
import QuestionCard from '../components/QuestionCard';
import ProgressBarCard from '../components/ProgressBar';
import ScoreCard from '../components/ScoreCard';
import Swal from "sweetalert2";
import Confetti from 'react-confetti';

const showAlert = () => {
  Swal.fire({
    title: "⏳ Oops!",
    text: "Only one minute left. Hurry up!",
    icon: "warning",
    timer: 5000, 
    showConfirmButton: false,
    toast: true,
    position: "top-end",
    customClass: {
      popup: "rounded-lg shadow-lg bg-blue-500 text-white p-6",
      title: "text-2xl font-bold",
    },
  });
};

const Home = () => {
  const [quizData, setQuizData] = useState(null);
  const [counter, setCounter] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [answerStatus, setAnswerStatus] = useState('');
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [streak, setStreak] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [confettiActive, setConfettiActive] = useState(false);

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        const data = await fetchQuizzes();
        if (data && data.title && data.topic && Array.isArray(data.questions)) {
          setQuizData(data);
        } else {
          console.error('Unexpected response structure:', data);
        }
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    loadQuizData();
  }, []);

  useEffect(() => {
    let timerInterval;
    if (quizStarted && timer > 0 && currentQuestionIndex < quizData?.questions.length) {
      timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
        if (timer === 61) {
          showAlert();
        }
      }, 1000);
    } else if (timer === 0 || currentQuestionIndex === quizData?.questions.length) {
      handleFinishQuiz();
    }

    return () => clearInterval(timerInterval);
  }, [quizStarted, timer, currentQuestionIndex]);

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setTimer(quizData.duration * 60); // Set total duration in seconds
    setScore(0); // Reset score
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setQuizFinished(false);
  };

  const handleAnswerSelect = (option) => {
    if (answeredQuestions[currentQuestionIndex]) return; // Prevent re-selection

    const correctOption = quizData.questions[currentQuestionIndex].options.find(
      (opt) => opt.is_correct
    );
    const isCorrect = option.id === correctOption.id;
    setAnsweredQuestions((prev) => ({
      ...prev,
      [currentQuestionIndex]: { selected: option.id, correct: correctOption.id },
    }));

    if (isCorrect) {
      setAnswerStatus('correct');
      setCorrectAnswers((prev) => prev + 1);
      setStreak((prev) => prev + 1);
      setScore((prevScore) => prevScore + parseInt(quizData.correct_answer_marks, 10));

      if (streak === 3) {
        setConfettiActive(true); // Trigger confetti animation
      }

      // Check for achievements
      if (streak === 2) {
        setAchievements((prev) => [...prev, "Hatrick!🥳"]);
      }
      if( streak === 4 )
      {
        setAchievements((prev) => [...prev, "Five in a row!5️⃣"]);
      }
      if( streak === 7 )
      {
        setAchievements((prev) => [...prev, "unstoppable!🔥"]);
      }

    } else {
      setAnswerStatus('incorrect');
      setWrongAnswers((prev) => prev + 1);
      setStreak(0);
      setScore((prevScore) => prevScore - parseInt(quizData.negative_marks, 10));
    }

    setSelectedAnswer(option);
    setTimeout(handleNextQuestion, 1000); // Move to next question
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex === quizData.questions.length - 1) {
      setQuizFinished(true); // Finish quiz when last question is reached
    }
    setCounter((prev) => prev + 1);
    setSelectedAnswer(null); // Reset selected answer
    setAnswerStatus(''); // Reset answer status
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1); // Move to the next question
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCounter((prev) => prev - 1);
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1); // Move to previous question
    }
  };

  const handleFinishQuiz = () => {
    setQuizFinished(true);
  };

  const calculateAccuracy = () => {
    return ((correctAnswers / quizData.questions.length) * 100).toFixed(2);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="container mx-auto p-4">
      {confettiActive && <Confetti recycle={false} />}
      {!quizStarted ? (
        quizData ? (
          <QuizCard quizData={quizData} onStartQuiz={handleStartQuiz} />
        ) : (
          <p className="text-center text-lg">Loading quiz...</p>
        )
      ) : quizFinished ? (
        <ScoreCard
          totalQuestions={quizData.questions.length}
          correctAnswers={correctAnswers}
          wrongAnswers={wrongAnswers}
          score={score}
          accuracy={calculateAccuracy()}
        />
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <ProgressBarCard
              totalQuestions={quizData.questions.length}
              count={counter}
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-3xl font-bold text-[#87BAF0] tracking-wide">
              {quizData.title}
            </h3>
            <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg shadow-md">
              <span className="text-xl font-semibold text-red-600 animate-pulse">
                ⏳ {formatTime(timer)}
              </span>
            </div>
          </div>

          <QuestionCard
            question={quizData.questions[currentQuestionIndex]}
            onAnswerSelect={handleAnswerSelect}
            selectedAnswer={selectedAnswer}
            answerStatus={answerStatus}
          />
          
          {streak >= 3 && (
            <div className="mt-4 text-center text-2xl font-bold text-[#ff9800]">
              {streak} streak! Keep it up! 🔥
            </div>
          )}

          {achievements.length > 0 && (
            <div className="mt-6 text-center">
            <h4 className="text-2xl font-semibold text-teal-600 mb-3">  {/* Changed to teal */}
              Achievements Unlocked:
            </h4>
            <ul className="space-y-2">
              {achievements.map((achievement, index) => (
                <li
                  key={index}
                  className="flex items-center justify-center text-lg font-medium text-green-600"
                >
                  <span className="mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4M5 12l2 2 4-4M3 12l2 2 4-4"
                      />
                    </svg>
                  </span>
                {achievement}
              </li>))}
          </ul></div>)}
          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={handlePrevQuestion}
              className="bg-gray-600 text-white py-3 px-6 rounded-full shadow-md 
                        transition-all duration-300 hover:bg-gray-700 disabled:opacity-50"
              disabled={currentQuestionIndex === 0}
            >
              ⬅ Previous
            </button>

            <button
              onClick={currentQuestionIndex === quizData.questions.length - 1 ? handleFinishQuiz : handleNextQuestion}
              className="bg-blue-600 text-white py-3 px-6 rounded-full shadow-md 
                transition-all duration-300 hover:bg-blue-700"
            >
              {currentQuestionIndex === quizData.questions.length - 1 ? '✅ Finish Quiz' : 'Next ➡'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;