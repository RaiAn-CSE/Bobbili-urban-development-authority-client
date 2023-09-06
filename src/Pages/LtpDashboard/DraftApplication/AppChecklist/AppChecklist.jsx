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
        <div className="question-container">
            {questions.map(({ no, question, answer }) => (
                <div key={no} className="question">
                    <p>{no}. {question}</p>
                    <div className="space-x-5">
                        <label className="radio-inputs">
                            <input
                                type="radio"
                                name={no}
                                value="yes"
                                className="radio radio-success"
                                checked={answer === "yes"}
                                onChange={(event) => handleAnswer(event, no)}
                            />
                            Yes
                        </label>
                        <label className="radio-inputs">
                            <input
                                type="radio"
                                name={no}
                                value="no"
                                className="radio radio-success"
                                checked={answer === "no"}
                                onChange={(event) => handleAnswer(event, no)}
                            />
                            No
                        </label>
                    </div>
                </div>
            ))}
            <button onClick={() => handleSave()}>Save and Next</button>
        </div>
    );
}

export default AppChecklist;
