import React from "react";
import userIcon from "../../../../assets/images/user.png";

const IndividualUser = ({ user }) => {
  console.log(user, "user");
  return (
    <>
      {user === [] ? (
        <tr>
          <td>No data</td>
        </tr>
      ) : (
        <tr>
          <td>
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <div className="mask mask-squircle w-8 h-8 md:w-12 md:h-12">
                  <img src={userIcon} alt="Avatar Tailwind CSS Component" />
                </div>
              </div>
              <div>
                <div className="font-bold text-sm md:text-base">
                  {user?.name}
                </div>
                <div className="opacity-50 text-xs md:text-sm">
                  ({user?.role})
                </div>
              </div>
            </div>
          </td>
          <td>
            <button className="btn btn-warning btn-xs me-3">update</button>
            <button className="btn btn-error btn-xs">Delete</button>
          </td>
        </tr>
      )}
    </>
  );
};

export default IndividualUser;