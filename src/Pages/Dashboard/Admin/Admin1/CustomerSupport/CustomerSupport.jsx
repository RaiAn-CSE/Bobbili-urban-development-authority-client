import React from "react";
import NewMessage from "./NewMessage/NewMessage";
import MissedRequest from "./MissedRequest/MissedRequest";
import Chat from "./Chat/Chat";

const CustomerSupport = () => {
  return (
    <div role="tablist" className="tabs tabs-lifted m-3">
      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        className="tab text-base font-bold text-normalViolet checked:text-white [--tab-bg:#8B5BF6] [--tab-border-color:#8B5BF6]"
        aria-label="New"
        defaultChecked={true}
      />
      <div
        role="tabpanel"
        className="tab-content rounded-box p-6 bg-white h-[calc(100vh-10vh)] overflow-auto no-scrollbar"
      >
        <NewMessage />
      </div>

      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        className="tab text-base font-bold text-normalViolet checked:text-white [--tab-bg:#7871E1] [--tab-border-color:#7871E1]"
        aria-label="Chat"
      />
      <div
        role="tabpanel"
        className="tab-content rounded-box p-6 bg-white"
      >
        <Chat />
      </div>

      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        className="tab text-base font-bold text-normalViolet checked:text-white [--tab-bg:#8B5BF6] [--tab-border-color:#8B5BF6]"
        aria-label="Missed"
      />
      <div
        role="tabpanel"
        className="tab-content rounded-box p-6 bg-white h-[calc(100vh-10vh)] overflow-auto no-scrollbar"
      >
        <MissedRequest />
      </div>
    </div>
  );
};

export default CustomerSupport;
