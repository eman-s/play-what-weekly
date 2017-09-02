import React, { Component } from 'react';
import '../styles/App.css';
import NavBar from './NavBar'
import PlayListForm from './PlayListForm'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <PlayListForm />
      </div>
    );
  }
}
