import React, { useEffect } from "react";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import thunk from "redux-thunk";

import currencyReducer from "./store/reducers/currencyReducer";
import convertReducer from "./store/reducers/convertReducer";
import RatesPage from "./pages/RatesPage";
import ConvertPage from "./pages/ConvertPage";
import Navigation from "./components/navigation/Navigation";
import * as actions from "./store/actions";

import "./App.css";

const rootReducer = combineReducers({
  rates: currencyReducer,
  convert: convertReducer
});

function getSavedState() {
  let result = {
    rates: {
      base: "USD",
      pinned: ["EUR"],
      rates: null,
      isLodaing: false,
      error: null
    },
    convert: { isLoading: false, error: false, value: null }
  };
  const base = localStorage.getItem("base");
  const pinned = localStorage.getItem("pinned");
  if (base) {
    result.rates.base = JSON.parse(base);
  }
  if (pinned) {
    result.rates.pinned = JSON.parse(pinned);
  }
  return result;
}

const savedState = getSavedState();

const store = createStore(rootReducer, savedState, applyMiddleware(thunk));

function App() {
  useEffect(() => {
    let timer;
    try {
      const timestampFromStorage = localStorage.getItem("timestamp");
      const timestamp =
        timestampFromStorage && Number(JSON.parse(timestampFromStorage));

      if (timestamp && timestamp + 3600 * 1000 > new Date()) {
        const diff = timestamp + 3600 * 1000 - new Date();
        const ratesFromStorage = localStorage.getItem("rates");
        let rates = JSON.parse(ratesFromStorage);

        store.dispatch(actions.fetchRatesSuccess(rates));

        timer = setInterval(fetchRates, 3600 * 1000);
      } else {
        fetchRates().finally(
          res => (timer = setInterval(fetchRates, 3600 * 1000))
        );
      }
    } catch (error) {
      console.log(error);
    }
    return () => clearInterval(timer);
  }, []);

  function fetchRates() {
    return store.dispatch(actions.fetchRates()).then(() => {
      localStorage.setItem(
        "rates",
        JSON.stringify(store.getState().rates.rates)
      );
      localStorage.setItem("timestamp", JSON.stringify(+new Date()));
      console.log("write t storage");
    });
  }

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navigation />
        <div className="App">
          <Switch>
            <Route path="/convert">
              <ConvertPage />
            </Route>
            <Route path="/">
              <RatesPage />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
