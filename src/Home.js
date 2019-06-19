import React, { Component } from "react";
import "./Home.css";
import plusImage from "./images/plus-sign.svg";
import minusImage from "./images/remove.svg";
import { Container2 } from "./reactredux.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as styles from "./HomeStyles.js";
import Header from "./Header.js";
import { InfoCard } from "./InfoCard.js";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfo: false,
      currentVaccine: "",
      invalidVaccine: false,
      vaccineFrequency: "",
      invalidFrequency: false,
      form: false,
      sortby: "Date added",
      show: "All",
      dueDate: null,
      invalidDueDate: false,
      petName: "",
      invalidPetName: false,
      oneTime: false
    };
    this.updateVaccine = this.updateVaccine.bind(this);
    this.sendVaccine = this.sendVaccine.bind(this);
    this.updateFrequency = this.updateFrequency.bind(this);
    this.showHideForm = this.showHideForm.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handlePetName = this.handlePetName.bind(this);
    this.handleOneTime = this.handleOneTime.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.changeInfo = this.changeInfo.bind(this);
  }
  changeInfo() {
    this.setState({
      showInfo: !this.state.showInfo
    });
  }
  handleDate(date) {
    this.setState({
      dueDate: date,
      invalidDueDate: false
    });
  }
  handlePetName(e) {
    this.setState({
      petName: e.target.value
    });
  }
  handleOneTime(e) {
    this.setState({
      oneTime: e.target.checked
    });
  }
  handleSort(e) {
    this.setState({
      sortby: e.target.value
    });
  }
  handleShow(e) {
    this.setState({
      show: e.target.value
    });
  }
  updateVaccine(e) {
    this.setState({
      currentVaccine: e.target.value
    });
  }
  updateFrequency(e) {
    this.setState({
      vaccineFrequency: e.target.value
    });
  }
  sendVaccine(e) {
    e.preventDefault();
    if (
      this.state.currentVaccine.length > 0 &&
      (this.state.vaccineFrequency > 0 || this.state.oneTime) &&
      this.state.dueDate &&
      (this.state.vaccineFrequency.length > 0 || this.state.oneTime)
    ) {
      this.setState(
        {
          invalidFrequency: false,
          invalidVaccine: false
        },
        () => {
          let day = this.state.dueDate.getDate();
          let month = this.state.dueDate.getMonth() + 1;
          let year = this.state.dueDate.getFullYear();
          let dueDate = `${day}/${month}/${year}`;
          this.props.addVaccine(
            this.state.currentVaccine,
            this.state.vaccineFrequency,
            dueDate,
            this.state.petName,
            this.state.oneTime
          );
          this.setState({
            currentVaccine: "",
            vaccineFrequency: "",
            dueDate: "",
            petName: "",
            oneTime: false
          });
        }
      );
      return;
    }
    if (
      this.state.vaccineFrequency.length < 1 ||
      parseInt(this.state.vaccineFrequency) < 1
    ) {
      this.setState({
        invalidFrequency: true
      });
    } else {
      this.setState({
        invalidFrequency: false
      });
    }
    if (this.state.currentVaccine.length < 1) {
      this.setState({
        invalidVaccine: true
      });
    } else {
      this.setState({
        invalidVaccine: false
      });
    }
    if (this.state.dueDate === null) {
      this.setState({
        invalidDueDate: true
      });
    } else {
      this.setState({
        invalidDueDate: false
      });
    }
    if (this.state.petName.length < 1) {
      this.setState({
        invalidPetName: true
      });
    } else {
      this.setState({
        invalidPetName: false
      });
    }
  }
  showHideForm() {
    this.setState({
      form: !this.state.form,
      currentVaccine: "",
      vaccineFrequency: "",
      invalidFrequency: false,
      invalidVaccine: false
    });
  }
  render() {
    //console.log("rendering home")
    let vaccineFormStyle = {
      display: this.state.form ? "flex" : "none",
      position: "relative",
      top: "11px",
      left: "20px",
      margin: "0 auto",
      flexWrap: "nowrap"
    };
    let freqStyle = {
      width: "135px",
      background: this.state.oneTime
        ? "rgb(200, 200, 200)"
        : this.state.invalidFrequency
        ? "pink"
        : "white"
    };
    let vacStyle = {
      background: this.state.invalidVaccine ? "pink" : "white"
    };
    return (
      <div>
        <Header
          signOut={this.props.signOut}
          currentUser={this.props.currentUser}
        />
        <InfoCard changeInfo={this.changeInfo} showInfo={this.state.showInfo} />
        <div className="vaccine-add-options" style={styles.vacAddOptionsStyle}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
            className="vaccine-add"
          >
            <div
              style={{ position: "relative", left: "-22.5px" }}
              id="plus-div"
            >
              <img
                className="add-vaccine-icon"
                alt=""
                onClick={this.showHideForm}
                style={styles.iconStyle}
                src={this.state.form ? minusImage : plusImage}
              />
            </div>
            <form id="vaccine-form" style={vaccineFormStyle}>
              <input
                autoComplete="off"
                value={this.state.currentVaccine}
                style={{ ...vacStyle, ...styles.vaccineInputStyle }}
                onChange={this.updateVaccine}
                id="vaccine-input"
                placeholder={
                  this.state.invalidVaccine
                    ? "Invalid Vaccine Name"
                    : "Vaccine Name"
                }
              />
              <input
                autoComplete="off"
                value={this.state.petName}
                onChange={this.handlePetName}
                id="pet-name-input"
                placeholder={
                  this.state.invalidPetName ? "Invalid Pet Name" : "Pet Name"
                }
                style={{
                  ...styles.vaccineInputStyle,
                  background: this.state.invalidPetName ? "pink" : "white"
                }}
              />
              <DatePicker
                className={this.state.invalidDueDate ? "invalid-date" : ""}
                dateFormat="dd/MM/yyyy"
                autoComplete="off"
                placeholderText={
                  this.state.invalidDueDate ? "Invalid Due date" : "Due Date"
                }
                id="date-input"
                selected={this.state.dueDate}
                onChange={this.handleDate}
              />
              <input
                autoComplete="off"
                disabled={this.state.oneTime}
                id="vaccine-month-input"
                value={this.state.oneTime ? "" : this.state.vaccineFrequency}
                min="1"
                max="120"
                style={{ ...freqStyle, ...styles.vaccineInputStyle }}
                onChange={this.updateFrequency}
                placeholder={
                  this.state.oneTime
                    ? "One-time selected"
                    : this.state.invalidFrequency
                    ? "Invalid Frequency"
                    : "Frequency (months)"
                }
                type="number"
              />
              <div
                style={{
                  fontWeight: "600",
                  marginTop: "8px",
                  marginBottom: "8px"
                }}
              >
                <input
                  checked={this.state.oneTime}
                  onChange={this.handleOneTime}
                  id="onetime-checkbox"
                  type="checkbox"
                />
                <label htmlFor="onetime-checkbox">One-time?</label>
              </div>
              <button
                className="addVaccine"
                style={styles.addStyle}
                onClick={this.sendVaccine}
              >
                ADD
              </button>
            </form>
          </div>
          <div className="vaccine-options" style={styles.optionsStyle}>
            <div style={styles.selectDivStyle}>
              <h3 className="option-label" style={styles.optionsLabelStyle}>
                Show:
              </h3>
              <select onChange={this.handleShow} style={styles.selectStyle}>
                <option>All</option>
                <option>Done</option>
                <option>Upcoming</option>
                <option>Overdue</option>
              </select>
            </div>
            <div style={styles.selectDivStyle}>
              <h3 className="option-label" style={styles.optionsLabelStyle}>
                Sort by:
              </h3>
              <select onChange={this.handleSort} style={styles.selectStyle}>
                <option>Date added</option>
                <option>Due date</option>
                <option>Date done</option>
                <option>Pet name</option>
              </select>
            </div>
          </div>
        </div>
        <Container2
          show={this.state.show}
          sortby={this.state.sortby}
          addVaccine={this.props.addVaccine}
          signOut={this.props.signOut}
        />
      </div>
    );
  }
}

export default Home;
