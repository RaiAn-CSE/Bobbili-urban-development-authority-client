import React from "react";
import InputField from "../../../Components/InputField";
import { Link } from "react-router-dom";

const ApplicantInfo = () => {
  return (
    <div className="flex flex-col p-6 lg:p-2 my-5">
      <div>
        <h3>LTP’s Details</h3>
        <div className="divider m-0"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="grid grid-cols-2">
            <InputField id="name1" name="Case Type" label="LTP Type" placeholder='Licenced Engineer' />
            <InputField id="name2" name="name1" label="LTP Name" placeholder='xxxxxxxxxxxxxxxxx' />
            <InputField id="name4" name="Nature of the site" label="Licence no." placeholder='xx/xxxxx' type='number' />
            <InputField id="name5" name="Survey no." label="Validity" placeholder='31/03/2024' />
            <InputField id="name6" name="District" label="Phone no." placeholder='xxxxxxxxxx' type='number' />
            <InputField id="name6" name="Mandal" label="E-mail" placeholder='xxxx@gmail.com' type='email' />
          </div>
          <div>
            <InputField id="name3" name="Nature of permission" label="Address" placeholder='Dr. no., Street, Village, Mandal, Dist.' />
          </div>
        </div>
      </div>

      <div>
        <h3>Applicant’s Details</h3>
        <div className="divider m-0"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="grid grid-cols-2 items-center">
            <InputField id="name13" name="name1" label="Name" placeholder='Select Case type' />
            <InputField id="name14" name="name1" label="S/o (or) W/o (or) C/o" placeholder='Select Nature of permission' />
            <InputField id="name15" name="name1" label="Phone no." placeholder='Phone no.' type='number' />
            <InputField id="name15" name="name1" label="E-mail" placeholder='E-mail' type='email' />
            <InputField id="name15" name="name1" label="Aadhar no." placeholder='Aadhar no.' type='number' />
            <InputField id="name15" name="name1" label="PIN Code" placeholder='PIN Code' type='number' />
          </div>
          <div>
            <InputField id="name15" name="name1" label="Address" placeholder='Dr. no., Street, Village, Mandal, Dist.' />
          </div>
        </div>
      </div >

      <div className="flex justify-center mb-5">
        <Link to="/dashboard/draftApplication/applicationChecklist">
          <button class="btn">Save And Continue</button>
        </Link>
      </div>
    </div >
  );
};

export default ApplicantInfo;
