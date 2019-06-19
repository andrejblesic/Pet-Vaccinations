import React, { Component } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import * as styles from "./VaccineStyles.js";
import checked from "./images/checked.svg";
import pencil from "./images/pencil.svg";
import minusImage from "./images/remove.svg";

export default class Vaccine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      editExpanded: false,
      newVacName: "",
      newVacFrequency: "",
      invalidVacName: false,
      invalidVacFreq: false
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDone = this.handleDone.bind(this);
    this.handleNewName = this.handleNewName.bind(this);
    this.handleNewFreq = this.handleNewFreq.bind(this);
    this.submitNewName = this.submitNewName.bind(this);
  }
  handleClick(event) {
    this.setState({
      expanded: !this.state.expanded
    });
  }
  handleEdit(e) {
    e.stopPropagation();
    this.setState({
      editExpanded: !this.state.editExpanded
    });
  }
  handleNewName(e) {
    this.setState({
      newVacName: e.target.value,
      invalidVacName: false
    });
  }
  handleNewFreq(e) {
    this.setState({
      newVacFrequency: e.target.value,
      invalidVacFreq: false
    });
  }
  submitNewName(e) {
    e.preventDefault();
    e.stopPropagation();
    let single = this.props.info.oneTime;
    let newVacName = this.state.newVacName;
    let newVacFrequency = this.state.newVacFrequency;
    if (newVacName.length < 1) {
      this.setState({
        invalidVacName: true
      });
      return;
    }
    if ((newVacFrequency.length < 1 || newVacFrequency === "0") && !single) {
      this.setState({
        invalidVacFreq: true
      });
      return;
    }
    let vacID = this.props.info.vacID;
    let userID = this.props.userid;
    let currentRef = firebase
      .database()
      .ref(`users/${userID}/vakcine/${vacID}`);
    currentRef.update({
      vaccineName: newVacName,
      vaccineFrequency: newVacFrequency
    });
    this.setState({
      newVacName: "",
      newVacFrequency: "",
      editExpanded: false
    });
  }
  handleDone(e) {
    e.stopPropagation();
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let vacName = this.props.vacID;
    let userid = this.props.userid;
    let currentRef = firebase
      .database()
      .ref("users/" + userid + /vakcine/ + vacName);
    let newDueDate = new Date(this.props.info.dueDate);
    newDueDate.setMonth(
      newDueDate.getMonth() + parseInt(this.props.info.vaccineFrequency)
    );
    currentRef.update({
      dueDate: this.props.info.oneTime ? 9999999999999 : newDueDate.getTime(),
      done: true,
      dateDone: day + "/" + month + "/" + year,
      timeDone: date.getTime()
    });
  }
  render() {
    let date = new Date();
    let dueDate = new Date(this.props.info.dueDate);
    let day = dueDate.getDate();
    let month = dueDate.getMonth() + 1;
    let year = dueDate.getFullYear();
    let overdue = dueDate < date;
    let upcoming =
      date.getTime() + 2592000000 > dueDate.getTime() &&
      date.getTime() < dueDate.getTime();
    let editInputStyle = {
      background: this.state.invalidVacName ? "pink" : "white"
    };
    let editInputStyleFreq = {
      background: this.state.invalidVacFreq ? "pink" : "white"
    };
    let editInputStyleName = {
      background: this.state.invalidVacName ? "pink" : "white"
    };
    let listItemStyle = {
      background:
        this.props.info.done &&
        !this.props.info.oneTime &&
        !upcoming &&
        !overdue
          ? "#197452"
          : !upcoming && this.props.info.done && this.props.info.oneTime
          ? "#006DF0"
          : !upcoming && !overdue
          ? "#197452"
          : overdue
          ? "#FD465F"
          : "#E0A800"
    };
    let editStyle = {
      marginBottom: this.state.editExpanded ? "0px" : "0px",
      marginTop: this.state.editExpanded ? "10px" : "0px"
    };
    let expandedStyle = {
      padding: this.state.expanded ? "4px" : "0px",
      marginBottom: this.state.expanded ? "10px" : "0px",
      background:
        this.props.info.done &&
        !this.props.info.oneTime &&
        !upcoming &&
        !overdue
          ? "#58A588"
          : !upcoming && this.props.info.done && this.props.info.oneTime
          ? "#709BE5"
          : !upcoming && !overdue
          ? "#58A588"
          : overdue
          ? "#FC8398"
          : "#FFCF3D",
      color: "white"
    };
    return (
      <li
        onClick={this.handleClick}
        className={this.state.expanded ? "list-item veliki" : "list-item mali"}
        style={{ ...listItemStyle, ...styles.listItemStyle }}
        key={this.props.info.vacID}
      >
        <div className="clickable" style={styles.clickableStyle}>
          <div style={styles.headStyle}>
            <h3 style={styles.vacInfoStyle}>
              {this.props.info.vaccineName} - {this.props.info.petName}
            </h3>
          </div>
          <div style={styles.iconDivStyle}>
            {upcoming || overdue ? (
              <img
                alt=""
                className="check ikonica"
                onClick={this.handleDone}
                style={styles.iconStyle}
                src={checked}
              />
            ) : null}
            <img
              alt=""
              onClick={this.handleEdit}
              className="edit-icon ikonica"
              style={styles.iconStyle}
              src={pencil}
            />
            <img
              alt=""
              onClick={() => this.props.handleRemove(this.props.info.vacID)}
              className="ikonica"
              style={styles.iconStyle}
              src={minusImage}
            />
          </div>
        </div>
        <div
          className={
            this.state.editExpanded
              ? "vaccine-edit shown"
              : "vaccine-edit hidden"
          }
          style={editStyle}
        >
          <form style={{ display: "flex", flexWrap: "wrap" }}>
            <input
              onClick={event => event.stopPropagation()}
              onChange={this.handleNewName}
              placeholder="New Vaccine Name"
              style={{
                ...styles.editInputStyle,
                ...editInputStyle,
                ...editInputStyleName
              }}
              value={this.state.newVacName}
              className="vaccine-name-edit"
            />
            <br />
            {!this.props.info.oneTime ? (
              <input
                onClick={event => event.stopPropagation()}
                onChange={this.handleNewFreq}
                type="number"
                min="0"
                max="120"
                placeholder="New Frequency"
                value={this.state.newVacFrequency}
                style={{
                  ...styles.editInputStyle,
                  ...editInputStyle,
                  ...editInputStyleFreq
                }}
                className="vaccine-frequency-edit"
              />
            ) : null}
            <input
              className="submitbut"
              onClick={this.submitNewName}
              style={styles.submitStyle}
              type="submit"
            />
          </form>
        </div>
        <div
          className={
            this.state.expanded ? "expanded prosireno" : "expanded suzeno"
          }
          style={{ ...expandedStyle, ...styles.expandedStyle }}
        >
          {!(this.props.info.done && this.props.info.oneTime)
            ? [
                <h4 key="onetime" style={{ margin: "0" }}>
                  This vaccine {overdue ? "was" : "is"} due on&nbsp;
                  <span style={{ color: "#E0A800" }}>
                    {`${day}/${month}/${year}`}
                  </span>
                </h4>,
                <hr key="hr" style={{ borderTop: "none" }} />
              ]
            : null}
          {this.props.info.dateDone !== undefined &&
          this.props.info.dateDone.length > 0
            ? [
                <h4 key="h4" style={{ margin: "0" }}>
                  This vaccine was marked done&nbsp;
                  <span>
                    <img alt="" style={styles.doneIconStyle} src={checked} />
                  </span>{" "}
                  on {this.props.info.dateDone}
                </h4>,
                <hr key="hr" style={{ borderTop: "none" }} />
              ]
            : null}
          <h4 style={{ margin: "0" }}>Added on {this.props.info.dateAdded}</h4>
          <hr style={{ borderTop: "none" }} />
          {parseInt(this.props.info.vaccineFrequency) > 0 ? (
            <h4 style={{ margin: "0" }}>
              This vaccine should be taken every
              <span style={{ color: "#006DF0" }}>&nbsp;
                {this.props.info.vaccineFrequency} month
                {this.props.info.vaccineFrequency > 1 ? "s" : ""}
              </span>
            </h4>
          ) : (
            <h4 style={{ margin: "0" }}>This is a one-time only vaccine</h4>
          )}
        </div>
      </li>
    );
  }
}
