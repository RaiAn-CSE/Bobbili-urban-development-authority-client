import React, { useContext, useEffect, useState } from "react";
import ChecklistQuestions from "../../../../assets/AppChecklist.json";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { useOutletContext } from "react-router-dom";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import SaveData from "./SaveData";
import toast from "react-hot-toast";

function AppChecklist() {
  const [openApplication, setOpenApplication] = useState(false);
  const [questions, setQuestions] = useState([...ChecklistQuestions.Questions]);
  const stepperData = useOutletContext();
  const [isStepperVisible, currentStep, steps] = stepperData;
  const {
    confirmAlert,
    sendUserDataIntoDB,
    getApplicationData,
    userInfoFromLocalStorage,
  } = useContext(AuthContext);

  // after select question firing here
  const handleAnswer = (event, questionNo) => {
    toast.success(`Clicked: ${questionNo}, Value: ${event.target.value}`);
    const updatedQuestions = questions.map((question) => ({
      ...question,
      answer:
        (question.id || question.no) === questionNo
          ? event.target.value
          : question.answer,
    }));
    setQuestions(updatedQuestions);
  };
  const applicationNo = JSON.parse(localStorage.getItem("CurrentAppNo"));

  const cameFrom = JSON.parse(localStorage.getItem("page"));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const gettingData = async () => {
      const applicationData = await getApplicationData(applicationNo, cameFrom);
      const applicationCheckList = applicationData?.applicationCheckList;
      console.log(
        applicationCheckList,
        "applicationChecklist from yes filtering"
      );
      if (applicationCheckList.length) {
        setQuestions(applicationCheckList);
      }
    };
    gettingData();
  }, []);

  const sendAppChecklistData = async (url) => {
    console.log(questions, "Question_All");
    return await sendUserDataIntoDB(url, "PATCH", {
      applicationNo: applicationNo,
      applicationCheckList: questions,
    });
  };
  const btn =
    "btn btn-md text-sm px-6 bg-Primary transition duration-700 hover:bg-btnHover hover:shadow-md";
  const role = userInfoFromLocalStorage().role;

  return (
    <div className="px-3 text-sm py-1 relative font-roboto">
      <div className="space-y-5">
        {questions.map(({ id, question, answer }) => (
          <div
            key={id}
            className="lg:flex items-center justify-center shadow-sm shadow-gray-100 rounded p-3"
          >
            <p className="flex-1 text-black rounded mb-5 text-base md:text-lg lg:mb-0 lg:pr-4">
              {id}. {question}
            </p>
            <div className="space-x-10 mt-2 lg:pr-2 lg:mt-0 text-base md:text-lg">
              <div className="radio-button-container ml-3">
                <div className="radio-button">
                  <input
                    type="radio"
                    className="radio-button__input"
                    id={`yes${id}`}
                    name={id}
                    value="yes"
                    checked={answer === "yes"}
                    onChange={(event) => handleAnswer(event, id)}
                    disabled={role === "PS" || cameFrom !== "draft"}
                  />
                  <label
                    className={`radio-button__label text-base ${
                      answer === "yes" ? "" : ""
                    }`}
                    htmlFor={`yes${id}`}
                  >
                    <span className="radio-button__custom"></span>
                    Yes
                  </label>
                </div>
                <div className="radio-button">
                  <input
                    type="radio"
                    id={`no${id}`}
                    className="radio-button__input"
                    name={id}
                    value="no"
                    checked={answer === "no"}
                    onChange={(event) => handleAnswer(event, id)}
                    disabled={role === "PS" || cameFrom !== "draft"}
                  />
                  <label
                    className="radio-button__label text-base"
                    htmlFor={`no${id}`}
                  >
                    <span className="radio-button__custom"></span>
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* save & continue  */}
      {/* navigation button  */}
      <SaveData
        isStepperVisible={isStepperVisible}
        currentStep={currentStep}
        steps={steps}
        stepperData={stepperData}
        confirmAlert={confirmAlert}
        collectInputFieldData={sendAppChecklistData}
      />
    </div>
  );
}

export default AppChecklist;
