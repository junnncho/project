import React, { useEffect } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import SecureRoutes from "./SecureRoutes";
import { composeWithDevTools } from "redux-devtools-extension"; // 리덕스 개발자 도구

const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <SecureRoutes />
      </Provider>
    </div>
  );
};

export default App;
