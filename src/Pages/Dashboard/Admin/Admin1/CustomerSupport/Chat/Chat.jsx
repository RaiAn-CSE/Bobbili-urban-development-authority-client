import React, { useEffect, useState } from "react";
import socket from "../../../../../Common/socket";
import ConnectedCustomers from "./ConnectedCustomers";
import ChatWithCustomer from "./ChatWithCustomer";
import axios from "axios";
import toast from "react-hot-toast";

const Chat = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {}, [activeChat]);

  const chatEnd = async (id) => {
    console.log(id, "id");
    try {
      const { data } = await axios.patch(
        `http://localhost:5000/messageRequest?update=${JSON.stringify({
          id,
          action: "chatEnd",
        })}`
      );

      if (data.acknowledged) {
        toast.success("Chat removed");
      }
    } catch (err) {
      toast.error("Server Error");
    }
  };
  const removeUser = async (id) => {
    console.log(id, "ID");

    try {
      const { data } = await axios.delete(
        `http://localhost:5000/messageRequest?id=${id}`
      );

      if (data.acknowledged) {
        toast.success("Chat removed");
      }
    } catch (err) {
      toast.error("Server Error");
    }
  };

  function leftSideBar(setActiveChat, setShow) {
    return (
      <div
        className={` basis-[100%] md:basis-[30%] rounded-lg bg-[#7871e1] md:block`}
      >
        <ConnectedCustomers setActiveChat={setActiveChat} setShow={setShow} />
      </div>
    );
  }

  function rightSideBar(activeChat, setShow, removeUser) {
    return (
      <div
        className={` basis-[100%] md:basis-[68%] rounded-lg overflow-hidden md:block`}
      >
        <ChatWithCustomer
          activeChat={activeChat}
          setActiveChat={setActiveChat}
          setShow={setShow}
          removeUser={removeUser}
          chatEnd={chatEnd}
        />
      </div>
    );
  }
  return (
    <>
      <div className="md:hidden flex justify-between flex-wrap h-[calc(100vh-18vh)]">
        {/* left sidebar  */}
        {!show && leftSideBar(setActiveChat, setShow)}
        {/* right sidebar  */}
        {show && rightSideBar(activeChat, setShow, removeUser, chatEnd)}
      </div>

      <div className="hidden md:flex justify-between flex-wrap h-[calc(100vh-18vh)]">
        {/* left sidebar  */}
        {leftSideBar(setActiveChat, setShow)}
        {/* right sidebar  */}
        {rightSideBar(activeChat, setShow, removeUser, chatEnd)}
      </div>
    </>
  );
};

export default Chat;
