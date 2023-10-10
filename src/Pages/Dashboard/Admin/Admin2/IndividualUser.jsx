import React, { useContext } from "react";

import userIcon from "../../../../assets/images/user.png";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";

const IndividualUser = ({ user, deleteUser, updateUser }) => {
  const { userInfoFromLocalStorage } = useContext(AuthContext);

  const userType = userInfoFromLocalStorage().role;
  // console.log(user, "user");

  return (
    <>
      <tr>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-8 h-8 md:w-12 md:h-12">
                <img src={userIcon} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold text-sm md:text-base">{user?.name}</div>
              <div className="opacity-50 text-start text-xs md:text-sm">
                ({user?.role})
              </div>
            </div>
          </div>
        </td>
        <td>
          {/* update user information button  */}
          <button
            className="btn btn-sm me-3 border-none bg-yellow-300 hover:bg-yellow-400 hover:shadow-md hover:shadow-yellow-500 "
            onClick={() => updateUser(user)}
            disabled={userType !== "Super Admin"}
          >
            <GrUpdate size={19} />
          </button>
          <button
            className="btn btn-sm text-white border-none bg-red-500 hover:bg-red-600 hover:shadow-md hover:shadow-red-500"
            onClick={() => deleteUser(user?._id)}
            disabled={userType !== "Super Admin"}
          >
            <RiDeleteBin5Fill size={19} />
          </button>
        </td>
      </tr>
    </>
  );
};

export default IndividualUser;
