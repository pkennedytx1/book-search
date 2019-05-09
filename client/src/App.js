import React, { Component } from "react";
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Search from './components/Search';
import Saved from './components/Saved';
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
        <Navbar />
          <Route exact path="/" component={Search} />
          <Route exact path="/saved" component={Saved} />
      </Router>
      </div>
    );
  }
}

export default App;