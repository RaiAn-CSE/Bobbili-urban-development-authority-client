import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const AddUser = () => {
  const { register, handleSubmit, resetField } = useForm();

  const [userType, setUserType] = useState(null);

  const gradientColor = "bg-gradient-to-r from-violet-500 to-fuchsia-500";
  const onSubmit = (data) => {
    console.log(data);

    if (data?.role.toLowerCase().includes("select an option")) {
      toast.error("Please select a role");
    } else {
      let userInfo;

      if (data?.role.toLowerCase() === "ltp") {
        userInfo = { ...data, draftApplication: [], submitApplication: [] };
      } else {
        userInfo = { ...data };
      }

      // store users data in the database
      fetch("http://localhost:5000/addUser", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(userInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          if (data.acknowledged) {
            toast.success("User added successfully");
            resetField("name");
            resetField("userId");
            resetField("password");
          }
          if (data?.result === 0) {
            console.log(data.message);
            toast.error(data.message);
          }
        })
        .catch(() => {
          toast.error("Server is not responded");
        });
    }
  };

  const handleChangeRole = (e) => {
    const value = e.target.value;
    console.log(value);
    setUserType(e.target.value);
  };
  return (
    <div className="mt-10">
      <h1
        className="text-xl
      lg:text-3xl text-center font-roboto roboto-bold "
      >
        Add a New User
      </h1>

      <form
        className="w-2/3 mx-auto mt-10 font-roboto text-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-base font-bold text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter user name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="id"
              className="block mb-2 text-base '' font-bold text-gray-900 dark:text-white"
            >
              User ID
            </label>
            <input
              type="text"
              {...register("userId", { required: true })}
              id="id"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter user id"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-base font-bold '' text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="text"
              {...register("password", { required: true })}
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="•••••••••"
              required
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="block mb-2 text-base font-bold text-gray-900 "
            >
              Role
            </label>
            <select
              id="role"
              {...register("role", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              onChange={(e) => handleChangeRole(e)}
            >
              <option value="Select an option">Select an option</option>
              <option value="LTP">LTP</option>
              <option value="PS">PS</option>
              <option value="UDA">UDA</option>
              <option value="Super Admin">Super Admin</option>
              <option value="Admin1">Admin1</option>
              <option value="Admin2">Admin2</option>
            </select>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-base font-bold text-gray-900 dark:text-white"
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
              className="block mb-2 text-base font-bold text-gray-900 dark:text-white"
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
              className="block mb-2 text-base font-bold text-gray-900 dark:text-white"
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

        {userType === "LTP" && (
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
                Adhar no
              </label>
              <input
                type="text"
                {...register("adharNo", { required: true })}
                id="adharNo"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter phone no"
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
                type="date"
                {...register("validity", { required: true })}
                id="validity"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
        )}

        <div className="flex justify-center my-10">
          <input
            type="submit"
            className={`text-white ${gradientColor} cursor-pointer font-bold rounded-full text-base  sm:w-auto px-10  py-2.5 text-center`}
            value="ADD"
          />
        </div>
      </form>
    </div>
  );
};

export default AddUser;
