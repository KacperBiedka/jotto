import React, { Component } from "react";
import { connect } from "react-redux";
import { guessWord } from "./actions";

export class UnconnectedInput extends Component {
  inputBox = React.createRef();

  submitGuessedWord = event => {
    event.preventDefault();
    const guessedWord = this.inputBox.current.value;
    if (guessWord && guessedWord.length > 7) {
      alert("The can not be longer than 7 characters");
    } else if (
      guessedWord &&
      guessedWord.length > 0 &&
      guessedWord.length <= 7
    ) {
      this.props.guessWord(guessedWord);
    }
    this.inputBox.current.value = "";
  };

  render() {
    const contents = this.props.success ? null : (
      <form className="form-inline">
        <input
          id="word-guess"
          ref={this.inputBox}
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="text"
          placeholder="enter guess"
        />
        <button
          data-test="submit-button"
          className="btn btn-primary mb-2"
          onClick={this.submitGuessedWord}
          type="submit"
        >
          Submit
        </button>
      </form>
    );

    return <div data-test="component-input">{contents}</div>;
  }
}

const mapStateToProps = ({ success }) => {
  return { success };
};

export default connect(
  mapStateToProps,
  { guessWord }
)(UnconnectedInput);
