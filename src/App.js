import React, { Component } from "react";
import "./App.css";
import { ui } from "./firebase";
import { uiConfig } from "./firebase";
import firebase from "firebase/app";
import "firebase/auth";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home.js";
import loading from "./images/loading.gif";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentUser: null,
      signedIn: false,
      userID: ""
    };
    this.signOut = this.signOut.bind(this);
    this.logIn = this.logIn.bind(this);
    this.addVaccine = this.addVaccine.bind(this);
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => { //set user id after authentication and fetch user info
      if (user && !this.state.signedIn) {
        let currentRef = firebase.database().ref("users/" + user.uid);
        firebase
          .database()
          .ref(currentRef)
          .once("value")
          .then(snapshot => {
            if (!snapshot.val()) {
              this.logIn(currentRef, user, false);
            } else {
              this.logIn(currentRef, user);
            }
          });
      } else {
        if (!this.state.signedIn) {
          ui.start("#firebaseui-auth-container", uiConfig);
        }
      }
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.loading === true) {
      this.setState({
        loading: false
      });
    }
    if (this.state.signedIn === true && window.location.pathname === "/") {
      window.location.href = "/home"; //redirect to /home after login
    }
  }
  signOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState(
          {
            loading: false,
            signedIn: false,
            currentUser: null
          },
          () => {
            window.location.href = "/";
            ui.start("#firebaseui-auth-container", uiConfig);
            this.props.databaseSync({});
          }
        );
      });
  }
  addVaccine(vaccineName, vaccineFrequency, dueDate, petName, oneTime) {
    let currDate = new Date();
    let vacDate = new Date(
      dueDate
        .split("/")
        .reverse()
        .join("-")
    );
    let day = currDate.getDate();
    let month = currDate.getMonth() + 1;
    let year = currDate.getFullYear();
    let milliseconds = currDate.getTime();
    let currentRef = firebase
      .database()
      .ref(`users/${this.state.userID}/vakcine/${milliseconds}`); //set firebase reference to current user and add new vaccine to database
    currentRef.set({
      dueDate: vacDate.getTime(),
      vaccineName: vaccineName,
      vaccineFrequency: oneTime ? "" : vaccineFrequency,
      dateAdded: day + "/" + month + "/" + year,
      done: false,
      vacID: milliseconds,
      dateDone: "",
      timeDone: "",
      petName: petName,
      oneTime: oneTime
    });
  }
  logIn(currentRef, user) {
    if (arguments[2] === false) {
      currentRef.set({
        displayName: user.displayName,
        userid: user.uid
      });
    }
    currentRef.on("value", snapshot => { //create firebase listener that detects data changes in database and calls databaseSync function that updates Redux state
      let currentUserState = snapshot.val();
      this.props.databaseSync(currentUserState);
    });
    this.setState({
      signedIn: true,
      currentUser: user.displayName,
      userID: user.uid
    });
  }
  render() {
    let loadingStyle = {
      display: "inline-block",
      position: "relative",
      left: "calc(50% - 25px)",
      height: "80px",
      width: "80px",
      borderRadius: "50%"
    };
    let Loading = (
      <div>
        <img style={loadingStyle} alt="" src={loading} />
      </div>
    );
    return (
      <Router>
        <div style={{ fontFamily: "Krub" }} id="all">
          <Route
            exact
            path="/"
            render={() => (
              <div className="App">
                {this.state.signedIn ? null : (
                  <div id="firebaseui-auth-container" />
                )}
              </div>
            )}
          />
          <Route
            path="/home"
            render={() =>
              this.state.signedIn && !this.state.loading ? (
                <Home
                  signOut={this.signOut}
                  currentUser={this.state.currentUser}
                  addVaccine={this.addVaccine}
                />
              ) : (
                Loading
              )
            }
          />
        </div>
      </Router>
    );
  }
}

export default App;
