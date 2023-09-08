import React from "react";

const AddUser = () => {
  return (
    <div className="mt-10">
      <h1 className="text-2xl text-center Roboto roboto-bold ">
        Add a New User
      </h1>

      <form className="w-1/2 mx-auto mt-10">
        <div className="mb-6">
          <label
            for="name"
            class="block mb-2 text-sm Roboto font-bold text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter user name"
            required
          />
        </div>
        <div className="mb-6">
          <label
            for="id"
            class="block mb-2 text-sm Roboto font-bold text-gray-900 dark:text-white"
          >
            User ID
          </label>
          <input
            type="text"
            id="id"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter user id"
            required
          />
        </div>

        <div className="mb-6">
          <label
            for="password"
            class="block mb-2 text-sm font-bold Roboto text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="text"
            id="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            required
          />
        </div>

        <input
          type="submit"
          class="text-white bg-[#10AC84] cursor-pointer font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          value="ADD"
        />
      </form>
    </div>
  );
};

export default AddUser;
