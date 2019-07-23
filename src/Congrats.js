import React from "react";
import PropTypes from "prop-types";
import "./App.scss";

const Congrats = props => {
  if (props.success) {
    return (
      <div data-test="component-congrats" className="congrats-div">
        <p data-test="congrats-message">Congrats! You guessed the word!</p>
      </div>
    );
  } else {
    return <div data-test="component-congrats" />;
  }
};

Congrats.propTypes = {
  success: PropTypes.bool.isRequired
};

export default Congrats;
