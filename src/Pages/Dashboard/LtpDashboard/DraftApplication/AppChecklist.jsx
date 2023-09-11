import React, { useState } from "react";
import ChecklistQuestions from "../../../../assets/AppChecklist.json";
import { Link } from "react-router-dom";
import getPostData from "../../../Shared/getPostData";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

function AppChecklist() {
  // const LocalItems = JSON.parse(localStorage.getItem("ApplicationList"));
  const btn =
    "btn btn-md text-sm px-6 bg-Primary transition duration-700 hover:bg-btnHover hover:shadow-md";

  const [questions, setQuestions] = useState(ChecklistQuestions.Questions);

  const handleAnswer = (event, questionNo) => {
    const updatedQuestions = questions.map((question) => ({
      ...question,
      answer: question.no === questionNo ? event.target.value : question.answer,
    }));
    setQuestions(updatedQuestions);
  };
  const handleSave = () => {
    getPostData(questions);
  };
  return (
    <div className="px-3 text-sm py-2">
      <div className="text-end my-4">
        <button className="btn text-xs bg-[#c0e9e4] transition-all duration-700 hover:bg-[#10ac84] text-[#000] hover:text-[#fff]">
          <HiOutlineClipboardDocumentList className="text-lg" /> Application
        </button>
      </div>
      <div className="space-y-5">
        {questions.map(({ no, question, answer }) => (
          <div
            key={no}
            className="lg:flex items-center justify-center shadow shadow-gray-100 rounded p-3"
          >
            <p className="flex-1 text-black rounded mb-5 text-sm md:text-base lg:mb-0 lg:pr-4">
              <span className="font-bold">{no}.</span> {question}
            </p>
            <div className="space-x-10 mt-2 lg:pr-2">
              <label
                className={`ml-2 inline-flex items-center space-x-1 text-black ${answer === "yes" && "font-extrabold"
                  }`}
              >
                <input
                  type="radio"
                  name={no}
                  value="yes"
                  className="radio radio-sm radio-success mr-3 lg:mr-0"
                  checked={answer === "yes"}
                  onChange={(event) => handleAnswer(event, no)}
                />
                <span>Yes</span>
              </label>
              <label
                className={`ml-2 inline-flex items-center space-x-1 text-black ${answer === "no" && "font-extrabold"
                  }`}
              >
                <input
                  type="radio"
                  name={no}
                  value="no"
                  className="radio radio-sm radio-success mr-3 lg:mr-0"
                  checked={answer === "no"}
                  onChange={(event) => handleAnswer(event, no)}
                />
                <span>No</span>
              </label>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-16 flex justify-center md:justify-end">
        <Link to="/dashboard/draftApplication/documents">
          <button className={`${btn}`} onClick={() => handleSave()}>
            Save and Next
          </button>
        </Link>
      </div>
    </div>
  );
}

export default AppChecklist;
