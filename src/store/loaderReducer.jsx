const loaderReducer = (state = false, action) => {
    switch (action.type) {
        case "SHOW_LOADER":
            return action.payload;
        case "HIDE_LOADER":
            return action.payload;
        default:
            return state;
    }
}

export default loaderReducer;