import { useReducer } from "react";

const initialState = { value: "", isTouched: false };

const inputStateReducer = (state, action) => {
  switch (action.type) {
    case "INPUT":
      return { value: action.value, isTouched: state.isTouched };
    case "BLUR":
      return { isTouched: true, value: state.value };
    default:
      return initialState;
  }
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, initialState);

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangedHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const inputBlurHandler = () => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({});
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangedHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
