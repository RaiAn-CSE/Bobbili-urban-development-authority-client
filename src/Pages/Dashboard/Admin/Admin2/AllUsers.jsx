import React, { useEffect, useState } from "react";
import IndividualUser from "./IndividualUser";
import tableStyle from "../../../../Style/tableStyle.module.css";
import { useQuery } from "react-query";
import Loading from "../../../Shared/Loading";

const AllUsers = () => {
  const [records, setRecords] = useState([]);

  const { data, refetch, isLoading, isSuccess } = useQuery({
    queryKey: ["allUser"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/allUser");
      const data = await response.json();
      return data;
    },
  });

  useEffect(() => {
    if (isSuccess) {
      console.log("success");
      console.log(data);

      setRecords([...data]);
    }
  }, [isSuccess, data]);

  // console.log(records);

  const filter = (event) => {
    console.log(data);
    setRecords(data.filter((f) => f?.name?.includes(event.target.value)));
    console.log(records);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {/* <h1 className="mt-10 text-center text-3xl font-bold Roboto">All Users</h1> */}

      {/* input box for search users  */}
      <div className="form-control mt-5 w-1/2 mx-auto  max-w-xs">
        <div>
          <label
            for="search"
            class="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
          >
            Search User
          </label>
          <input
            type="text"
            id="search"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="John"
            onChange={filter}
            required
          />
        </div>
      </div>

      {/* display users  */}
      <div className="overflow-x-auto">
        <table className="table w-[70%] mx-auto mt-10 border">
          {/* head */}
          <thead className="bg-[#C0E9E4] Roboto font-bold text-black text-center">
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {records?.map((user) => (
              <IndividualUser user={user} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllUsers;
