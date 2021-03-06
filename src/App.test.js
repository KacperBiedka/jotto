import React from "react";
import { shallow } from "enzyme";

import { storeFactory, findByTestAttr } from "../test/testUtils";
import App, { UnconnectedApp } from "./App";

/**
 * @function setup
 * @param {object} state - State for this setup.
 * @returns {ShallowWrapper}
 */
const defaultProps = { success: false };

const setup = (state = {}, props = { success: false }) => {
  const setupProps = { ...defaultProps, ...props };
  const store = storeFactory(state);
  const wrapper = shallow(<App {...setupProps} store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe("redux properties", () => {
  test("has access to `success` state", () => {
    const success = true;
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);
  });
  test("has access to `secretWord` state", () => {
    const secretWord = "party";
    const wrapper = setup({ secretWord });
    const secretWordProp = wrapper.instance().props.secretWord;
    expect(secretWordProp).toBe(secretWord);
  });
  test("has access to `guessedWords` state", () => {
    const guessedWords = [{ guessedWord: "train", letterMatchCount: 3 }];
    const wrapper = setup({ guessedWords });
    const guessedWordsProp = wrapper.instance().props.guessedWords;
    expect(guessedWordsProp).toEqual(guessedWords);
  });
  test("`getSecretWord` action creator is a function on the props", () => {
    const wrapper = setup();
    const getSecretWordProp = wrapper.instance().props.getSecretWord;
    expect(getSecretWordProp).toBeInstanceOf(Function);
  });
});

describe("secret word display", () => {
  describe("show secret word has not been clicked", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup({});
    });
    test("does not show the secret word", () => {
      const paragraph = findByTestAttr(wrapper, "secret-word-paragraph");
      expect(paragraph.length).toBe(0);
    });
    test("shows the show secret word queustion paragraph", () => {
      const paragraph = findByTestAttr(wrapper, "show-secret-word");
      expect(paragraph.length).toBe(1);
    });
  });
  describe("show secret word has been clicked", () => {
    let wrapper;
    let showSecretWordParagraph;
    beforeEach(() => {
      wrapper = setup({});
      showSecretWordParagraph = findByTestAttr(wrapper, "show-secret-word");
      showSecretWordParagraph.simulate("click");
    });
    test("displays secret word", () => {
      const paragraph = findByTestAttr(wrapper, "secret-word-paragraph");
      expect(paragraph.length).toBe(1);
    });
    test("does not display the show secret word question paragraph", () => {
      const paragraph = findByTestAttr(wrapper, "show-secret-word");
      expect(paragraph.length).toBe(0);
    });
  });
});

describe("reset word", () => {
  test("reset word paragraph is not displayed on component mount", () => {
    const wrapper = setup();
    const paragraph = findByTestAttr(wrapper, "reset-word-paragraph");
    expect(paragraph.length).toBe(0);
  });
  test("reset word paragraph is displayed when the success is true", () => {
    const wrapper = setup({ success: true });
    const paragraph = findByTestAttr(wrapper, "reset-word-paragraph");
    expect(paragraph.length).toBe(1);
  });
});

test("`getSecretWord` runs on App mount", () => {
  const getSecretWordMock = jest.fn();

  const props = {
    getSecretWord: getSecretWordMock,
    success: false,
    guessedWords: []
  };

  // set up app component with getSecretWordMock as the getSecretWord prop
  const wrapper = shallow(<UnconnectedApp {...props} />);

  // run lifecycle method
  wrapper.instance().componentDidMount();

  // check to see if mock ran
  const getSecretWordCallCount = getSecretWordMock.mock.calls.length;

  expect(getSecretWordCallCount).toBe(1);
});
