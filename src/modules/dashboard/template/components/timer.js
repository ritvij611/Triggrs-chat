import { useState, useEffect } from 'react';
import moment from 'moment-timezone';

// const TimerClock = () => {
//   const [hours, setHours] = useState(60);
//   const [minutes, setMinutes] = useState(60);
//   const [currentTime, setCurrentTime] = useState('');

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setMinutes((prevMinutes) => prevMinutes- 1);
//       setHours((prevHours) => prevHours - 1);
//     }, 1000);

//     return () => {
//       clearInterval(timer);
//     };
//   }, []);

//   useEffect(() => {
//     const date = new Date();
//     const hours = date.getHours().toString().padStart(2, '0');
//     const minutes = date.getMinutes().toString().padStart(2, '0');
//     const seconds = date.getSeconds().toString().padStart(2, '0');
//     setCurrentTime(`${hours}:${minutes}:${seconds}`);
//   }, [hours],[minutes]);

//   return (
//     <div className='border border-gray-500 rounded-full p-1 w-16'>
//       <h1 className='text-sm text-gray-700'>{hours} : {minutes}</h1>
//       {/* <h1 className='text-sm'>Clock: {currentTime}</h1> */}
//     </div>
//   );
// };



const TimerClock = () => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [now, setNow] = useState(moment());
  const [timeRemaining, setTimeRemaining] = useState(86400); // 24 hours in seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(prevTime => prevTime - 1);
    }, 1000); // Update every second

    // Clear interval after 24 hours (86400 seconds)
    setTimeout(() => {
      clearInterval(interval);
    }, 86400000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTime((prevTime) => {
  //       const seconds = prevTime.seconds + 1;
  //       const minutes = prevTime.minutes + Math.floor(seconds / 60);
  //       const hours = prevTime.hours + Math.floor(minutes / 60);
  //       return {
  //         hours,
  //         minutes: minutes % 60,
  //         seconds: seconds % 60,
  //         hours: hours % 24
  //       };
  //     });
  //   }, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);
// 13

  return (
    <div className='p-1 px-2 border border-[#b91c1c] rounded-full bg-[#b91c1c]/10'>
      <h1 className='text-[#b91c1c]'>
      {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </h1>
    </div>
  );
};

export default TimerClock;
