import {
    createStore, combineReducers,
    applyMiddleware
} from 'redux';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import AuthReducer from './auth/state/AuthReducer';
import EmployeeReducer from './employee/state/EmployeeReducer';
import EmployeeDetailsReducer from './employee/state/EmployeeDetailsReducer';
import ProjectReducer from './project/state/ProjectReducer';
import ProjectDetailsReducer from './project/state/ProjectDetailsReducer';

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
    employeeListStore: EmployeeReducer,
    employeeDetailsStore: EmployeeDetailsReducer,
    projectListStore: ProjectReducer,
    projectDetailsStore: ProjectDetailsReducer
    //state items: state Reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducers)

let store = createStore(persistedReducer,
    applyMiddleware(thunk));
let persistor = persistStore(store)
export default { store , persistor
}