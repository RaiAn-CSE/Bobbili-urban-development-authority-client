import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const MessagePage = ({ props }) => {
  const { setUserInfo, setRequestSent, userInfo, requestSent } = props;
  const [timeEnd, setTimeEnd] = useState(false);
  const [checkUpdateData, setCheckUpdateData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(userInfo, "Userinfo");
  useEffect(() => {
    !timeEnd &&
      socket.on("check-accept-message", (data) => {
        // Handle the new data received from the server
        console.log(data, "Data");
        console.log(userInfo.uniqueId === data.documentKey._id);
        console.log(userInfo.uniqueId, data.documentKey._id);
        console.log(userInfo, "Userinfo");
        if (userInfo.uniqueId === data.documentKey._id) {
          socket.off("check-accept-message");
          setCheckUpdateData(data.updateDescription.updateFields);

          axios.patch(
            `http://localhost:5000/messageRequest?update=${JSON.stringigy({
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
      clearInterval(countDownInterval);
    };
  }, [socket]);

  useEffect(() => {
    let counter = 10;
    const countDownInterval = setInterval(() => {
      if (counter > 0) {
        counter = counter - 1;
        console.log(counter, "INSIde interval");
        counter === 0 && setTimeEnd(true);
      }

      document
        .getElementById("counterElement")
        .style.setProperty("--value", counter);
    }, 1000);
  }, []);

  useEffect(() => {
    console.log(timeEnd, "timeEnd update");
    if (setTimeEnd) {
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
  }, [timeEnd]);

  console.log("HELLO");

  return (
    <div>
      <div>
        <span className="countdown">
          <span id="counterElement"></span>
        </span>
      </div>
    </div>
  );
};

export default MessagePage;
