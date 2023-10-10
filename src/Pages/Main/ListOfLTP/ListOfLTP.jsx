import React, { useEffect, useState } from "react";

const ListOfLTP = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("https://residential-building.vercel.app/allUser")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);

        const ltpData = data.filter((user) => user?.role === "LTP");

        setAllData(ltpData);
        setFilteredData(ltpData);
      });
  }, []);

  const handleSearchLtp = (e) => {
    const searchValue = e.target.value;

    if (searchValue.length) {
      setFilteredData((prev) => {
        const newSearchValue = allData.filter(
          (user) => user?.name.toLowerCase() === searchValue.toLowerCase()
        );

        console.log(newSearchValue, "new search value");
        return newSearchValue;
      });
    } else {
      setFilteredData(allData);
    }
  };

  const gradientColor = "bg-gradient-to-r from-violet-500 to-fuchsia-500";

  console.log(filteredData, "FILTERED DATA");

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }
  return (
    <div className="w-full h-full p-4">
      <form>
        <label
          htmlFor="default-search"
          className={`mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white ${gradientColor}`}
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
            onChange={(e) => handleSearchLtp(e)}
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Search LTP by name"
            required
          />
          {/* <button
            type="submit"
            className={`font-semibold absolute right-2.5 bottom-2.5 ${gradientColor} text-white rounded-lg text-sm px-4 py-2`}
          >
            Search
          </button> */}
        </div>
      </form>

      {/* Location details  */}
      <div className="divide-y-2 divide-gray-200 mt-5 font-roboto">
        <div className="overflow-x-auto">
          <table className="table text-center">
            {/* head */}
            <thead className={`text-base text-black bg-indigo-300`}>
              <tr>
                <th>Name</th>
                <th>User name</th>
                <th>Email</th>
                <th>Contact no.</th>
                <th>License validity</th>
              </tr>
            </thead>
            <tbody>
              {filteredData?.map((ltp) => {
                return (
                  <tr key={ltp?._id}>
                    <td>{ltp?.name}</td>
                    <td>{ltp?.userId}</td>
                    <td>{ltp?.email ?? "N/A"}</td>
                    <td>{ltp?.phone ?? "N/A"}</td>
                    <td>{ltp?.validity ?? "N/A"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredData?.length === 0 && (
            <p className="text-center my-5 text-base text-red-500">
              No data found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListOfLTP;
