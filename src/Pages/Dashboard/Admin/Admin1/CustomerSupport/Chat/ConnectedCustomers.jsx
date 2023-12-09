import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../../../../AuthProvider/AuthProvider";
import maleImg from "../../../../../../assets/images/male.png";
import femaleImg from "../../../../../../assets/images/female.png";
import unknownImg from "../../../../../../assets/images/unknown.png";
import { FaUsers } from "react-icons/fa";

const ConnectedCustomers = ({ setActiveChat, setShow }) => {
  const { userInfoFromLocalStorage } = useContext(AuthContext);
  const [connectedUsers, setConnectedUsers] = useState([]);

  useEffect(() => {
    (async function () {
      const { data } = await axios.get(
        `http://localhost:5000/acceptMessage?role=${JSON.stringify(
          userInfoFromLocalStorage().role.toLowerCase()
        )}`
      );

      console.log(data, "data");
      setConnectedUsers(data);
    })();
  }, []);
  return (
    <div className="p-3">
      <p className="capitalize text-lg font-bold font-roboto flex justify-center items-center gap-4 text-white">
        <FaUsers size={20} /> Connected users
      </p>
      <div>
        {connectedUsers?.length === 0 ? (
          <div>No users</div>
        ) : (
          <>
            {connectedUsers?.map((user) => (
              <div
                key={user._id}
                className="flex items-center bg-white rounded-2xl gap-3 my-3 cursor-pointer"
                onClick={() => {
                  setActiveChat(user);
                  setShow((prev) => !prev);
                }}
              >
                <div className="h-16">
                  <img
                    className="h-full"
                    src={
                      (user.gender === "male" && maleImg) ||
                      (user.gender === "female" && femaleImg) ||
                      (user.gender === "null" && unknownImg)
                    }
                    alt="user avatar"
                  />
                </div>
                <div>
                  <p className="font-bold text-base">{user.name}</p>
                  <p className="text-gray-500">Last text</p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ConnectedCustomers;
