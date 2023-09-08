import React, { useState } from "react";
import ChecklistQuestions from "../../../../assets/AppChecklist.json";
import { Link } from "react-router-dom";

function AppChecklist() {
  const LocalItems = JSON.parse(localStorage.getItem("ApplicationList"));

  const [questions, setQuestions] = useState(ChecklistQuestions.Questions);

  const handleAnswer = (event, questionNo) => {
    const updatedQuestions = questions?.map((question) => ({
      ...question,
      answer: question.no === questionNo ? event.target.value : question.answer,
    }));
    setQuestions(updatedQuestions);
  };
  const handleSave = () => {
    localStorage.setItem("ApplicationList", JSON.stringify(questions));
  };
  return (
    <div className="lg:px-20 text-sm p-3 bg-gray-50">
      <div className=" space-y-7 lg:space-y-4 ">
        {questions?.map(({ no, question, answer }) => (
          <div key={no} className="lg:flex items-center justify-center">
            <p className="flex-1 text-black rounded lg:pr-5">
              {no}. {question}
            </p>
            <div className="space-x-10 mt-2 lg:pr-2">
              <label className="ml-2 inline-flex items-center space-x-1 text-black">
                <input
                  type="radio"
                  name={no}
                  value="yes"
                  className="radio radio-md radio-success"
                  checked={answer === "yes"}
                  onChange={(event) => handleAnswer(event, no)}
                />
                <span>Yes</span>
              </label>
              <label className="ml-2 inline-flex items-center space-x-1 text-black">
                <input
                  type="radio"
                  name={no}
                  value="no"
                  className="radio radio-md radio-success"
                  checked={answer === "no"}
                  onChange={(event) => handleAnswer(event, no)}
                />
                <span>No</span>
              </label>
            </div>
          </div>
        ))}
      </div>
      <Link to="/dashboard/draftApplication/documents">
        <button
          className="py-3 px-4 bg-green-600 rounded font-bold uppercase text-black mt-3 DisplayFair"
          onClick={() => handleSave()}
        >
          Save and Next
        </button>
      </Link>
    </div>
  );
}

export default AppChecklist;
