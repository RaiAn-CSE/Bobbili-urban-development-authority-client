import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { LuMessagesSquare } from "react-icons/lu";
import { IoMdStar } from "react-icons/io";
import { GiSensuousness } from "react-icons/gi";
import axios from "axios";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa6";

const RequestPage = ({ props }) => {
  const { setRequestSent, setUserInfo } = props;
  const { register, errors, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (dataFromUser) => {
    setLoading(true);
    console.log(dataFromUser);

    setUserInfo(dataFromUser);

    const { data } = await axios.get(
      `https://api.genderize.io?name=${dataFromUser.name.split(" ")[0]}`
    );

    console.log(data, "GENDER DATA");

    const messageRequest = {
      userId: `Help-${dataFromUser.name}-${dataFromUser.mobileNo}`,
      name: dataFromUser.name,
      mobile: dataFromUser.mobileNo,
      gender: data?.gender,
    };

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "https://residential-building.onrender.com/messageRequest",
        messageRequest,
        config
      );

      console.log(data, "DATA");

      if (data.acknowledged) {
        setRequestSent(true);
        setUserInfo((prev) => {
          return { ...prev, uniqueId: data.insertedId };
        });
      } else {
        toast.error("Server failed");
      }
    } catch (error) {
      toast.error("Server down");
    }
    setLoading(true);
  };
  return (
    <div className="message-box text-gray-600 h-full flex flex-col justify-around rounded-md shadow-lg relative">

      <div className="flex flex-col items-center">
        <button className="logo-btn mt-5" data-text="Awesome">
          <span className="actual-text text-4xl">&nbsp;BUDA&nbsp;</span>
          <span aria-hidden="true" className="hover-text text-4xl">
            &nbsp;BUDA&nbsp;
          </span>
        </button>

        <LuMessagesSquare
          size={80}
          className="nm_Container text-[#6c5ce7] mt-4 p-2"
        />
      </div>
      <form
        className="flex flex-col items-center space-y-6 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <div className="indicator">
            <span className="indicator-item badge badge-xs text-red-500 bg-[#FFFFFF]">
              <IoMdStar />
            </span>
            <label htmlFor="name" className="inline-block font-bold">
              Your Name
            </label>
          </div>
          <input
            className="input input-bordered border-2 border-violet-400 w-full max-w-xs rounded-full focus:outline-none bg-gray-100"
            placeholder="Enter your name ..."
            type="text"
            id="name"
            {...register("name", { required: true })}
          />
        </div>

        <div>
          <div className="indicator">
            <span className="indicator-item badge badge-xs text-red-500 bg-[#FFFFFF]">
              <IoMdStar />
            </span>
            <label htmlFor="mobile" className="inline-block font-bold">
              Mobile No
            </label>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs border-2 border-violet-400 rounded-full focus:outline-none bg-gray-100"
            placeholder="Enter your mobile no..."
            {...register("mobileNo", { required: true })}
          />
        </div>
        {/* errors will return when field validation fails  */}
        {errors?.mobileNo && (
          <span className="text-red-500">This field is required</span>
        )}

        {loading ? (
          <span className="loading loading-dots loading-lg text-normalViolet"></span>
        ) : (
          <input
            className="nm_Container capitalize p-2 px-4 text-lg rounded-full text-white bg-[#8980FD] cursor-pointer"
            type="submit"
            value={"Submit"}
          />
        )}
      </form>

      <div className="absolute flex justify-center items-center text-white h-10 w-10 rounded-full top-3 left-3">
        <GiSensuousness size={30} />
      </div>
      <div className="absolute flex justify-center items-center text-white h-10 w-10 rounded-full bottom-3 right-3">
        <GiSensuousness size={30} />
      </div>

      <div className="absolute flex justify-center items-center text-normalViolet h-10 w-10 rounded-full top-5 right-5 ">
        {" "}
        <FaStar size={30} />
      </div>
      <div className="absolute flex justify-center items-center text-normalViolet h-10 w-10 rounded-full bottom-5 left-5 ">
        {" "}
        <FaStar size={30} />
      </div>
    </div >
  );
};

export default RequestPage;
