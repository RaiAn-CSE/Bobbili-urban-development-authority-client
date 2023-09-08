import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const AddUser = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);

    // store users data in the database
    fetch("http://localhost:5000/addUser", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.acknowledged) {
          toast.success("User added successfully");
        }
        if (data?.result === 0) {
          console.log(data.message);
          toast.error(data.message);
        }
      })
      .catch(() => {
        toast.error("Server is not responded");
      });
  };
  return (
    <div className="mt-10">
      <h1
        className="text-xl
      lg:text-2xl  text-center Roboto roboto-bold "
      >
        Add a New User
      </h1>

      <form className="w-1/2 mx-auto mt-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm Roboto font-bold text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter user name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="id"
              className="block mb-2 text-sm Roboto font-bold text-gray-900 dark:text-white"
            >
              User ID
            </label>
            <input
              type="text"
              {...register("userId", { required: true })}
              id="id"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter user id"
              required
            />
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-bold Roboto text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="text"
              {...register("password", { required: true })}
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="•••••••••"
              required
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="block mb-2 text-sm font-bold text-gray-900 "
            >
              Select an option
            </label>
            <select
              id="role"
              {...register("role", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option value="LTP">LTP</option>
              <option value="PS">PS</option>
              <option value="Admin1">Admin1</option>
              <option value="Admin2">Admin2</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center">
          <input
            type="submit"
            className="text-white bg-[#10AC84] cursor-pointer font-bold rounded-full text-sm  sm:w-auto px-10  py-2.5 text-center"
            value="ADD"
          />
        </div>
      </form>
    </div>
  );
};

export default AddUser;
