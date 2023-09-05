import { useState } from "react";
import ChecklistQuestions from "./Questions.json"

function ApplicationChecklist() {
    const [Questions, setQuestions] = useState(ChecklistQuestions.Questions);
    const handleAnswer = (event) => {
        console.log(event.target)
    }
    return (
        <div>
            {
                Questions.map(data => {
                    const { no, question, answer } = data;
                    return (
                        <div key={no}>
                            <p>{question}</p>
                            <div>
                                <label htmlFor="">
                                    <input onChange={(event) => handleAnswer(event)} type="radio" name={no} className="radio radio-success" />
                                    Yes
                                </label>
                                <label htmlFor="">
                                    <input onChange={(event) => handleAnswer(event)} type="radio" name={no} className="radio radio-success" />
                                    No
                                </label>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ApplicationChecklist;