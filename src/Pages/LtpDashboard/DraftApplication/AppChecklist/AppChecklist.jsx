import React, { useState } from "react";
import ChecklistQuestions from "./Questions.json";
import "./AppChecklist.css"

function AppChecklist() {
    // const LocalItems = JSON.parse(localStorage.getItem("ApplicationList"));

    const [questions, setQuestions] = useState(ChecklistQuestions.Questions);

    const handleAnswer = (event, questionNo) => {
        const updatedQuestions = questions.map((question) => ({
            ...question,
            answer: question.no === questionNo ? event.target.value : question.answer,
        }));
        setQuestions(updatedQuestions);
    };
    // const handleSave = () => {
    //     localStorage.setItem("ApplicationList", JSON.stringify(questions))
    // }
    return (
        <div className="question-container text-sm  md:py-4 p-7">
            {questions.map(({ no, question, answer }) => (
                <div key={no} className="question flex items-center ">
                    <p className="flex-1 text-black dark:text-white rounded pr-5">{no}. {question}            </p>
                    <div className=" space-x-10">
                        <label className="ml-2 inline-flex items-center space-x-1">
                            <input
                                type="radio"
                                name={no}
                                value="yes"
                                className="radio radio-success"
                                checked={answer === "yes"}
                                onChange={(event) => handleAnswer(event, no)}
                            />
                            <span>Yes</span>
                        </label>
                        <label className="ml-2 inline-flex items-center space-x-1">
                            <input
                                type="radio"
                                name={no}
                                value="no"
                                className="radio radio-success"
                                checked={answer === "no"}
                                onChange={(event) => handleAnswer(event, no)}
                            />
                            <span>No</span>
                        </label>
                    </div>

                </div>
            ))}
            <button className="py-3 px-4 bg-green-600 rounded font-bold uppercase text-dark dark:text-white mt-3 DisplayFair" onClick={() => handleSave()}>Save and Next</button>
        </div>
    );
}

export default AppChecklist;
