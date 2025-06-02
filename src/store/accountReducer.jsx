// action - state management
import { ACCOUNT_INITIALIZE, LOGIN, LOGOUT, SET_SESSION_POSITION, SET_SESSION_POSITION_RED, SET_SESSION_POSITION_TIME } from './actions';

export const initialState = {
    token: '',
    isLoggedIn: false,
    isInitialized: false,
    user: null,
    sessionExist: false,
    sessionDate: null,
    sessionPosition: null
};

//-----------------------|| ACCOUNT REDUCER ||-----------------------//

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACCOUNT_INITIALIZE: {
            const { isLoggedIn, user, token } = action.payload;
            console.log("account initialized ......")
            return {
                ...state,
                isLoggedIn,
                isInitialized: true,
                token,
                user,
                sessionExist: false,
                sessionPosition: null
            };
        }
        case LOGIN: {
            const { user } = action.payload;
            return {
                ...state,
                isLoggedIn: true,
                user
            };
        }
        case LOGOUT: {
            return {
                ...state,
                isLoggedIn: false,
                token: '',
                user: null
            };
        }
        case SET_SESSION_POSITION_RED:{
            const { sessionExist,sessionDate, sessionPosition } = action.payload;
            console.log("action payload", action.payload)
            return {
                ...state,
                sessionExist: sessionExist,
                sessionDate: sessionDate,
                sessionPosition: sessionPosition
            };
        }

        case SET_SESSION_POSITION_TIME:{
            const { sessionDate } = action.payload;
            console.log("action payload", action.payload)
            return {
                ...state,
                sessionDate: sessionDate
            };
        }
        default: {
            return { ...state };
        }
    }
};

export default accountReducer;
