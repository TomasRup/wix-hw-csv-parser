import { combineReducers, createStore, applyMiddleware } from 'redux';
import injectMiddleware from 'redux-inject';
import thunkMiddleware from 'redux-thunk';

import csvActions from './csv/actions';
import csvReducer from './csv/reducer';

import utils from './utils';


const actions = {
    csv: csvActions
};

const rootStore = combineReducers({ 
    csv: csvReducer
});

const setupStore = store => createStore(
    store,
    applyMiddleware(
        injectMiddleware({
            utils: utils
        }),
        thunkMiddleware
    )
);

export default {
    actions,
    rootStore,
    setupStore
};