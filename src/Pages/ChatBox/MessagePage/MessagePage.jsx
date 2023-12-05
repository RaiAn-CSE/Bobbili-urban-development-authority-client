import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

const MessagePage = () => {
  const [timeEnd, setTimeEnd] = useState(false);

  useEffect(() => {
    socket.on("new-data", (data) => {
      // Handle the new data received from the server
      setNewData(data);
    });

    return () => {
      // Clean up event listeners on component unmount
      socket.off("new-data");
    };
  }, []);

  let counter = 60;
  setInterval(() => {
    if (counter > 0) {
      counter--;
    }
    document
      .getElementById("counterElement")
      .style.setProperty("--value", counter);
  }, 1000);

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
