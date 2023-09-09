import React from "react";
import IndividualUser from "./IndividualUser";
import tableStyle from "../../../../Style/tableStyle.module.css";
import { useQuery } from "react-query";

const AllUsers = () => {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["allUser"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/allUser");
      const data = response.json();
      return data;
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table w-[60%] mx-auto mt-16">
        {/* head */}
        <thead className="bg-[#b8e994] Roboto font-bold text-black text-center">
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {data?.map((user) => (
            <IndividualUser user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
