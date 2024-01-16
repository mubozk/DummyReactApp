
export const networkingReducer = (state, action) => {
    switch(action.type) {
        case "FETCH_SUCCESS":
            return {
                ...state,
                data: action.payload,
                loading: false,
            }
        case "FETCH_LOADING":
            return {
                ...state,
                data: "",
                loading: true,
            }
        case "FETCH_ERROR":
            return {
                ...state,
                data: "",
                error: action.payload,
                loading: false,
            }
    }
}