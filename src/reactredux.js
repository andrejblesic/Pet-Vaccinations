import { connect } from "react-redux";
import { databasesync } from "./redux";
import App from "./App";
import VaccineList from "./VaccineList";

const mapStateToProps = state => {
  if (state !== undefined) {
    return {
      vakcine: state.vakcine ? state.vakcine : 0,
      userid: state.userid
    };
  }
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    databasesync: data => dispatch(databasesync(data))
  };
};

const Container = connect(
  null,
  mapDispatchToProps
)(App);
const Container2 = connect(
  mapStateToProps,
  null
)(VaccineList);

export default Container;
export { Container2 };
