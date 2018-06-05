// bootstraping

import React from "react";

import {render} from "react-dom";

import {App} from "./app/App";

import Routes from "./app/Routes";

import {Provider} from "react-redux";
import MS from "./app/store";

import { PersistGate } from 'redux-persist/integration/react'

//bind virtual dom to real dom

//render => diffing, patching real dom

render( (
        <Provider store={MS.store}>
                <PersistGate loading={null} persistor={MS.persistor}>
                        <Routes/>
                </PersistGate>
        </Provider>
        
),   //virtual dom
        document.getElementById("root") //real dom
)