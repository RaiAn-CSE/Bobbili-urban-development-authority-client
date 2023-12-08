import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import chatAvatarImg from "../../../assets/images/chat.png";
import { MdSend } from "react-icons/md";
import socket from "../../Common/socket";

const MessagePage = ({ props }) => {
  const { setUserInfo, setRequestSent, userInfo, requestSent } = props;
  const [timeEnd, setTimeEnd] = useState(false);
  const [checkUpdateData, setCheckUpdateData] = useState({});
  const [error, setError] = useState("");
  const [isAccepted, setIsAccepted] = useState(false);

  console.log(userInfo, "Userinfo");

  useEffect(() => {
    !timeEnd &&
      socket.on("check-accept-message", (data) => {
        // Handle the new data received from the server
        console.log(data, "Data");

        console.log(userInfo, "Userinfo");
        if (
          data?.change?.updateDescription?.updatedFields?.isAccepted &&
          userInfo?.uniqueId === data?.change?.documentKey?._id
        ) {
          socket.off("check-accept-message");
          setCheckUpdateData(data);
          setIsAccepted(true);
          axios.patch(
            `http://localhost:5000/messageRequest?update=${JSON.stringify({
              id: userInfo.uniqueId,
              senderId: data.senderId,
              action: "sendId",
            })}`
          );
        }
      });

    return () => {
      // Clean up event listeners on component unmount
      socket.off("check-accept-message");
      //   clearInterval(countDownInterval);
    };
  }, [socket, timeEnd]);

  //   let counter = 10;
  //   const countDownInterval = setInterval(() => {
  //     if (counter > 0) {
  //       counter = counter - 1;
  //       console.log(counter, "INSIde interval");
  //       //   counter === 0 && setTimeEnd(true);
  //     }

  //     document
  //       .getElementById("counterElement")
  //       .style.setProperty("--value", counter);
  //   }, 1000);

  const [counter, setCounter] = useState(10);

  useEffect(() => {
    const countDownInterval = setInterval(() => {
      if (counter > 0) {
        setCounter((prevCounter) => prevCounter - 1);
      }
    }, 1000);

    // Cleanup function to clear the interval when the component is unmounted
    return () => {
      clearInterval(countDownInterval);
    };
  }, [counter]);

  useEffect(() => {
    if (counter === 0) {
      setTimeEnd(true);
      socket.off("check-accept-message");
      console.log("Counter inside");
      fetch(
        `http://localhost:5000/messageRequest?update=${JSON.stringify({
          id: userInfo.uniqueId,
          action: "timeUp",
        })}`,
        {
          method: "PATCH",
        }
      )
        .then((res) => res.json())
        .then((result) => {
          console.log(result, "result");
        })
        .catch((err) => {
          toast.error("Server Error");
          setError("Server Error");
        });
    }
  }, [counter]);

  console.log(isAccepted, "HELLO");

  const requestAgain = async () => {
    // clearInterval(countDownInterval);
    try {
      const { data } = await axios.patch(
        `http://localhost:5000/messageRequest?update=${JSON.stringify({
          id: userInfo.uniqueId,
          action: "requestAgain",
        })}`
      );

      console.log(data, "UPDATE REQ");

      if (data.acknowledged) {
        setCounter(30);
        setTimeEnd(false);
        setCheckUpdateData({});
        setError("");
        setIsAccepted(false);
        socket.on("check-accept-message");
      }
    } catch (error) {
      setError("Server Error");
    }
  };

  return (
    <div className="h-full overflow-hidden rounded-md">
      {!isAccepted && (
        <div className="message-box h-full flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-3">
            <div className="text-2xl font-bold text-normalViolet">
              Bobbili Urban Development Authority
            </div>
            <div className="h-[150px]">
              <img
                src={chatAvatarImg}
                alt="An image of avatar"
                className="h-full"
              />
            </div>
          </div>
          {timeEnd && (
            <div>
              <button
                className="bg-normalViolet text-white fancy-button mt-4"
                onClick={requestAgain}
              >
                Request Again
              </button>
            </div>
          )}{" "}
          {!timeEnd && (
            <div className="flex flex-col justify-center items-center">
              <span
                id="counterElement"
                className={`${
                  counter < 15 ? "text-red-500" : "text-normalViolet"
                } text-black text-xl font-bold inline-block`}
                style={{ "--value": counter }}
              >
                {counter}
              </span>
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold font-poppins">
                  <span className="text-warning">Please wait.</span>{" "}
                  <span className="text-normalViolet">Connecting</span>
                </p>
                <span className="loading loading-dots loading-lg text-normalViolet"></span>
              </div>
            </div>
          )}
        </div>
      )}
      {isAccepted && (
        <div className="h-full bg-[#c9c0fd] flex flex-col justify-between">
          {/* upper part  */}
          <div className="bg-normalViolet h-[10vh] w-full items-center flex gap-3">
            <div className="h-full">
              <img
                src={chatAvatarImg}
                alt="customer support user avatar image"
                className="h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center ">
              <p className="font-bold text-white text-lg">
                Bobbili Urban Development Authority
              </p>
              <span className="text-white font-bold text-xs">
                Customer Support
              </span>
            </div>
          </div>

          {/* message box part  */}

          <div className="flex-1 p-3 bg-white"></div>

          {/* input boxes */}
          <form className="flex justify-between items-center">
            <input
              className="input input-bordered rounded-none focus:outline-none bg-gray-200  flex-1"
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
      )}
    </div>
  );
};

export default MessagePage;
