import React, { useRef, useState } from "react";
import "./Quiz.css";
import { data } from "../assets/data";

const Quiz = () => {
  const [index, setIndex] = useState(0); // Start at the first question
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);

  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);
  const option_array = [option1, option2, option3, option4];

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        option_array[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  const next = () => {
    if (lock === true) {
      const newIndex = index + 1;
      if (newIndex < data.length) {
        setIndex(newIndex);
        setQuestion(data[newIndex]); // Update question to the next one
      } else {
        // Handle end of quiz, reset or show results
        console.log("Quiz completed!");
      }
      setLock(false);
    }
  };

  // Debugging logs
  console.log("Current question index:", index);
  console.log("Current question data:", question);
  console.log("Current score:", score);

  return (
    <div className="container">
      <h1>Quiz APP</h1>
      <hr />
      <h2>
        {index + 1}. {question.question}
      </h2>
      <ul>
        <li ref={option1} onClick={(e) => checkAns(e, 1)}>
          {question.option1}
        </li>
        <li ref={option2} onClick={(e) => checkAns(e, 2)}>
          {question.option2}
        </li>
        <li ref={option3} onClick={(e) => checkAns(e, 3)}>
          {question.option3}
        </li>
        <li ref={option4} onClick={(e) => checkAns(e, 4)}>
          {question.option4}
        </li>
      </ul>
      <button onClick={next}>Next</button>
      <div className="index">
        {index + 1} of {data.length} questions
      </div>
      <p>Score: {score}</p>
    </div>
  );
};

export default Quiz;
