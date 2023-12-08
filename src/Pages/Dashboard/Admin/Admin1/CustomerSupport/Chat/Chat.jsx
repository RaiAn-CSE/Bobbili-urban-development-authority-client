import React from "react";

const Chat = () => {
  return (
    <div className="flex justify-between flex-wrap h-[calc(100vh-18vh)]">
      <div className="basis-[30%] rounded-lg bg-blue-200">Left sidebar</div>
      <div className="basis-[68%] rounded-lg message-bg">Right sidebar</div>
    </div>
  );
};

export default Chat;
