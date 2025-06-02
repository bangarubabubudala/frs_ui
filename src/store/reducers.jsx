import { combineReducers } from '@reduxjs/toolkit';
import accountReducer from './accountReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loaderReducer from './loaderReducer';

const reducers = combineReducers({
    account: persistReducer(
        {
            key: 'account',
            storage,
            keyPrefix: 'datta-'
        },
        accountReducer
    ),
    loader: loaderReducer,
});

export default reducers;


