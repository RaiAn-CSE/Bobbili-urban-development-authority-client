import React, { useEffect, useState } from "react";
import maleImg from "../../../../../../assets/images/male.png";
import femaleImg from "../../../../../../assets/images/female.png";
import unknownImg from "../../../../../../assets/images/unknown.png";
import { PiPhoneDisconnectFill } from "react-icons/pi";
import { FaFacebookMessenger } from "react-icons/fa6";

const ShowNewMessages = ({
  serialNo,
  applicationData,
  tableComponentProps,
}) => {
  const [loading, setLoading] = useState(false);
  const [userImg, setUserImg] = useState(unknownImg);

  useEffect(() => {
    if (applicationData?.gender === "male") {
      setUserImg(maleImg);
    } else if (applicationData?.gender === "female") {
      setUserImg(femaleImg);
    }
  }, []);

  // useEffect(() => {
  //   fetch(`https://api.genderize.io?name=${applicationData.name.split(" ")[0]}`)
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result, "Result");
  //       if (result?.gender?.toLowerCase() === "male") {
  //         setUserImg(maleImg);
  //       } else if (result?.gender?.toLowerCase() === "female") {
  //         setUserImg(femaleImg);
  //       }
  //     });
  // }, []);
  return (
    <>
      <tr className="table-row hover:bg-white">
        <td className="p-3 border-b border-gray-200 text-sm font-bold">
          <p className="text-gray-900 break-words">{serialNo + 1}</p>
        </td>
        <td className="cursor-pointer border-b border-gray-200 text-sm flex justify-center items-center gap-4">
          <div className="h-20">
            <img
              src={userImg}
              alt="Customer avatar"
              className="h-full object-cover"
            />
          </div>
          <div className="text-start">
            <p className="text-xl font-bold text-normalViolet">
              {applicationData?.name}
            </p>
            <p className="text-gray-500 font-mono text-base">
              {applicationData?.mobile}
            </p>
          </div>
        </td>
        <td className="p-3  border-b border-gray-200 text-sm">
          {tableComponentProps?.loadOnAccept ? (
            <span className="loading loading-dots loading-lg text-normalViolet"></span>
          ) : (
            <button
              className="text-white fancy-button"
              onClick={() => {
                tableComponentProps.acceptNewMessage(applicationData._id);
              }}
            >
              <FaFacebookMessenger size={18} />
            </button>
          )}
        </td>
      </tr>
    </>
  );
};

export default ShowNewMessages;
