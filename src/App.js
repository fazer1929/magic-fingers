import "./App.css";
import React from "react";
import Doodle from "./Doddle";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
function App() {
	return (
		<Router>
			<Switch>
				<Route path="/magic">
					<Doodle />
				</Route>
				<Route path="/">
					<Home />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
