import "./App.css";
import questions from "./questions.json";
import { useState } from "react";

/* const initialState = {
  current: 0,
  select: [],
  score: 0,
  show: false,
}; */

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  // const [state, setState] = useState(initialState);

  /* Vastausten valinta */
  const handleAnswerOption = (answer) => {
    setSelectedOptions([
      (selectedOptions[currentQuestion] = { answerByUser: answer }),
    ]);
    setSelectedOptions([...selectedOptions]);
  };

  /* Edelliseen vastaukseen siirtyminen */
  const handlePrevious = () => {
    const prevQues = currentQuestion - 1;
    prevQues >= 0 && setCurrentQuestion(prevQues);
  };

  /* Seuraavaan vastaukseen siirtyminen */
  const handleNext = () => {
    const nextQues = currentQuestion + 1;
    nextQues < questions.length && setCurrentQuestion(nextQues);
  };

  /* Valmis */
  const handleSubmitButton = () => {
    let newScore = 0;
    for (let i = 0; i < questions.length; i++) {
      /*for (let j = 0; j < questions[i].answerOptions.length; j++) {
        j.isCorrect &&
          j.answer === selectedOptions[i]?.answerByUser &&
          newScore++;
      }*/
      questions[i].answerOptions.map((answer) => {
        answer.isCorrect &&
          answer.answer === selectedOptions[i]?.answerByUser &&
          newScore++;
      });
    }
    setScore(newScore);
    setShowScore(true);
  };

  /* Uudelleen aloitus */
  const handleRestart = () => {
    //window.location.reload(false);
    //const restart = currentQuestion - questions.length;
    //setScore(0);
    setShowScore(false);
    setCurrentQuestion(0);
    setSelectedOptions([]);
  };

  return (
    <div className="flex flex-col w-screen px-5 h-screen bg-[#1A1A1A] justify-center items-center">
      {showScore ? (
        <div>
          <h1 className="text-3xl font-semibold text-center text-white">
            Tuloksesi {score} / {questions.length}
          </h1>
          <div className="w-full mt-4 text-white">
            <button
              onClick={handleRestart}
              className="transition ease-in-out w-full py-3 my-3 bg-indigo-600 rounded-lg hover:bg-indigo-900 duration-300"
            >
              Kokeile uudestaan
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-start w-2/3">
            <h4 className="mt-10 text-xl text-white/60">
              Kysymys {currentQuestion + 1} / {questions.length}
            </h4>
            <div className="mt-4 text-2xl text-white">
              {questions[currentQuestion].question}
            </div>
          </div>
          <div className="flex flex-col w-2/3">
            {questions[currentQuestion].answerOptions.map((answer, index) => (
              <div
                key={index}
                className="transition ease-in-out flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-white/10 rounded-xl bg-white/5 hover:bg-indigo-900 duration-300"
                onClick={(e) => handleAnswerOption(answer.answer)}
              >
                <input
                  type="radio"
                  name={answer.answer}
                  value={answer.answer}
                  checked={
                    answer.answer ===
                    selectedOptions[currentQuestion]?.answerByUser
                  }
                  onChange={(e) => handleAnswerOption(answer.answer)}
                  className="w-6 h-6 cursor-pointer"
                />
                <p className="ml-6 text-white">{answer.answer}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between w-2/3 mt-4 text-white">
            <button
              onClick={handlePrevious}
              className="transition ease-in-out w-[49%] py-3 bg-indigo-600 rounded-lg hover:bg-indigo-900 duration-300"
            >
              Edellinen
            </button>
            <button
              onClick={
                currentQuestion + 1 === questions.length
                  ? handleSubmitButton
                  : handleNext
              }
              className="transition ease-in-out w-[49%] py-3 bg-indigo-600 rounded-lg hover:bg-indigo-900 duration-300"
            >
              {currentQuestion + 1 === questions.length ? "Valmis" : "Seuraava"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
