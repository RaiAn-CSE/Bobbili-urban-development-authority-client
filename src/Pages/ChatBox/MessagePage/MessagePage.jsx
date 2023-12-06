import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

const MessagePage = ({ props }) => {
  const { setUserInfo, setRequestSent, userInfo, requestSent } = props;
  const [timeEnd, setTimeEnd] = useState(false);
  const [checkUpdateData, setCheckUpdateData] = useState({});
  const [error, setError] = useState("");
  const [isAccepted, setIsAccepted] = useState(false);

  console.log(userInfo, "Userinfo");

  function handleCheckAcceptMessage(event) {
    console.log("Handling check-accept-message:", event.data);
    // Your logic for handling the check-accept-message event
  }

  useEffect(() => {
    !timeEnd &&
      socket.on("check-accept-message", (data) => {
        // Handle the new data received from the server
        console.log(data, "Data");

        console.log(userInfo, "Userinfo");
        if (userInfo.uniqueId === data.change.documentKey._id) {
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

  const [counter, setCounter] = useState(30);

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

  console.log("HELLO");

  const requestAgain = async () => {
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
    <div>
      {timeEnd && !isAccepted && (
        <div>
          <button className="bg-normalViolet text-white" onClick={requestAgain}>
            Request Again
          </button>
        </div>
      )}{" "}
      {!timeEnd && !isAccepted && (
        <div>
          <span className="countdown">
            <span id="counterElement" style={{ "--value": counter }}>
              {counter}
            </span>
          </span>
        </div>
      )}
      {isAccepted && <div>Accept</div>}
    </div>
  );
};

export default MessagePage;
