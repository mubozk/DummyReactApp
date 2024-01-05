const themeReducer = (state, action) => {
    switch (action.type) {
      case "toggle":
        return { ...state, darkTheme: !state.darkTheme };
      default:
        return state;
    }
  };
  export default themeReducer;
  