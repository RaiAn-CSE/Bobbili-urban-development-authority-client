import { useEffect, useState } from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";
import socket from "./Pages/Common/socket";

function App() {
  useEffect(() => {
    // Connect to Socket.IO server when the app starts
    socket.connect();

    return () => {
      // Disconnect from Socket.IO when the component unmounts
      socket.disconnect();
    };
  }, []);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
