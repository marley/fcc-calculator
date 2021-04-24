import React from "react";
import { connect } from "react-redux";
import { getInput } from "../redux/selectors";

const Display = ({ input }) => (
  <div id="display" className="d-flex align-items-center">
    {input}
  </div>
);

const mapStateToProps = (state) => {
  const input = getInput(state);
  return { input };
};

export default connect(mapStateToProps)(Display);
