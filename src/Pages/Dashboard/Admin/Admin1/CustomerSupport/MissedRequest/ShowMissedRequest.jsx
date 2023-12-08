import React, { useState } from "react";
import customerImg from "../../../../../../assets/images/boy.png";
import { FaCircleCheck } from "react-icons/fa6";

const ShowMissedRequest = ({
  serialNo,
  applicationData,
  tableComponentProps,
}) => {
  console.log(applicationData, "application data");
  const [loading, setLoading] = useState(false);
  return (
    <>
      <tr className="table-row hover:bg-white">
        <td className="p-3 border-b border-gray-200 text-sm font-bold">
          <p className="text-gray-900 break-words">{serialNo + 1}</p>
        </td>
        <td className="cursor-pointer border-b border-gray-200 text-sm flex justify-center items-center gap-4">
          <div className="h-20">
            <img
              src={customerImg}
              alt="Customer avatar"
              className="h-full object-cover"
            />
          </div>
          <div className="text-start w-36">
            <p className="text-xl font-bold text-normalViolet capitalize">
              {applicationData?.name}
            </p>
            <p className="text-gray-500 font-mono text-base">
              {applicationData?.mobile}
            </p>
          </div>
        </td>
        <td className="p-3  border-b border-gray-200 text-sm">
          <button
            className="text-white fancy-button"
            onClick={() => {
              setLoading(true);
              tableComponentProps.checkedMissedMessage(applicationData._id);
              setLoading(false);
            }}
            disabled={loading}
          >
            <FaCircleCheck size={18} />
          </button>
        </td>
      </tr>
    </>
  );
};

export default ShowMissedRequest;
