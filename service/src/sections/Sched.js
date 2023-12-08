import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sched.css';

import logo from './LOGO1.png';

function Sched() {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI'];
  const times = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM'];

  const [selectedBox, setSelectedBox] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [confirmedSchedule, setConfirmedSchedule] = useState(null);
  const [unavailableTimes, setUnavailableTimes] = useState({
    SUN: [],
    MON: [],
    TUE: [],
    WED: [],
    THU: [],
    FRI: [],
  });

  const handleBoxClick = (day) => {
    setSelectedBox(day);
    setSelectedTime(null); // Reset selected time when a new box is clicked
  };

  const handleTimeClick = (time) => {
    if (!unavailableTimes[selectedBox].includes(time)) {
      setSelectedTime(time);
    }
  };

  const confirmSchedule = () => {
    if (selectedBox && selectedTime) {
      setConfirmedSchedule({
        day: selectedBox,
        time: selectedTime,
      });

      // Mark the selected time as unavailable for the selected day
      setUnavailableTimes((prevUnavailableTimes) => ({
        ...prevUnavailableTimes,
        [selectedBox]: [...prevUnavailableTimes[selectedBox], selectedTime],
      }));
    }
  };

  const closePopout = () => {
    setSelectedBox(null);
    setSelectedTime(null);
  };

  return (
    <div className="App">
      <Link to="/" className="upper-left-button">
        Home
      </Link>
      <h2>Please select your preferred laundry schedule and time for your laundry activities.</h2>
      <div className="top">
        {days.slice(0, 3).map((day, index) => (
          <div
            key={day}
            className={`box ${selectedBox === day ? 'active' : ''}`}
            onClick={() => handleBoxClick(day)}
          >
            <div className="box-header">
              <strong>{day}</strong>
              <p>{day === 'SUN' ? 'Sunday' : day === 'MON' ? 'Monday' : 'Tuesday'} schedule</p>
            </div>
            <img src={logo} alt="Logo" className="box-logo" />
          </div>
        ))}
      </div>
      <div className="bottom">
        {days.slice(3).map((day, index) => (
          <div
            key={day}
            className={`box ${selectedBox === day ? 'active' : ''}`}
            onClick={() => handleBoxClick(day)}
          >
            <div className="box-header">
              <strong>{day}</strong>
              <p>{day === 'WED' ? 'Wednesday' : day === 'THU' ? 'Thursday' : 'Friday'} schedule</p>
            </div>
            <img src={logo} alt="Logo" className="box-logo" />
          </div>
        ))}
      </div>
      {selectedBox && (
        <div className="popout">
          <div className="popout-content">
            <h2>Time Slot</h2>
            <div className="time-box">
              {times.map((time) => (
                <div
                  key={time}
                  className={`time-slot ${
                    selectedTime === time ? 'active' : unavailableTimes[selectedBox].includes(time) ? 'unavailable' : ''
                  }`}
                  onClick={() => handleTimeClick(time)}
                >
                  {time}
                </div>
              ))}
            </div>


          <Link to="/Home">
            <button onClick={confirmSchedule}>Confirm</button>
          </Link>
            <button onClick={closePopout}>Close</button>
          </div>
        </div>
      )}
      {confirmedSchedule && (
        <div className="confirmation">
          <h2>Confirmed Schedule</h2>
          <p>Day: {confirmedSchedule.day}</p>
          <p>Time: {confirmedSchedule.time}</p>
        </div>
      )}
    </div>
  );
}

export default Sched;