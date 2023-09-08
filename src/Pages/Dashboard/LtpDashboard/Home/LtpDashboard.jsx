import React, { useEffect, useRef } from 'react';
import { Chart, initTE } from 'tw-elements';

const LtpDashboard = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    initTE({ Chart });
  }, []);

  const chartRef2 = useRef(null);

  useEffect(() => {
    initTE({ Chart });
  }, []);

  return (
    <div className='flex items-center p-7'>
      <div className="mx-auto w-[40%] overflow-hidden">
        <canvas
          ref={chartRef}
          data-te-chart="bar"
          data-te-dataset-label="Traffic"
          data-te-labels="['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday ']"
          data-te-dataset-data="[2112, 2343, 2545, 3423, 2365, 1985, 987]"
        ></canvas>
      </div>

      <div className="mx-auto w-[40%] overflow-hidden">
        <canvas
          ref={chartRef2}
          data-te-chart="polarArea"
          data-te-dataset-label="Traffic"
          data-te-labels="['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']"
          data-te-dataset-data="[2112, 2343, 2545, 3423, 2365, 1985, 987]"
          data-te-dataset-background-color="['rgba(63, 81, 181, 0.5)', 'rgba(77, 182, 172, 0.5)', 'rgba(66, 133, 244, 0.5)', 'rgba(156, 39, 176, 0.5)', 'rgba(233, 30, 99, 0.5)', 'rgba(66, 73, 244, 0.4)', 'rgba(66, 133, 244, 0.2)']"
        ></canvas>
      </div>
    </div>
  );
};

export default LtpDashboard;
