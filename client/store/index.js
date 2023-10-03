// import { applyMiddleware, legacy_createStore as createStore } from 'redux'
// import thunk from 'redux-thunk'
// import dataReducer from './actionReducer'
// const store = createStore(dataReducer, applyMiddleware(thunk))
// export default store

import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import dataReducer from './actionReducer'


import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    dataReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;