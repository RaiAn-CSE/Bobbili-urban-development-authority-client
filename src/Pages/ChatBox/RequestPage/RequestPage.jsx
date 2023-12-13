import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { LuMessagesSquare } from "react-icons/lu";
import { IoMdStar } from "react-icons/io";
import { GiSensuousness } from "react-icons/gi";
import axios from "axios";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa6";
import lineSvg from "../../../assets/images/line.svg";
import triangle from "../../../assets/images/triangle.png";
import stairLikeLine from "../../../assets/images/stairLikeLine.png";
import { TfiEmail } from "react-icons/tfi";
import LoginCSS from "../../../Style/Login.module.css";
import { DateTime } from "luxon";

const RequestPage = ({ props }) => {
  const { setRequestSent, setUserInfo } = props;
  const {
    register,

    handleSubmit,
    formState: { errors },
  } = useForm();
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

  const isBetweenWorkingHours = () => {
    // if between working hours return true otherwise return false

    // Get the current time in the 'Asia/Kolkata' timezone
    const currentTime = DateTime.now().setZone("Asia/Kolkata");

    const isWeekday = currentTime.weekday !== 6 && currentTime.weekday !== 7;

    if (isWeekday) {
      // Set the start and end times for the range (12 AM to 5 PM)
      const startTime = currentTime.set({ hour: 9, minute: 0, second: 0 }); // 12:00 AM
      const endTime = currentTime.set({ hour: 17, minute: 0, second: 0 }); // 5:00 PM

      // Check if the current time is between 12 AM and 5 PM in 'Asia/Kolkata' timezone
      const isBetween = currentTime >= startTime && currentTime <= endTime;

      console.log(currentTime, startTime, endTime);

      // Format the current time for display in the 'Asia/Kolkata' timezone
      const formattedTime = currentTime.toLocaleString(DateTime.DATETIME_FULL);

      if (isBetween) {
        console.log(
          "The current time is between 12 AM and 5 PM in 'Asia/Kolkata' timezone:",
          formattedTime
        );
        return true;
      } else {
        console.log(
          "The current time is NOT between 12 AM and 5 PM in 'Asia/Kolkata' timezone:",
          formattedTime
        );
        return false;
      }
    } else {
      return false;
    }
  };
  isBetweenWorkingHours();
  return (
    <div className="relative overflow-hidden h-full shadow-2xl">
      <div className="text-gray-600 h-full flex flex-col justify-evenly rounded-md shadow-lg relative overflow-hidden">
        <div className="flex flex-col items-center">
          <button className="logo-btn" data-text="Awesome">
            <span className="actual-text text-4xl">&nbsp;BUDA&nbsp;</span>
            <span aria-hidden="true" className="hover-text text-4xl">
              &nbsp;BUDA&nbsp;
            </span>
          </button>

          {/* <LuMessagesSquare
          size={80}
          className="nm_Container text-[#6c5ce7] mt-4 p-2"
        />  */}

          <div className="message-icon-container">
            <blockquote className="oval-thought">
              <TfiEmail size={50} />
            </blockquote>
          </div>
        </div>
        <form
          className="flex flex-col items-center space-y-5 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={`${LoginCSS.formGroup} w-2/3`}>
            <div className="indicator">
              <span className="indicator-item badge badge-xs text-red-500 bg-[#FFFFFF]">
                <IoMdStar />
              </span>
              <label htmlFor="name" className="inline-block font-bold">
                Your Name
              </label>
            </div>
            <input
              className={`input input-bordered border-2 focus:border-violet-400 w-full max-w-xs rounded-full focus:outline-none bg-gray-100 ${LoginCSS.loginInput}`}
              placeholder="Enter your name ..."
              type="text"
              id="name"
              {...register("name", { required: true })}
            />
            {/* errors will return when field validation fails  */}
            {/* {errors?.name && (
              <p className="text-normalViolet font-bold">
                This field is required
              </p>
            )} */}
          </div>

          <div className={`${LoginCSS.formGroup} w-2/3`}>
            <div className="indicator">
              <span className="indicator-item badge badge-xs text-red-500 bg-[#FFFFFF]">
                <IoMdStar />
              </span>
              <label htmlFor="mobile" className="inline-block font-bold">
                Mobile No
              </label>
            </div>
            <input
              type="number"
              className={`input input-bordered w-full max-w-xs border-2 focus:border-violet-400 rounded-full focus:outline-none bg-gray-100 ${LoginCSS.loginInput} focus:nm_Inset`}
              placeholder="Enter your mobile no..."
              pattern="[0-9]+"
              {...register("mobileNo", { required: true })}
            />
            {/* errors will return when field validation fails */}
            {/* {errors?.mobileNo && (
              <p className="text-normalViolet text-center font-bold">
                This field is required
              </p>
            )} */}
          </div>

          {loading ? (
            <span className="loading loading-dots loading-lg text-normalViolet"></span>
          ) : (
            <input
              className="nm_Container capitalize p-2 px-8 text-lg rounded-full text-white bg-gradient-to-r from-[#8b69be] to-[#7642C2] cursor-pointer transition-all duration-700 hover:bg-gradient-to-l"
              type="submit"
              value={"Submit"}
            />
          )}
        </form>
        {/* <div className="absolute flex justify-center items-center text-white h-10 w-10 rounded-full top-3 left-3">
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
      </div> */}
      </div>

      {/* circle  */}
      <div className="absolute w-6 h-6 rounded-full -top-2 left-2/3 bg-blue-400 bg-gradient-to-r from-[#FF2967] to-[#ffab40]"></div>
      <div className="absolute w-12 h-12 rounded-full top-[18%] -right-4 bg-white border-4 border-[#7945C5]"></div>
      <div className="absolute w-8 h-8 rounded-full top-[60%] -left-4 bg-gradient-to-br from-[#6e3bba] to-[#b478ff]"></div>
      <div className="absolute w-10 h-10 rounded-full top-2/3 -right-4 bg-gradient-to-tr from-[#ffb23c] to-[#ffc935]"></div>
      {/* triangle  */}
      <div className=" absolute w-24 h-24 top-0 left-0 -rotate-90">
        <img src={triangle} alt="A triangle image" />
      </div>

      {/* stair like line  */}
      <div className=" absolute w-28 h-28 bottom-0 -left-14 rotate-[170deg]">
        <img src={stairLikeLine} alt="A stair like line image" />
      </div>

      {/* // shape line draw */}
      <div className="absolute -bottom-16 -right-10 w-36 h-36">
        <img src={lineSvg} alt="svg image" />
      </div>
    </div>
  );
};

export default RequestPage;
