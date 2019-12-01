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

const store = createStore(rootReducer, applyMiddleware(thunk));

function App() {
  useEffect(() => {
    const timestampFromStorage = localStorage.getItem("timestamp");
    const timestamp =
      timestampFromStorage && Number(JSON.parse(timestampFromStorage));

    if (timestamp && timestamp + 7200 * 1000 > new Date()) {
      const ratesFromStorage = localStorage.getItem("rates");

      let rates = JSON.parse(ratesFromStorage);
      store.dispatch(actions.fetchRatesSuccess(rates));
      console.log("storage");
    } else {
      store.dispatch(actions.fetchRates()).then(() => {
        localStorage.setItem(
          "rates",
          JSON.stringify(store.getState().rates.rates)
        );
        localStorage.setItem("timestamp", JSON.stringify(+new Date()));
      });
    }
  }, []);

  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Navigation />
          <Switch>
            <Route path="/convert">
              <ConvertPage />
            </Route>
            <Route path="/">
              <RatesPage />
            </Route>
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
