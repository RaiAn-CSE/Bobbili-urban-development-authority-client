import React from "react";
import { useForm } from "react-hook-form";
import userIcon from "../../../../assets/images/user.png";

const IndividualUser = ({ user, deleteUser, updateUser }) => {
  // console.log(user, "user");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <>
      <tr>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="mask mask-squircle w-8 h-8 md:w-12 md:h-12">
                <img src={userIcon} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold text-sm md:text-base">{user?.name}</div>
              <div className="opacity-50 text-xs md:text-sm">
                ({user?.role})
              </div>
            </div>
          </div>
        </td>
        <td>
          {/* Open the modal using document.getElementById('ID').showModal() method */}

          <dialog
            id="update_user"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-2xl">Profile</h3>

              <div className="modal-action justify-center">
                <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
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
                        defaultValue={user?.name}
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
                        defaultValue={user?.userId}
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
                        defaultValue={user?.password}
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
                        defaultValue={user?.role}
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

          {/* update user information button  */}
          <button
            className="btn btn-warning btn-xs me-3"
            onClick={() => document.getElementById("update_user").showModal()}
          >
            update
          </button>
          <button
            className="btn btn-error btn-xs"
            onClick={() => deleteUser(user?._id)}
            disabled={user?.role === "Admin1" || user?.role === "Admin2"}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default IndividualUser;
