import React from "react";

const DemoVideos = () => {

  const videoUrl = "https://youtu.be/aGHCyzVqfrQ?si=Rtrmar90OCI15ylH";

  return (
    <div className="flex text-center w-full p-4 max-h-[400px] overflow-hidden">

      <div className="basis-[70%]">
        <div className="mr-4 relative">
          <h2 className="absolute top-2 left-2 text-xl font-bold text-white">Video 1 Title</h2>
          <video className="h-full w-full rounded-lg" controls autoPlay muted>
            <source src="https://docs.material-tailwind.com/demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div className="basis-[30%] overflow-hidden overflow-y-auto rounded-lg">
        <div className="relative mb-2">
          <h2 className="absolute top-2 left-2 text-xl font-bold text-white">Video 2 Title</h2>
          <video className="w-full rounded-lg" controls autoPlay muted>
            <source src="https://docs.material-tailwind.com/demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="relative mb-2">
          <h2 className="absolute top-2 left-2 text-xl font-bold text-white">Video 2 Title</h2>
          <video className="w-full rounded-lg" controls autoPlay muted>
            <source src="https://docs.material-tailwind.com/demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="relative mb-2">
          <h2 className="absolute top-2 left-2 text-xl font-bold text-white">Video 2 Title</h2>
          <video className="w-full rounded-lg" controls autoPlay muted>
            <source src="https://docs.material-tailwind.com/demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="relative mb-2">
          <h2 className="absolute top-2 left-2 text-xl font-bold text-white">Video 2 Title</h2>
          <video className="w-full rounded-lg" controls autoPlay muted>
            <source src="https://docs.material-tailwind.com/demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="relative mb-2">
          <h2 className="absolute top-2 left-2 text-xl font-bold text-white">Video 2 Title</h2>
          <video className="w-full rounded-lg" controls autoPlay muted>
            <source src="https://docs.material-tailwind.com/demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

    </div>
  );
};

export default DemoVideos;
