import React from "react";
import InputField from "../../../Components/InputField";
import { Link } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";

const BuildingInfo = () => {
  return (
    <div className="flex flex-col">
      <div>
        <h3>General Information</h3>
        <div className="divider m-0"></div>

        <div className="grid lg:grid-cols-5">
          <InputField id="name1" name="Case Type" label="Case Type" placeholder="Case Type" />
          <div className="flex flex-col justify-center">
            <p className="text-center">Application Type</p>
            <div class="flex items-center space-x-4">
              <label class="inline-flex items-center">
                <input
                  type="radio"
                  class="form-radio h-5 w-5 text-[#10ac84]"
                  name="applicationType"
                  value="Private"
                />
                <span class="ml-2">Private</span>
              </label>

              <label class="inline-flex items-center">
                <input
                  type="radio"
                  class="form-radio h-5 w-5 text-[#10ac84]"
                  name="applicationType"
                  value="Govt. Land"
                />
                <span class="ml-2">Govt. Land</span>
              </label>
            </div>
          </div>
          <InputField id="name3" name="Nature of permission" label="Nature of permission" placeholder="Nature of permission" />
          <InputField id="name4" name="Nature of the site" label="Nature of the site" placeholder="Nature of the site" />
          <InputField id="name5" name="Survey no." label="Survey no." placeholder="Survey no." type='number' />
          <InputField id="name6" name="District" label="District" placeholder="District" />
          <InputField id="name6" name="Mandal" label="Mandal" placeholder="Mandal" />
          <InputField id="name6" name="Grama Panchayat" label="Grama Panchayat" placeholder="Grama Panchayat" />
          <InputField id="name6" name="Village" label="Village" placeholder="Village" />
        </div>
      </div>

      <div className="mb-5">
        <h3>Plot Details</h3>
        <div className="divider m-0"></div>
        <div className="grid lg:grid-cols-5">
          <InputField
            id="name7"
            name="Proposed Plot area(in Sq.M.)"
            label="Proposed Plot area(in Sq.M.)"
            placeholder="in Sq.M." />
          <InputField id="name8"
            name="name1"
            label="Total Plot are as on ground (in Sq.M.)"
            placeholder="in Sq.M." />
          <InputField
            id="name9"
            name="name1"
            label="Total Plot are as per document (in Sq.M.)"
            placeholder="in Sq.M." />
          <InputField
            id="name10"
            name="name1"
            label="Road Widening Area (in Sq.M.)"
            placeholder="in Sq.M." />
          <InputField
            id="name11"
            name="name1"
            label="Net Plot Area (in Sq.M.)"
            placeholder="in Sq.M." />
        </div>
        <div className="flex justify-around">
          <div className="flex justify-center">
            <p className="text-center mr-3">Whether site abuts any Existing Road? </p>
            <div class="flex items-center space-x-4">
              <label class="inline-flex items-center">
                <input
                  type="radio"
                  class="form-radio h-5 w-5 text-[#10ac84]"
                  name="applicationType"
                  value="yes"
                />
                <span class="ml-2">Yes</span>
              </label>

              <label class="inline-flex items-center">
                <input
                  type="radio"
                  class="form-radio h-5 w-5 text-[#10ac84]"
                  name="applicationType"
                  value="No"
                />
                <span class="ml-2">No</span>
              </label>
            </div>
          </div>
          <div className="flex justify-center">
            <p className="text-center mr-3">Status of Road</p>
            <div class="flex items-center space-x-4">
              <label class="inline-flex items-center">
                <input
                  type="radio"
                  class="form-radio h-5 w-5 text-[#10ac84]"
                  name="applicationType"
                  value="Public"
                />
                <span class="ml-2">Public</span>
              </label>

              <label class="inline-flex items-center">
                <input
                  type="radio"
                  class="form-radio h-5 w-5 text-[#10ac84]"
                  name="applicationType"
                  value="Private"
                />
                <span class="ml-2">Private</span>
              </label>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5">
          <InputField id="name12" name="name1" label="Nature of Road" placeholder="Nature of Road" />
          <InputField
            id="name12"
            name="name1"
            label="Existing road (in Mts.)"
            placeholder="in Sq.M." />
          <InputField
            id="name12"
            name="name1"
            label="Proposed road (in Mts.)"
            placeholder="in Sq.M." />
          <InputField
            id="name12"
            name="name1"
            label="Market Value (per Sq.Yd.)"
            placeholder="per Sq.Yd." />
          <InputField id="name12" name="name1" label="Floor Name" placeholder="Floor Name" />
          <InputField
            id="name12"
            name="name1"
            label="Plinth Area (in Sq.M.)"
            placeholder="in Sq.M." />
          <InputField
            id="name12"
            name="name1"
            label="Parking Area (in Sq.M.)"
            placeholder="in Sq.M." />
          <div className="flex justify-start items-center ml-3 mt-5">
            <button className="btn"><AiFillPlusCircle size={25} color='#6fd7bd' /></button>
          </div>

        </div>

        <div className="flex justify-center">
          <InputField
            id="name12"
            name="name1"
            label="Total Plinth area"
            placeholder="Automatically calculated" />
          <InputField
            id="name12"
            name="name1"
            label="Total Parking area"
            placeholder="Automatically calculated" />
        </div>
        <div className="grid lg:grid-cols-5">
          <InputField
            id="name7"
            name="Proposed Plot area(in Sq.M.)"
            label="Front setback (in M.)"
            placeholder="in M." />
          <InputField
            id="name8"
            name="name1"
            label="Rare setback (in M.)"
            placeholder="in M." />
          <InputField
            id="name9"
            name="name1"
            label="Side1 setback (in M.)"
            placeholder="in M." />
          <InputField
            id="name10"
            name="name1"
            label="Side 2 setback (in M.)"
            placeholder="in M." />
          <InputField
            id="name11"
            name="name1"
            label="Total Height of The Building Exclude Stilt (in Mts.)"
            placeholder="in Mts." />
        </div>

        <div className="flex">
          <p>Compounding wall proposed?</p>
          <label className="inline-flex items-center ml-3">
            <input type="radio" name="radio-1" className="radio" value='yes' />
            <span className="ml-2">Yes</span>
          </label>
          <label className="inline-flex items-center ml-3">
            <input type="radio" name="radio-1" className="radio" value='no' />
            <span className="ml-2">No</span>
          </label>
        </div>

        <div className="flex">
          <p>Whether site Registered as house plot/ Building prior to 18-01 2006?</p>
          <label className="inline-flex items-center ml-3">
            <input type="radio" name="radio-1" className="radio" value='yes' />
            <span className="ml-2">Yes</span>
          </label>
          <label className="inline-flex items-center ml-3">
            <input type="radio" name="radio-1" className="radio" value='no' />
            <span className="ml-2">No</span>
          </label>
        </div>
      </div>

      <div>
        <h3>Schedule of Boundaries</h3>
        <div className="divider m-0"></div>
        <div className="grid lg:grid-cols-5 items-center">
          <InputField id="name13" name="name1" label="North" placeholder="North" />
          <InputField id="name14" name="name1" label="South" placeholder="South" />
          <InputField id="name15" name="name1" label="East" placeholder="East" />
          <InputField id="name15" name="name1" label="West" placeholder="West" />
        </div>
      </div>

      <div className="flex justify-center mb-5">
        <Link to="/dashboard/draftApplication/applicantInfo">
          <button class="btn">Save And Continue</button>
        </Link>
      </div>
    </div>
  );
};

export default BuildingInfo;
