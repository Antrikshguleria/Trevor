import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const QuestionCard = ({ question, onAnswerSelect, selectedAnswer, answerStatus }) => {
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    if (answerStatus === "incorrect") {
      setShaking(true);
      setTimeout(() => setShaking(false), 500); // Reset shaking animation after 500ms
    }
  }, [answerStatus]);

  const handleAnswerSelect = (option) => {
    const startTime = Date.now();
    onAnswerSelect(option); // This will set the selectedAnswer and possibly the answerStatus
  };

  const shakingStyle = shaking ? { animation: "shake 0.5s ease-in-out" } : {};

  // Only show feedback if answerStatus is not null (answer has been marked)
  const isAnswered = selectedAnswer !== null;

  return (
    <div className="bg-[#c8d8e4] p-6 rounded-3xl shadow-xl max-w-3xl mx-auto mb-8" style={shakingStyle}>
      <h3 className="text-2xl font-extrabold text-[#2b6777] text-center mb-4">Question</h3>
      <div className="text-xl font-semibold text-[#2b6777] mb-4 text-center">{question.description}</div>

      <div className="space-y-4">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleAnswerSelect(option)}
            className={`block w-full p-4 text-left rounded-lg transition-all ${
              selectedAnswer === option
                ? answerStatus === "correct"
                  ? "bg-green-500 text-white border-4 border-green-700"
                  : "bg-red-500 text-white border-4 border-red-700"
                : "bg-[#c8d8e4] border-2 border-[#2b6777] hover:bg-[#2b6777] hover:text-white"
            }`}>
            {option.description}
          </button>
        ))}
      </div>

      {/* Only show feedback if the question has been answered */}
      {isAnswered && (
        <div
          className={`p-3 mt-4 rounded-md text-center text-white ${
            answerStatus === "correct" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <div className="flex items-center justify-center">
            {answerStatus === "correct" ? (
              <FaCheckCircle className="mr-2 text-3xl text-white" />
            ) : (
              <FaTimesCircle className="mr-2 text-3xl text-white" />
            )}
            <span className="text-xl font-bold">
              {answerStatus === "correct" ? "Correct Answer!" : "Wrong Answer!"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;