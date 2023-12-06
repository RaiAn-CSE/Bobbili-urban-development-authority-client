import React from "react";

const ShowNewMessages = ({
  serialNo,
  applicationData,
  tableComponentProps,
}) => {
  return (
    <>
      <tr className="table-row">
        <td className="p-3  border-b border-gray-200 text-sm">
          <p className="text-gray-900 break-words">{serialNo + 1}</p>
        </td>
        <td className="hover:underline cursor-pointer border-b border-gray-200 text-sm">
          <p className="text-gray-900 break-words">1</p>
        </td>
        <td className="p-3  border-b border-gray-200 text-sm">
          <p className="text-gray-900 break-words">{"N/A"}</p>
        </td>
        <td className="p-3  border-b border-gray-200 text-sm">
          <p className="text-gray-900 break-words">{"N/A"}</p>
        </td>
        <td className="p-3  border-b border-gray-200 text-sm">
          <p className="text-gray-900 break-words">{"N/A"}</p>
        </td>
        <td className="p-3  border-b border-gray-200 text-sm">
          <p className="text-gray-900 break-words">{"N/A"}</p>
        </td>
        <td className="p-3  border-b border-gray-200 text-sm">
          <p className="text-gray-900 break-words">{"N/A"}</p>
        </td>
        <td className="p-3  border-b border-gray-200 text-sm">
          <p className="text-gray-900 break-words">{"N/A"}</p>
        </td>
        <td className="p-3 border-b border-gray-200 text-sm">
          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
            <span
              aria-hidden
              className={`absolute inset-0 bg-violet-400 font-white opacity-50 rounded-full nm_Container`}
            ></span>
            <span className="relative ">{"N/A"}</span>
          </span>
          {/* <p className="text-gray-900 break-words">{status ?? "N/A"}</p> */}
        </td>
      </tr>
    </>
  );
};

export default ShowNewMessages;
