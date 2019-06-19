import React from "react";
import { BrowserRouter as Link } from "react-router-dom";

const Header = props => {
  let style = {
    height: "60px",
    boxShadow: "0px 5px 5px rgba(0, 0, 0, 0.2)",
    zIndex: "2",
    flexWrap: "nowrap",
    whiteSpace: "nowrap",
    position: "fixed",
    background: "#197452",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex"
  };
  return (
    <div id="hdr" style={style} className="header">
      <Link to="/home">
        <div
          style={{
            display: "flex",
            padding: "0 8px 0 8px",
            height: "60px",
            alignItems: "center"
          }}
          className="username"
        >
          <h2 style={{ margin: "0" }}>{props.currentUser}</h2>
        </div>
      </Link>
      <div
        style={{
          display: "flex",
          padding: "0 8px 0 8px",
          height: "60px",
          alignItems: "center"
        }}
        onClick={props.signOut}
        onMouseEnter={e => {
          e.target.style.cursor = "pointer";
        }}
        onMouseLeave={() => {
          document.body.style.cursor = "default";
        }}
        className="logout"
      >
        <h2>Log Out</h2>
      </div>
    </div>
  );
};

export default Header;
