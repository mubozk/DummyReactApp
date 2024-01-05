import React from "react";

const UserContext = React.createContext({
  userName: "-----------",
  setUserName: () => {},
});

export default UserContext;
