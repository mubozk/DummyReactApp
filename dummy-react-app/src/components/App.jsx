import "../styles.css";
import React, {
  useState,
  useReducer,
  useEffect,
  useContext,
  useRef,
  useMemo,
  useCallback,
} from "react";
import CustomInput from './CustomInput';
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

  const [newUserName, setNewUserName] = useState("");

  const updateUserName = useCallback(() => {
    setUserName(newUserName);
  }, [newUserName, setUserName]);

  const inputRef = useRef();
  const focusOnInput = useCallback(() => {
    inputRef.current.focusInput();
  }, []);
  const resetInputField = useCallback(() => {
    inputRef.current.resetInput();
  }, []);



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
        <CustomInput
        ref={inputRef}
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          placeholder="Enter new user name"
        />
        <button onClick={updateUserName}>Update User Name</button>
        <button onClick={focusOnInput}>Focus on Input</button>
        <button onClick={resetInputField}>Reset Input</button>
      </div>
    </UserContext.Provider>
  );
}

export default App;
