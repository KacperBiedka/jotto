import { storeFactory } from "../../test/testUtils";
import { getSecretWord } from "./";

describe("secretWord action creator", () => {
  it("adds secretWord to state on mount", () => {
    const store = storeFactory();
    store.dispatch(getSecretWord());
    const newState = store.getState();
    expect(newState.secretWord).toBeTruthy();
  });
});
