import {
    createStore, combineReducers,
    applyMiddleware
} from 'redux';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import AuthReducer from './state/AuthReducer';
import EmployeeReducer from './state/EmployeeReducer';
import ProjectReducer from './state/ProjectReducer';

import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
}

// function called by store
//for every dispatch
// function loggerMiddleware({ dispatch, getState }) {
//     return function (next) {
//         return function (action) {
//             console.log("LOGGER ", action, typeof action);
//             //forward action to next middleware or reducers
//             let result = next(action);
//             return result;
//             return true;
//         }
//     }
// }

const rootReducers = combineReducers({
    //state name: reducer function
    // authState: AuthReducer,
    employeeStore: EmployeeReducer,
    projectStore: ProjectReducer,
    //state items: state Reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducers)

let store = createStore(persistedReducer,
    applyMiddleware(thunk));
let persistor = persistStore(store)
export default { store , persistor
}