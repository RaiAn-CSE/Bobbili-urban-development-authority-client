import React from "react";
import InputField from "../../../Components/InputField";
import { Link } from "react-router-dom";
import LTPImg from "../../../../assets/images/id-card.png";
import OwnerImg from "../../../../assets/images/real-estate-agent.png";

const ApplicantInfo = () => {
  return (
    <div className="grid my-5 lg:my-0 lg:p-2">
      <div>
        <div className="flex items-center">
          <img
            src={LTPImg}
            alt="Image icon for the LTP detail section"
            className="h-10 me-3"
          />
          <h3 className="font-bold text-xl">LTP’s Details</h3>
        </div>
        <div className="divider m-0"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 my-8">
          <div className="grid grid-cols-2">
            <InputField
              id="name1"
              name="Case Type"
              label="LTP Type"
              placeholder="Licenced Engineer"
            />
            <InputField
              id="name2"
              name="name1"
              label="LTP Name"
              placeholder="xxxxxxxxxxxxxxxxx"
            />
            <InputField
              id="name4"
              name="Nature of the site"
              label="Licence no."
              placeholder="xx/xxxxx"
              type="number"
            />
            <InputField
              id="name5"
              name="Survey no."
              label="Validity"
              placeholder="31/03/2024"
            />
            <InputField
              id="name6"
              name="District"
              label="Phone no."
              placeholder="xxxxxxxxxx"
              type="number"
            />
            <InputField
              id="name6"
              name="Mandal"
              label="E-mail"
              placeholder="xxxx@gmail.com"
              type="email"
            />
          </div>
          <div>
            <div className="my-4 mx-3">
              <label
                htmlFor="message"
                className="block text-gray-600 mb-1 font-semibold"
              >
                Address
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full px-3 py-2 border rounded-lg max-w-xs"
                placeholder="Dr. no., Street, Village, Mandal, Dist."
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <div className="my-5">
        <div className="flex items-center">
          <img
            src={OwnerImg}
            alt="An icon of the applicant section"
            className="h-10 me-3"
          />
          <h3 className="font-bold text-xl">Applicant’s Details</h3>
        </div>
        <div className="divider m-0"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 my-8">
          <div className="grid grid-cols-2 items-center">
            <InputField
              id="name13"
              name="name1"
              label="Name"
              placeholder="Select Case type"
            />
            <InputField
              id="name14"
              name="name1"
              label="S/o (or) W/o (or) C/o"
              placeholder="Select Nature of permission"
            />
            <InputField
              id="name15"
              name="name1"
              label="Phone no."
              placeholder="Phone no."
              type="number"
            />
            <InputField
              id="name15"
              name="name1"
              label="E-mail"
              placeholder="E-mail"
              type="email"
            />
            <InputField
              id="name15"
              name="name1"
              label="Aadhar no."
              placeholder="Aadhar no."
              type="number"
            />
            <InputField
              id="name15"
              name="name1"
              label="PIN Code"
              placeholder="PIN Code"
              type="number"
            />
          </div>
          <div className="my-4 mx-3">
            <label
              htmlFor="message"
              className="block text-gray-600 mb-1 font-semibold"
            >
              Address
            </label>
            <textarea
              id="message"
              rows="4"
              className="w-full px-3 py-2 border rounded-lg max-w-xs"
              placeholder="Dr. no., Street, Village, Mandal, Dist."
            ></textarea>
          </div>
        </div>
      </div>

      <div className="flex justify-center md:justify-end mb-5">
        <Link to="/dashboard/draftApplication/applicationChecklist">
          <button className="btn btn-md bg-Primary hover:bg-btnHover transition duration-500">
            Save And Continue
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ApplicantInfo;
