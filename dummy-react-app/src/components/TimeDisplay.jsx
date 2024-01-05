import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";

const TimeDisplay = ({ time }) => {
  const { userName } = useContext(UserContext);

  return (
    <div>
      <h2>Current time: {time}</h2>
      <p>Welcome, {userName}!</p>
    </div>
  );
};

export default TimeDisplay;
