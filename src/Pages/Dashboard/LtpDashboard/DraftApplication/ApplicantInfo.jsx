import React from 'react';
import InputField from '../../Components/InputField';

const ApplicantInfo = () => {
    return (
        <div className='flex flex-col'>
            <div>
                <h3>LTP’s Details</h3>
                <div className="divider m-0"></div>

                <div className='grid lg:grid-cols-5'>
                    <InputField id="name1" name="Case Type" placeholder="LTP Type" />
                    <InputField id="name2" name="name1" placeholder="LTP Name" />
                    <InputField id="name3" name="Nature of permission" placeholder="Address" />
                    <InputField id="name4" name="Nature of the site" placeholder="Licence no." />
                    <InputField id="name5" name="Survey no." placeholder="Validity" />
                    <InputField id="name6" name="District" placeholder="Phone no." />
                    <InputField id="name6" name="Mandal" placeholder="E-mail" />
                    <InputField id="name6" name="Grama Panchayat" placeholder="Grama Panchayat" />
                    <InputField id="name6" name="Village" placeholder="Village" />
                </div>
            </div>


            <div>
                <h3>Applicant’s Details</h3>
                <div className="divider m-0"></div>
                <div className='grid lg:grid-cols-5 items-center'>
                    <InputField id="name13" name="name1" placeholder="Name" />
                    <InputField id="name14" name="name1" placeholder="S/o (or) W/o (or) C/o" />
                    <InputField id="name15" name="name1" placeholder="Address" />
                    <InputField id="name15" name="name1" placeholder="Phone no." />
                    <InputField id="name15" name="name1" placeholder="E-mail" />
                    <InputField id="name15" name="name1" placeholder="Aadhar no." />
                    <InputField id="name15" name="name1" placeholder="PIN Code" />
                </div>
            </div>

        </div>
    );
};

export default ApplicantInfo;