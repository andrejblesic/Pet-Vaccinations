import React, { Component } from "react";
import "./VaccineList.css";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import plusImage from "./images/plus-sign.svg";
import Vaccine from "./Vaccine.js";

class VaccineList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      expanded: false,
      editExpanded: false,
      emptyList: true
    };
    this.handleRemove = this.handleRemove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.vakcine === 0) {
      this.setState({
        emptyList: true,
        loading: false
      });
    } else {
      this.setState({
        emptyList: false,
        loading: false
      });
    }
  }
  handleEdit(e) {
    if (e.target.className === "edit-icon ikonica") {
      this.setState({
        editExpanded: !this.state.editExpanded
      });
    }
  }
  handleRemove(id) {
    let vacID = id;
    let userid = this.props.userid;
    let currentRef = firebase
      .database()
      .ref("users/" + userid + /vakcine/ + vacID);
    currentRef.remove();
  }
  render() {
    let loadStyle = {
      textAlign: "center",
      width: "100%"
    };
    let imgStyle = {
      height: "30px",
      width: "30px",
      position: "relative",
      top: "4px"
    };
    let listStyle = {
      border: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      margin: "0 auto",
      marginTop: "20px"
    };
    if (this.props.vakcine) {
      var vaccineList = Object.keys(this.props.vakcine).map(item => {
        return (
          <Vaccine
            handleRemove={this.handleRemove}
            userid={this.props.userid}
            vacID={this.props.vakcine[item].vacID}
            key={this.props.vakcine[item].vacID}
            info={this.props.vakcine[item]}
          />
        );
      });
      let date = new Date().getTime();
      switch (this.props.show) { //determine which vaccines to display in the list according to option chosen in drop down list
        case "Done":
          vaccineList = vaccineList.filter(item => {
            return (
              item.props.info.done &&
              date + 2592000000 < item.props.info.dueDate
            );
          });
          break;
        case "Upcoming":
          vaccineList = vaccineList.filter(item => {
            return (
              item.props.info.dueDate < date + 2592000000 &&
              item.props.info.dueDate > date
            );
          });
          break;
        case "Overdue":
          vaccineList = vaccineList.filter(item => {
            return item.props.info.dueDate < date && !item.props.info.done;
          });
          break;
        default:
          break;
      }
      switch (this.props.sortby) { //determine the sorting of the vaccines according to option chosen in drop down list
        case "Date added":
          vaccineList.sort((a, b) => {
            return a.props.info.dateAdded - b.props.info.dateAdded;
          });
          break;
        case "Due date":
          vaccineList.sort((a, b) => {
            return a.props.info.dueDate - b.props.info.dueDate;
          });
          break;
        case "Date done":
          vaccineList.sort((a, b) => {
            return a.props.info.dateDone - b.props.info.dateDone;
          });
          break;
        case "Pet name":
          vaccineList.sort((a, b) => {
            return ("" + a.props.info.petName).localeCompare(
              b.props.info.petName
            );
          });
          break;
        default:
          break;
      }
    }
    let Loading = <h1 style={loadStyle}>Loading...</h1>;
    console.log(this.state.loading)
    return (
      <div style={listStyle}>
        <ul
          style={{ minWidth: "300px", width: "55%", margin: "0", padding: "0" }}
        >
          <div>
            {this.state.loading ? Loading : vaccineList}
            {!this.state.loading && this.state.emptyList && this.props.show === "All" ? (
              <h2 className="list-info" style={{ textAlign: "center" }}>
                There are currently no vaccines in your library. Add them using
                the&nbsp;
                <span>
                  <img alt="" style={imgStyle} src={plusImage} />
                </span>
                &nbsp;icon at the top of the page
              </h2>
            ) : null}
            {this.props.show === "Done" &&
            (!vaccineList || vaccineList.length === 0) ? (
              <h2 className="list-info" style={{ textAlign: "center" }}>
                There are currently no vaccines marked as
                <span
                  style={{
                    textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)",
                    color: "#197452"
                  }}
                >
                &nbsp;Done
                </span>
              </h2>
            ) : null}
            {this.props.show === "Upcoming" &&
            (!vaccineList || vaccineList.length === 0) ? (
              <h2 className="list-info" style={{ textAlign: "center" }}>
                There are currently no vaccines marked as
                <span
                  style={{
                    color: "#E0A800",
                    textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)"
                  }}
                >
                  &nbsp;Upcoming
                </span>
              </h2>
            ) : null}
            {this.props.show === "Overdue" &&
            (!vaccineList || vaccineList.length === 0) ? (
              <h2 className="list-info" style={{ textAlign: "center" }}>
                There are currently no vaccines marked as
                <span
                  style={{
                    color: "#FD465F",
                    textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)"
                  }}
                >
                  &nbsp;Overdue
                </span>
              </h2>
            ) : null}
          </div>
        </ul>
      </div>
    );
  }
}

export default VaccineList;
