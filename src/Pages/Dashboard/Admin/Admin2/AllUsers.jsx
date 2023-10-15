import React, { useContext, useEffect, useMemo, useState } from "react";
import IndividualUser from "./IndividualUser";
import { useQuery } from "react-query";
import Loading from "../../../Shared/Loading";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../AuthProvider/AuthProvider";

const AllUsers = () => {
  const [records, setRecords] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [error, setError] = useState("");

  const gradientColor = "bg-gradient-to-r from-violet-500 to-fuchsia-500";

  const { userInfoFromLocalStorage, checkLicenseExpirationOfLtp } =
    useContext(AuthContext);

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

  // delete user
  const deleteUser = (id) => {
    console.log(id);

    fetch(`http://localhost:5000/deleteUser/${id}`, {
      method: "DELETE",
    })
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

  // update user profile information
  const onSubmit = (data) => {
    console.log(data);

    const { _id, validity } = data;

    if (validity.length) {
      const validitySplit = validity.split("-");

      // HANDLING ERRORS OF USERS TYPING
      validitySplit.forEach((each, index) => {
        if (each.length < 2) {
          validitySplit[index] = validitySplit[index].padStart(2, "0");
        }

        if (validitySplit.length - 1 === index) {
          validitySplit[index] = validitySplit[index].padStart(4, "0");
        }
      });

      const validityInDateFormat = validitySplit.reverse().join("-");
      const isValidate = checkLicenseExpirationOfLtp(validityInDateFormat);
      console.log(isValidate, "IS VALIDATE");

      if (isValidate.length === 10) {
        const newUpdatedData = { ...data, validity: isValidate };

        delete newUpdatedData._id;

        console.log(newUpdatedData, "New updated data");
        fetch(`http://localhost:5000/updateUserInfo/${_id}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUpdatedData),
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
      } else {
        setError(isValidate);
      }
    } else {
      toast.error("Please fill up empty fields");
    }
  };

  const updateUser = (user) => {
    setError("");
    console.log(user);
    setUserInfo(user);
    setShowModal(true);
    document.getElementById("update_user").showModal();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="text-black">
      {/* <h1 className="mt-10 text-center text-3xl font-bold Roboto">All Users</h1> */}

      {/* input box for search users  */}
      <div className="form-control mt-5 w-1/2 mx-auto  max-w-xs">
        <div>
          <label
            htmlFor="search"
            className="block mb-2 text-base font-roboto font-bold text-gray-900 "
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
      <div className="overflow-x-auto transition-all duration-700">
        <table
          className={`table w-full font-roboto md:w-[70%] mx-auto mt-10 dark:text-white`}
        >
          {/* head */}
          <thead
            className={`bg-black font-bold text-white text-base text-center dark:bg-gradient-to-r dark:from-violet-500 dark:to-fuchsia-500`}
          >
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

      {records?.length === 0 && (
        <p className="font-roboto font-bold text-red-500 text-xl mt-7 text-center">
          No data found
        </p>
      )}

      {/* dialog box for update User  */}
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      {showModal && (
        <dialog
          id="update_user"
          className="modal modal-top h-full font-roboto transition-all duration-500"
        >
          <div className="modal-box dark:bg-black ">
            <h3 className="font-bold text-center my-10 text-2xl dark:text-white">
              Update Profile
            </h3>
            {/* close the modal  */}
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost fixed right-2 top-2 dark:text-white"
                htmlFor="update_user"
              >
                ✕
              </button>

              {/* <button className="absolute bottom-6 right-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Close
              </button> */}
            </form>

            {/* user information  */}
            <div className="modal-action justify-center">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* if there is a button in form, it will close the modal */}

                {/* form input boxes  */}

                <div className="grid gap-6 mb-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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

                <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      {...register("email", { required: true })}
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="test@gmail.com"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                    >
                      Phone no
                    </label>
                    <input
                      type="text"
                      {...register("phone", { required: true })}
                      id="phone"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter phone no"
                      maxLength={10}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                    >
                      Address
                    </label>
                    <textarea
                      id="address"
                      rows="2"
                      {...register("address", { required: true })}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter address..."
                    ></textarea>
                  </div>
                </div>

                {userInfo?.role === "LTP" && (
                  <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label
                        htmlFor="licenseNo"
                        className="block mb-2 text-base font-bold text-gray-900 dark:text-white"
                      >
                        License No
                      </label>
                      <input
                        type="text"
                        {...register("licenseNo", { required: true })}
                        id="licenseNo"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter license no"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="adharNo"
                        className="block mb-2 text-base font-bold '' text-gray-900 dark:text-white"
                      >
                        Aadhar no
                      </label>
                      <input
                        type="text"
                        {...register("adharNo", { required: true })}
                        id="adharNo"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter Aadhar No"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="validity"
                        className="block mb-2 text-base font-bold '' text-gray-900 dark:text-white"
                      >
                        Validity
                      </label>
                      <input
                        type="text"
                        {...register("validity", { required: true })}
                        id="validity"
                        placeholder="DD-MM-YYYY"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                  </div>
                )}

                {error.length !== 0 && (
                  <p className="text-red-500 text-center my-6">{error}</p>
                )}

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="text-white transition-all duration-700 shadow-md hover:shadow-violetDark bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:bg-gradient-to-l font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AllUsers;
