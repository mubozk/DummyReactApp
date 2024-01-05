import "../styles.css";
import React, {
  useState,
  useReducer,
  useEffect,
  useContext,
  useRef,
  useMemo,
} from "react";
import TimeDisplay from "./TimeDisplay";
import UserContext from "../contexts/UserContext";
import ThemeReducer from "../reducers/ThemeReducer";
import { isPrime } from "../utils/isPrime";


function App() {
  const now = new Date().toLocaleTimeString();
  const [time, setTime] = useState(now);
  const [theme, dispatch] = useReducer(ThemeReducer, { darkTheme: false });
  const [userName, setUserName] = useState("sarpbozkurt");
  const getTimeClicks = useRef(0);

  function updateTime() {
    const newTime = new Date().toLocaleTimeString();
    setTime(newTime);
    getTimeClicks.current += 1;
  }

  const toggleTheme = () => {
    dispatch({ type: "toggle" });
  };

  useEffect(() => {
    document.title = `Current Time: ${time}`;
  }, [time]);

  const counterStyle = {
    color: getTimeClicks.current > 10 ? "red" : "black",
  };


  const primeCheck = useMemo(() => {
    return isPrime(getTimeClicks.current);
  }, [getTimeClicks.current]);

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      <div className={`App ${theme.darkTheme ? "dark-theme" : ""}`}>
        <h1>Simple React Hooks Example</h1>
        <TimeDisplay time={time} />
        <button onClick={updateTime}>Get Time</button>
        <button onClick={toggleTheme}>Toggle Theme</button>
        <p style={counterStyle}>
          Get Time Button Clicks: {getTimeClicks.current}
        </p>
        <p style={counterStyle}>
          Get Time Button Clicks: {getTimeClicks.current}
          {primeCheck && " (Prime Number)"}
        </p>
      </div>
    </UserContext.Provider>
  );
}

export default App;
