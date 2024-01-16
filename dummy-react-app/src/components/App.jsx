import "../styles.css";
import React, {
  useState,
  useReducer,
  useEffect,
  // useContext, in TimeDisplay
  useRef,
  useMemo,
  useCallback,
  // useImperativeHandle, in custom input
  useLayoutEffect,
  useDeferredValue,
  Suspense,
} from "react";
import CustomInput from './CustomInput';
import TimeDisplay from "./TimeDisplay";
import UserContext from "../contexts/UserContext";
import ThemeReducer from "../reducers/ThemeReducer";
import { isPrime } from "../utils/isPrime";
import { networkingReducer } from "../reducers/NetworkingReducer";


function App() {
  const now = new Date().toLocaleTimeString();
  const [time, setTime] = useState(now);
  const [theme, dispatch] = useReducer(ThemeReducer, { darkTheme: false });
  const [userName, setUserName] = useState("sarpbozkurt");
  const getTimeClicks = useRef(0);

  const networkingInitialState = {
    loading: false,
    data: "",
    error: "",
  };
  const [networkingState, networkingDispatch] = useReducer(networkingReducer, networkingInitialState);


  const {loading, data, error } = networkingState; 
  const fetchDog = () => {
    dispatch({ type: "FETCH_START" });
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((res) => res.json())
      .then((res) => {
        networkingDispatch({ type: "FETCH_SUCCESS", payload: res.message });
      })
      .catch(() => {
        networkingDispatch({
          type: "FETCH_ERROR",
          payload: "error fetching data",
        });
      });
  };

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

  useLayoutEffect(() => {
    console.log("Layout updated due to theme change!");
  }, [theme.darkTheme])

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

  function DeferredComponent({deferredValue}) {
    console.log("Deferred Component Updated via Val", deferredValue);
    return <p>Deferred Val: {deferredValue}</p>
  }

  const[inputValue, setInputValue] = useState("");
  const deferredInputValue = useDeferredValue(inputValue, {timeoutMs: 20000000})

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      <div className={`App ${theme.darkTheme ? "dark-theme" : ""}`}>
        <h1>Simple React Hooks Example</h1>
        <button onClick={fetchDog} disabled={loading}>FETCH DOG</button>
        {data && (
          <div>
            <img class="dog-img" src={data} alt="random dog" />
          </div>
        )}
        {error && <p> {error}</p>}
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
        <h3> deferred test </h3>
        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
        <Suspense fallback={<p>Loading...</p>}>
          <DeferredComponent deferredValue={deferredInputValue}/>
        </Suspense>
      </div>
    </UserContext.Provider>
  );
}

export default App;
