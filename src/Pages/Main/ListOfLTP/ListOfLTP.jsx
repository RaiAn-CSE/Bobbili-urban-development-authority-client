import React, { useEffect, useState } from "react";

const ListOfLTP = () => {
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/allUser")
      .then((res) => res.json())
      .then((data) => {
        setFilteredData(data.filter((user) => user?.role === "LTP"));
      });
  }, []);

  console.log(filteredData, "FILTERED DATA");
  return (
    <div>
      <form>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Application no. or owner name"
            required
          />
          <button
            type="submit"
            className="text-[#000] font-semibold absolute right-2.5 bottom-2.5 bg-[#ffd66c] hover:bg-[#e1bc60] focus:ring-4 focus:outline-none focus:ring-[#ffd66c] rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
      </form>

      {/* Location details  */}
      <div className="divide-y-2 divide-gray-200 mt-5">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>User name</th>
                <th>Email</th>
                <th>Contact no.</th>
                <th>Licence validity</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <td>Cy Ganderton</td>
                <td>Quality Control</td>
                <td>Blue</td>
                <td>Blue</td>
                <td>Blue</td>
              </tr>
              {/* row 2 */}
              <tr className="hover">
                <td>Hart Hagerty</td>
                <td>Desktop Support</td>
                <td>Purple</td>
                <td>Purple</td>
                <td>Purple</td>
              </tr>
              {/* row 3 */}
              <tr>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
                <td>Red</td>
                <td>Red</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListOfLTP;
