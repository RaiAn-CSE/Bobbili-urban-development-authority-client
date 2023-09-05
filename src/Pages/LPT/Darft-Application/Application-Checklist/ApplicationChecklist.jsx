import { useState } from "react";
import ChecklistQuestions from "./Questions.json"

function ApplicationChecklist() {
    const [Questions, setQuestions] = useState(ChecklistQuestions.Questions);
    const handleAnswer = (event) => {
        const { name, value } = event.target;

        console.log(name, value)
        const updated = Questions.map(data => {
            console.log( typeof(name))
         return   { ...data, answer: (data.no == name) ? value === "yes" ? true : false : "" }});
            console.log(updated)
        return setQuestions(updated)
    }
    return (
        <div>
            {
                Questions.map(data => {
                    const { no, question, answer } = data;
                    return (
                        <div key={no}>
                            <p>{no}. {question}</p>
                            <div>
                                <label htmlFor="">
                                    <input onChange={(e) => handleAnswer(e)} value="yes" type="radio" name={no} className="radio radio-success" />
                                    Yes
                                </label>
                                <label htmlFor="">
                                    <input onChange={(e) => handleAnswer(e)} value="no" type="radio" name={no} className="radio radio-success" />
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