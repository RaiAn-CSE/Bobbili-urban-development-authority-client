import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { IoRemoveCircleSharp } from "react-icons/io5";
import { MdMenu, MdOutlineCancelScheduleSend, MdSend } from "react-icons/md";
import maleImg from "../../../../../../assets/images/male.png";
import femaleImg from "../../../../../../assets/images/female.png";
import unknownImg from "../../../../../../assets/images/unknown.png";
const ChatWithCustomer = ({ activeChat, setShow }) => {
  console.log(activeChat, "c");
  return (
    <>
      {activeChat ? (
        <div className="flex flex-col">
          {/* header part  */}
          <div className="bg-[#7871e1] h-16 flex items-center gap-3 px-4">
            {/* arrow icon to hide  */}
            <IoMdArrowBack
              size={25}
              className="md:hidden text-white"
              onClick={() => setShow((prev) => !prev)}
            />

            {/* user info  */}
            <div className="flex items-center gap-3 flex-1 h-full">
              {/* image  */}
              <div className="h-full">
                <img
                  src={
                    (activeChat.gender === "male" && maleImg) ||
                    (activeChat.gender === "female" && femaleImg) ||
                    (activeChat.gender === "null" && unknownImg)
                  }
                  alt="user avatar image"
                  className="h-full"
                />
              </div>
              {/* user info  */}
              <div>
                <p className="text-xl font-bold text-white">
                  {activeChat.name}
                </p>
                <p className="text-white text-sm">Online</p>
              </div>
            </div>

            {/* menubar */}
            <div className="dropdown dropdown-end dropdown-hover">
              <div tabIndex={0} role="button" className="text-white m-1">
                <MdMenu size={30} />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-32"
              >
                <li>
                  <button className="flex items-center gap-2  text-normalViolet font-bold text-sm">
                    Chat End
                    <MdOutlineCancelScheduleSend size={18} />
                  </button>
                </li>
                <li>
                  <button className="flex items-center gap-2 text-red-500 font-bold text-sm">
                    Remove
                    <IoRemoveCircleSharp size={18} />
                  </button>
                </li>
              </ul>
            </div>
          </div>
          {/* message part  */}
          <div className="h-[calc(82vh-112px)] message-bg ">Message part</div>
          {/* input boxes  */}
          <form className="flex justify-between items-center ">
            <input
              className="input input-bordered rounded-none focus:outline-none bg-white  flex-1"
              type="text"
              name=""
              id=""
              placeholder="Type your message"
            />
            <button
              type="submit"
              className="bg-normalViolet text-white p-3 border-none fancy-button"
            >
              <MdSend size={20} />
            </button>
          </form>
        </div>
      ) : (
        <p className="flex justify-center items-center h-full text-2xl font-bold capitalize font-titleFont">
          Select user & start chat
        </p>
      )}
    </>
  );
};

export default ChatWithCustomer;
