import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [isChatEnd, setIsChatEnd] = useState(0);
  console.log(userInfo, "Userinfo");

  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("login", {
      id: `Help-${userInfo?.name}-${userInfo?.mobileNo}`,
    });
  }, [socket]);

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
          setCheckUpdateData(data);
          setIsAccepted(true);
          setTimeout(true);
          // clearInterval(countDownInterval);
          // axios.patch(
          //   `http://localhost:5000/messageRequest?update=${JSON.stringify({
          //     id: userInfo.uniqueId,
          //     senderId: data.senderId,
          //     action: "sendId",
          //   })}`
          // );
        }
      });

    return () => {
      // Clean up event listeners on component unmount
      socket.off("check-accept-message");
    };
  }, [socket, timeEnd]);

  useEffect(() => {
    socket.on("check-accept-message", (data) => {
      // Handle the new data received from the server
      console.log(data, "Data");

      console.log(userInfo, "Userinfo");

      if (
        data?.change?.updateDescription?.updatedFields?.chatEnd === 1 &&
        userInfo?.uniqueId === data?.change?.documentKey?._id
      ) {
        setIsChatEnd(1);
      }

      if (
        data?.change?.operationType === "delete" &&
        userInfo?.uniqueId === data?.change?.documentKey?._id
      ) {
        setRequestSent(false);
      }
    });
  }, [socket]);

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

    if (isAccepted) {
      clearInterval(countDownInterval);
    }

    // Cleanup function to clear the interval when the component is unmounted
    return () => {
      clearInterval(countDownInterval);
    };
  }, [counter, isAccepted]);

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

          <div className="flex-1 p-3 message-bg"></div>

          {/* input boxes */}
          {!isChatEnd ? (
            <form className="flex justify-between items-center">
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
          ) : (
            <div className="bg-[#7871e1] p-4 text-center font-bold text-white">
              Your chat is End
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MessagePage;
