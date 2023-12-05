import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { LuMessagesSquare } from "react-icons/lu";
import axios from "axios";
import toast from "react-hot-toast";
import MessagePage from "../ChatBox/MessagePage/MessagePage";
import RequestPage from "../ChatBox/RequestPage/RequestPage";

const ChatBox = () => {
  const [userInfo, setUserInfo] = useState(null);

  const [requestSent, setRequestSent] = useState(false);

  return (
    <>
      {requestSent ? (
        <MessagePage />
      ) : (
        <RequestPage props={{ setUserInfo, setRequestSent }} />
      )}
    </>
  );
};

export default ChatBox;
