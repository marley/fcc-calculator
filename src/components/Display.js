import React from "react";
import { connect } from "react-redux";
import { getInput, getError } from "../redux/selectors";

const Display = ({ input, error }) => (
  <div id="display" className="d-flex align-items-center">
    {error ? "Too long!" : input}
  </div>
);

const mapStateToProps = (state) => {
  const input = getInput(state);
  const error = getError(state);
  return { input, error };
};

export default connect(mapStateToProps)(Display);
