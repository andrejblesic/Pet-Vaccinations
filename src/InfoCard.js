import plusImage from "./images/plus-sign.svg";
import minusImage from "./images/remove.svg";
import checked from "./images/checked.svg";
import pencil from "./images/pencil.svg";
import question from "./images/question.svg";
import React from "react";

export const InfoCard = ({ showInfo, changeInfo }) => {
  let infoDivStyle = {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    top: "50px",
    justifyContent: "center"
  };
  let legendIconStyle = {
    boxSizing: "border-box",
    border: "2px solid white",
    display: "inline-block",
    height: "20px",
    width: "20px",
    borderRadius: "4px",
    position: "relative",
    top: "4px"
  };
  let helpIconStyle = {
    position: "relative",
    top: "3px",
    width: "18px",
    height: "18px",
    marginRight: "5px",
    borderRadius: "50%",
    border: "2px solid white"
  };
  let slideInStyle = {
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    padding: "5px",
    width: "230px",
    justifyContent: "space-between",
    position: "fixed",
    background: "#427A82",
    boxShadow: "0 4px 0 rgba(0, 0, 0, 0.5)",
    borderRadius: "0 10px 10px 0",
    top: "70px",
    zIndex: "4"
  };
  return (
    <div onClick={changeInfo} style={infoDivStyle}>
      <div
        className={showInfo ? "slidein color-legend" : "slideout color-legend"}
        style={slideInStyle}
      >
        <div>
          <div style={{ ...legendIconStyle, background: "#006DF0" }} />
          <h4 style={{ display: "inline", margin: "0" }}>
            &nbsp;Done one-time vaccine
          </h4>
        </div>
        <div>
          <div style={{ ...legendIconStyle, background: "#197452" }} />
          <h4 style={{ display: "inline", margin: "0" }}>
            &nbsp;Not upcoming vaccine
          </h4>
        </div>
        <div>
          <div style={{ ...legendIconStyle, background: "#E0A800" }} />
          <h4 style={{ display: "inline", margin: "0" }}>
            &nbsp;Upcoming vaccine
          </h4>
        </div>
        <div>
          <div style={{ ...legendIconStyle, background: "#FD465F" }} />
          <h4 style={{ display: "inline", margin: "0" }}>
            &nbsp;Overdue vaccine
          </h4>
        </div>
        <hr />
        <div style={{ paddingRight: "15px" }}>
          <h4 style={{ display: "inline", margin: "0" }}>
            <span>
              <img alt="" style={helpIconStyle} src={plusImage} />
            </span>
            Add a new vaccine
          </h4>
          <br />
          <h4 style={{ display: "inline", margin: "0" }}>
            <span>
              <img alt="" style={helpIconStyle} src={pencil} />
            </span>
            Edit an existing vaccine
          </h4>
          <br />
          <h4 style={{ display: "inline", margin: "0" }}>
            <span>
              <img alt="" style={helpIconStyle} src={checked} />
            </span>
            Mark a vaccine as done
          </h4>
          <br />
          <h4 style={{ display: "inline", margin: "0" }}>
            <span>
              <img alt="" style={helpIconStyle} src={minusImage} />
            </span>
            Remove a vaccine
          </h4>
          <br />
        </div>
        <div
          style={{
            borderRadius: "0 5px 5px 0",
            width: "25px",
            boxShadow: "0 3px 0 rgba(0, 0, 0, 0.5)",
            padding: "2px",
            background: "#427A82",
            position: "absolute",
            left: "240px",
            top: "100px"
          }}
        >
          <img
            alt=""
            src={question}
            style={{
              paddingTop: "3px",
              width: "20px",
              height: "20px",
              paddingLeft: "2px"
            }}
          />
        </div>
      </div>
    </div>
  );
};
