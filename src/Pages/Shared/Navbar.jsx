import React, { useContext, useEffect, useMemo, useState } from "react";
import UserImg from "../../assets/images//user.png";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { FiSun } from "react-icons/fi";
import { MdOutlineDarkMode } from "react-icons/md";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useForm } from "react-hook-form";
import userAvatar from "../../assets/images/user1.png";
import useGetUser from "../CustomHook/useGetUser";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";

const Navbar = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { setIsDark, userInfoFromLocalStorage, handleLogOut } =
    useContext(AuthContext);

  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  // const data = undefined;

  const [data, refetch] = useGetUser();

  // console.log(data, "GET USER");

  const { register, reset, handleSubmit } = useForm({});

  const [showModal, setShowModal] = useState(true);

  console.log(showModal, "SHOW MODAL");

  useEffect(() => {
    // console.log("theme" in localStorage);

    if (
      theme === "dark" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");

      // console.log(theme);
    }

    return () => {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      queryClient.removeQueries();
    };
  }, [theme]);

  const onSubmit = (formValue) => {
    fetch(
      `http://localhost:5000/updateUserInfo/${userInfoFromLocalStorage()._id}`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formValue),
      }
    )
      .then((res) => res.json())
      .then(async (result) => {
        console.log(result);
        if (result.acknowledged) {
          refetch();
          setShowModal(false);
          toast.success("Update successfully");
        } else {
          toast.error("Failed to update");
        }
      })
      .catch(() => {
        toast.error("Server error");
      });
  };

  useEffect(() => {
    setShowModal(true);
  }, [showModal]);

  const user = JSON.parse(localStorage.getItem("loggedUser"));

  return (
    <div className="navbar bg-base-100 sticky top-0 z-50 shadow-md dark:bg-gradient-to-r dark:from-violet-500 dark:to-fuchsia-500 dark:text-white">
      <div className="flex-1">
        <Link to="/dashboard" className="btn btn-ghost normal-case text-xl">
          {/* <img className="h-full" src={Logo} alt="The logo of the website" /> */}
          <p className="hidden lg:block font-sofadi">
            Bobbili Urban Development Authority
          </p>
        </Link>
      </div>

      <div className="me-3 flex flex-col font-roboto">
        <p className="font-semibold md:text-lg">{user?.name}</p>
        <small className="font-medium md:text-base">({user?.role})</small>
      </div>
      <div className="dropdown dropdown-end me-5 ">
        <label
          tabIndex={0}
          className="btn btn-ghost btn-circle avatar shadow-sm"
        >
          <div className="w-10 rounded-full">
            <img src={UserImg} alt="An image of user icon" />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 dark:bg-black "
        >
          <li>
            <a
              className="justify-between dark:text-white"
              onClick={() => {
                setShowModal(true);
                document.getElementById("my_modal_3").showModal();
              }}
            >
              Profile
              <span className="badge">New</span>
            </a>
          </li>
          <li>
            <a
              className="dark:text-white"
              onClick={() => handleLogOut(navigate)}
            >
              Logout
            </a>
          </li>
        </ul>
      </div>

      <div className="mx-4">
        {theme === "dark" ? (
          <FiSun
            size={25}
            onClick={() => {
              setTheme("light");
              setIsDark(0);
            }}
          />
        ) : (
          <MdOutlineDarkMode
            size={25}
            onClick={() => {
              setTheme("dark");
              setIsDark(1);
            }}
          />
        )}
      </div>

      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      {showModal && (
        <dialog id="my_modal_3" className="modal ">
          <div className="modal-box bg-[#3c6382] dark:bg-white">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white dark:text-black"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </form>

            {/* user information  */}
            <div className="flex justify-around items-center font-roboto">
              <div>
                <img
                  src={userAvatar}
                  className="w-20 h-20 mx-auto"
                  alt="A image of a user avatar"
                />

                <p className="text-white text-center font-bold mt-2 dark:text-black">
                  {data?.userInfo?.name}
                </p>
                <p className="text-white text-sm text-center dark:text-black">
                  Role: ({data?.userInfo?.role})
                </p>
              </div>
              <div className="modal-action justify-center">
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* if there is a button in form, it will close the modal */}

                  {/* form input boxes  */}

                  <div className="flex justify-center">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-center text-sm font-bold dark:text-gray-900 text-white"
                      >
                        Your Name
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
                  </div>

                  <div className="flex justify-center mt-4">
                    <button
                      type="submit"
                      className="text-white transition-all duration-700 shadow-sm hover:shadow-white bg-black font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Navbar;
