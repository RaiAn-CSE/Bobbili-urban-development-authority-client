import React, { useEffect, useState } from "react";

const ListOfLTP = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/allUser")
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
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 e"
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

      <div className="container mx-auto px-4 font-roboto ">
        <div className="py-4">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal text-center">
                {/* head */}
                <thead className="bg-[#303952]">
                  <tr>
                    <th className="p-3 border-b-2 border-gray-200  text-white  text-xs font-semibold uppercase tracking-wider">
                      Name
                    </th>
                    <th className="p-3 border-b-2 border-gray-200  text-white  text-xs font-semibold uppercase tracking-wider">
                      Contact no.
                    </th>
                    <th className="p-3 border-b-2 border-gray-200  text-white  text-xs font-semibold uppercase tracking-wider">
                      Email
                    </th>
                    <th className="p-3 border-b-2 border-gray-200  text-white  text-xs font-semibold uppercase tracking-wider">
                      Address
                    </th>
                    <th className="p-3 border-b-2 border-gray-200  text-white  text-xs font-semibold uppercase tracking-wider">
                      License no.
                    </th>
                    <th className="p-3 border-b-2 border-gray-200  text-white  text-xs font-semibold uppercase tracking-wider">
                      Validity
                    </th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {filteredData?.map((ltp) => {
                    return (
                      <tr key={ltp?._id}>
                        <td className="p-3  border-b border-gray-200 text-sm">
                          <p className="text-gray-900 break-words">
                            {ltp?.name}
                          </p>
                        </td>
                        <td className="p-3  border-b border-gray-200 text-sm">
                          <p className="text-gray-900 break-words">
                            {ltp?.phone ?? "N/A"}
                          </p>
                        </td>
                        <td className="p-3  border-b border-gray-200 text-sm">
                          <p className="text-gray-900 break-words">
                            {ltp?.email ?? "N/A"}
                          </p>
                        </td>
                        <td className="p-3  border-b border-gray-200 text-sm">
                          <p className="text-gray-900 break-words">
                            {ltp?.address ?? "N/A"}
                          </p>
                        </td>
                        <td className="p-3  border-b border-gray-200 text-sm">
                          <p className="text-gray-900 break-words">
                            {ltp?.licenseNo ?? "N/A"}
                          </p>
                        </td>
                        <td className="p-3  border-b border-gray-200 text-sm">
                          <p className="text-gray-900 break-words">
                            {ltp?.validity ?? "N/A"}
                          </p>
                        </td>
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
      </div>
    </div>
  );
};

export default ListOfLTP;
