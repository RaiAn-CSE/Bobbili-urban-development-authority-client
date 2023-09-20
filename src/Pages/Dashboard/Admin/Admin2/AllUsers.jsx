import React, { useEffect, useMemo, useState } from "react";
import IndividualUser from "./IndividualUser";
import tableStyle from "../../../../Style/tableStyle.module.css";
import { useQuery } from "react-query";
import Loading from "../../../Shared/Loading";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const AllUsers = () => {
  const [records, setRecords] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [showModal, setShowModal] = useState(true);

  const { data, refetch, isLoading, isSuccess } = useQuery({
    queryKey: ["allUser"],
    queryFn: async () => {
      const response = await fetch(
        "https://residential-building.vercel.app/allUser"
      );
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

  // delete user
  const deleteUser = (id) => {
    console.log(id);

    fetch(`http://localhost:5000/deleteUser/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        if (response.acknowledged) {
          toast.success("Deleted successfully");
          refetch();
        } else {
          toast.error("Failed to delete");
        }
      })
      .catch(() => {
        toast.error("Server Error");
      });
  };

  // update user information
  const { register, reset, handleSubmit } = useForm({
    defaultValues: useMemo(() => {
      console.log("User has changed");
      console.log(userInfo);
      return { ...userInfo };
    }, [userInfo]),
  });

  useEffect(() => {
    reset(userInfo);
  }, [userInfo]);

  useEffect(() => {
    setShowModal(true);
  }, [showModal]);

  const onSubmit = (data) => {
    console.log(data);

    const { _id } = data;

    fetch(`http://localhost:5000/updateUserInfo/${_id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.acknowledged) {
          toast.success("Updated successfully");
          refetch();
        } else {
          toast.error("Failed to update");
        }
        setShowModal(false);
      })
      .catch(() => {
        toast.error("Server error");
      });
  };

  const updateUser = (user) => {
    console.log(user);
    setUserInfo(user);
    setShowModal(true);
    document.getElementById("update_user").showModal();
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
            htmlFor="search"
            className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
          >
            Search User
          </label>
          <input
            type="text"
            id="search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="John"
            onChange={filter}
            required
          />
        </div>
      </div>

      {/* display users  */}
      <div className="overflow-x-auto">
        <table
          className={`table w-full md:w-[70%] mx-auto mt-10 ${tableStyle.table}`}
        >
          {/* head */}
          <thead className="bg-[#C0E9E4] Roboto font-bold text-black text-center">
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {records?.map((user) => (
              <IndividualUser
                key={user?._id}
                user={user}
                deleteUser={deleteUser}
                updateUser={updateUser}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* dialog box for update User  */}
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      {showModal && (
        <dialog
          id="update_user"
          className="modal modal-bottom sm:modal-middle transition-all duration-500"
        >
          <div className="modal-box">
            <h3 className="font-bold text-2xl">Profile</h3>
            {/* close the modal  */}
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                htmlFor="update_user"
              >
                ✕
              </button>
            </form>

            {/* user information  */}
            <div className="modal-action justify-center">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* if there is a button in form, it will close the modal */}

                {/* form input boxes  */}

                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="John"
                      {...register("name")}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="user_id"
                      className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                    >
                      User ID
                    </label>
                    <input
                      type="text"
                      id="user_id"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Doe"
                      {...register("userId")}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="text"
                      id="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="*****"
                      {...register("password")}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="role"
                      className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                    >
                      Role
                    </label>
                    <input
                      type="tel"
                      id="role"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="role"
                      {...register("role")}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default AllUsers;
