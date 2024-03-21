import React from "react";
import { Main, Main2 } from "./pages/Main";
import Minting2 from "./pages/Minting2";
import Minting from "./pages/Minting";
import Verify from "./pages/Verify";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/eng" component={Main2} />
          <Route exact path="/nft" component={Minting} />
          <Route path="*" component={ErrorPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
