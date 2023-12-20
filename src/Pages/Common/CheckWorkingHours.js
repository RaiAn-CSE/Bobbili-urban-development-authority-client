import { DateTime } from "luxon";

const isBetweenWorkingHours = () => {
  // if between working hours return true otherwise return false

  // Get the current time in the 'Asia/Kolkata' timezone
  const currentTime = DateTime.now().setZone("Asia/Kolkata");

  const isWeekday = currentTime.weekday !== 7;

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
      // here i need to result true
      return { result: true, message: "You are in the right time" };
    } else {
      console.log(
        "The current time is NOT between 12 AM and 5 PM in 'Asia/Kolkata' timezone:",
        formattedTime
      );
      return { result: true, message: "No one is available right now" };
    }
  } else {
    return { result: false, message: "Today is holiday" };
  }
};

export default isBetweenWorkingHours;
