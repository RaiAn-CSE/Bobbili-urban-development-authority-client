import { useEffect, useState } from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";
import io from "socket.io-client";

const socket = io("https://localhost:5000/");

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
