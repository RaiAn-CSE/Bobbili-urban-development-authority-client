import React, { useState } from "react";
// import { AuthContext } from "../../../../AuthProvider/AuthProvider";
import { BiSolidDownArrow, BiSolidRightArrow } from "react-icons/bi";

const ShowSubmittedApplication = ({
  serialNo,
  applicationData,
  tableComponentProps,
}) => {
  // console.log(serialNo, applicationData);

  // const { showDraftApplication } = useContext(AuthContext)

  const { showPageBasedOnApplicationType, navigate } = tableComponentProps;

  console.log(showPageBasedOnApplicationType, navigate, "DDD");
  const { applicationNo, buildingInfo, applicantInfo, submitDate, status } =
    applicationData;

  const { generalInformation } = buildingInfo;
  const { applicantDetails } = applicantInfo;

  const [tableInfo, setTableInfo] = useState(false);
  const handleTableInfo = () => {
    tableInfo ? setTableInfo(false) : setTableInfo(true);
  };

  return (
    <>
      <tr className="hidden md:table-row">
        <td className="p-3  border-b border-gray-200 text-sm">
          <p className="text-gray-900 break-words">{serialNo + 1}</p>
        </td>
        <td
          className="hover:underline cursor-pointer border-b border-gray-200 text-sm"
          onClick={() =>
            showPageBasedOnApplicationType(applicationNo, navigate, "submit")
          }
        >
          <p className="text-gray-900 break-words">{applicationNo}</p>
        </td>
        <td className="p-3  border-b border-gray-200 text-sm">
          <p className="text-gray-900 break-words">
            {applicantDetails.length ? applicantDetails[0].name : "N/A"}
          </p>
        </td>
        <td className="p-3  border-b border-gray-200 text-sm">
          <p className="text-gray-900 break-words">
            {applicantDetails.length ? applicantDetails[0].phone : "N/A"}
          </p>
        </td>
        <td className="p-3  border-b border-gray-200 text-sm">
          <p className="text-gray-900 break-words">
            {generalInformation.caseType !== ""
              ? generalInformation.caseType
              : "N/A"}
          </p>
        </td>
        <td className="p-3  border-b border-gray-200 text-sm">
          <p className="text-gray-900 break-words">
            {generalInformation.village !== ""
              ? generalInformation.village
              : "N/A"}
          </p>
        </td>
        <td className="p-3  border-b border-gray-200 text-sm">
          <p className="text-gray-900 break-words">
            {generalInformation.mandal !== ""
              ? generalInformation.mandal
              : "N/A"}
          </p>
        </td>
        <td className="p-3  border-b border-gray-200 text-sm">
          <p className="text-gray-900 break-words">{submitDate ?? "N/A"}</p>
        </td>
        <td className="p-3 border-b border-gray-200 text-sm">
          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
            <span
              aria-hidden
              className={`absolute inset-0 bg-violet-400 font-white opacity-50 rounded-full`}
            ></span>
            <span className="relative">{status.split(" ")[0] ?? "N/A"}</span>
          </span>
          {/* <p className="text-gray-900 break-words">{status ?? "N/A"}</p> */}
        </td>
      </tr>

      <tr className="table-row md:hidden">
        <td id="accordion-collapse" data-accordion="collapse">
          <h2 id="accordion-collapse-heading-3">
            <button
              type="button"
              className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              data-accordion-target="#accordion-collapse-body-3"
              aria-expanded="false"
              aria-controls="accordion-collapse-body-3"
            >
              <span>
                What are the differences between Flowbite and Tailwind UI?
              </span>
              <svg
                data-accordion-icon
                className="w-3 h-3 rotate-180 shrink-0"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <span
            id="accordion-collapse-body-3"
            className="hidden"
            aria-labelledby="accordion-collapse-heading-3"
          >
            <div className="p-5 border border-t-0 border-gray-200 dark:border-gray-700">
              <p className="mb-2 text-gray-500 dark:text-gray-40 0">
                The main difference is that the core components from Flowbite
                are open source under the MIT license, whereas Tailwind UI is a
                paid product. Another difference is that Flowbite relies on
                smaller and standalone components, whereas Tailwind UI offers
                sections of pages.
              </p>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                However, we actually recommend using both Flowbite, Flowbite
                Pro, and even Tailwind UI as there is no technical reason
                stopping you from using the best of two worlds.
              </p>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Learn more about these technologies:
              </p>
              <ul className="pl-5 text-gray-500 list-disc dark:text-gray-400">
                <li>
                  <a
                    href="https://flowbite.com/pro/"
                    className="text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Flowbite Pro
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindui.com/"
                    rel="nofollow"
                    className="text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Tailwind UI
                  </a>
                </li>
              </ul>
            </div>
          </span>
        </td>
      </tr>
    </>
  );
};

export default ShowSubmittedApplication;
