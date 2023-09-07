import React from "react";
import InputField from "../../../Components/InputField";

const BuildingInfo = () => {
  return (
    <div className="flex flex-col">
      <div>
        <h3>General Information</h3>
        <div className="divider m-0"></div>

        <div className="grid lg:grid-cols-5">
          <InputField id="name1" name="Case Type" placeholder="Case Type" />
          <InputField id="name2" name="name1" placeholder="Name" />
          <InputField
            id="name3"
            name="Nature of permission"
            placeholder="Nature of permission"
          />
          <InputField
            id="name4"
            name="Nature of the site"
            placeholder="Nature of the site"
          />
          <InputField id="name5" name="Survey no." placeholder="Survey no." />
          <InputField id="name6" name="District" placeholder="District" />
          <InputField id="name6" name="Mandal" placeholder="Mandal" />
          <InputField
            id="name6"
            name="Grama Panchayat"
            placeholder="Grama Panchayat"
          />
          <InputField id="name6" name="Village" placeholder="Village" />
        </div>
      </div>

      <div>
        <h3>Schedule of Boundaries</h3>
        <div className="divider m-0"></div>
        <div className="grid lg:grid-cols-5">
          <InputField
            id="name7"
            name="Proposed Plot area(in Sq.M.)"
            placeholder="Proposed Plot area(in Sq.M.)"
          />
          <InputField
            id="name8"
            name="name1"
            placeholder="Total Plot are as on ground (in Sq.M.)"
          />
          <InputField
            id="name9"
            name="name1"
            placeholder="Total Plot are as per document (in Sq.M.)"
          />
          <InputField
            id="name10"
            name="name1"
            placeholder="Road Widening Area (in Sq.M.)"
          />
          <InputField
            id="name11"
            name="name1"
            placeholder="Net Plot Area (in Sq.M.)"
          />
          <InputField id="name12" name="name1" placeholder="Nature of Road" />
          <InputField
            id="name12"
            name="name1"
            placeholder="Existing road (in Mts.)"
          />
          <InputField
            id="name12"
            name="name1"
            placeholder="Proposed road (in Mts.)"
          />
          <InputField
            id="name12"
            name="name1"
            placeholder="Market Value (per Sq.Yd.)"
          />
          <InputField id="name12" name="name1" placeholder="Floor Name" />
          <InputField
            id="name12"
            name="name1"
            placeholder="Plinth Area (in Sq.M.)"
          />
          <InputField
            id="name12"
            name="name1"
            placeholder="Parking Area (in Sq.M.)"
          />
          <div>
            <button>+</button>
          </div>
        </div>

        <div className="flex justify-center">
          <InputField
            id="name12"
            name="name1"
            placeholder="Parking Area (in Sq.M.)"
          />
          <InputField
            id="name12"
            name="name1"
            placeholder="Parking Area (in Sq.M.)"
          />
        </div>
        <div className="grid lg:grid-cols-5">
          <InputField
            id="name7"
            name="Proposed Plot area(in Sq.M.)"
            placeholder="Front setback (in M.)"
          />
          <InputField
            id="name8"
            name="name1"
            placeholder="Rare setback (in M.)"
          />
          <InputField
            id="name9"
            name="name1"
            placeholder="Side1 setback (in M.)"
          />
          <InputField
            id="name10"
            name="name1"
            placeholder="Side 2 setback (in M.)"
          />
          <InputField
            id="name11"
            name="name1"
            placeholder="Total Height of The Building Exclude Stilt (in Mts.)"
          />
        </div>
        <div className="flex">
          <p>Compounding wall proposed?</p>
          <input type="radio" name="radio-1" className="radio" />
          <input type="radio" name="radio-1" className="radio" />
        </div>
        <div className="flex">
          <p>
            Whether site Registered as house plot/ Building prior to 18-01 2006?
          </p>
          <input type="radio" name="radio-2" className="radio" />
          <input type="radio" name="radio-2" className="radio" />
        </div>
      </div>

      <div>
        <h3>Schedule of Boundaries</h3>
        <div className="divider m-0"></div>
        <div className="grid lg:grid-cols-5 items-center">
          <InputField id="name13" name="name1" placeholder="North" />
          <InputField id="name14" name="name1" placeholder="South" />
          <InputField id="name15" name="name1" placeholder="East" />
          <InputField id="name15" name="name1" placeholder="West" />
          <button class="btn">Save And Continue</button>
        </div>
      </div>
    </div>
  );
};

export default BuildingInfo;
