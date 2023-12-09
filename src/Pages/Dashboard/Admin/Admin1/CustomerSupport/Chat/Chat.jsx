import React, { useState } from "react";
import socket from "../../../../../Common/socket";
import ConnectedCustomers from "./ConnectedCustomers";
import ChatWithCustomer from "./ChatWithCustomer";

const Chat = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [show, setShow] = useState(false);

  function leftSideBar(setActiveChat, setShow) {
    return (
      <div
        className={` basis-[100%] md:basis-[30%] rounded-lg bg-[#7871e1] md:block`}
      >
        <ConnectedCustomers setActiveChat={setActiveChat} setShow={setShow} />
      </div>
    );
  }

  function rightSideBar(activChat, setShow) {
    return (
      <div
        className={` basis-[100%] md:basis-[68%] rounded-lg overflow-hidden md:block`}
      >
        <ChatWithCustomer activeChat={activeChat} setShow={setShow} />
      </div>
    );
  }
  return (
    <>
      <div className="md:hidden flex justify-between flex-wrap h-[calc(100vh-18vh)]">
        {/* left sidebar  */}
        {!show && leftSideBar(setActiveChat, setShow)}
        {/* right sidebar  */}
        {show && rightSideBar(activeChat, setShow)}
      </div>

      <div className="hidden md:flex justify-between flex-wrap h-[calc(100vh-18vh)]">
        {/* left sidebar  */}
        {leftSideBar(setActiveChat, setShow)}
        {/* right sidebar  */}
        {rightSideBar(activeChat, setShow)}
      </div>
    </>
  );
};

export default Chat;
