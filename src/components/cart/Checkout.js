import useInput from "../../hooks/use-input";

import classes from "./Checkout.module.css";

const isNotEmpty = (value) => value.trim() !== "";
const isPostalCode = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangedHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(isNotEmpty);

  const {
    value: streetValue,
    isValid: streetIsValid,
    hasError: streetHasError,
    valueChangedHandler: streetChangedHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreet,
  } = useInput(isNotEmpty);

  const {
    value: postalValue,
    isValid: postalIsValid,
    hasError: postalHasError,
    valueChangedHandler: postalChangedHandler,
    inputBlurHandler: postalBlurHandler,
    reset: resetPostal,
  } = useInput(isPostalCode);

  const {
    value: cityValue,
    isValid: cityIsValid,
    hasError: cityHasError,
    valueChangedHandler: cityChangedHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCity,
  } = useInput(isNotEmpty);

  const formIsValid =
    nameIsValid && streetIsValid && postalIsValid && cityIsValid;

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) return;

    props.onSubmitOrder({
      name: nameValue,
      street: streetValue,
      postal: postalValue,
      city: cityValue,
    });

    resetName();
    resetStreet();
    resetPostal();
    resetCity();
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${nameHasError ? classes.invalid : ""}`}
      >
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={nameValue}
          onChange={nameChangedHandler}
          onBlur={nameBlurHandler}
        />
        {nameHasError && <p className="error-text">Name must not be empty</p>}
      </div>
      <div
        className={`${classes.control} ${
          streetHasError ? classes.invalid : ""
        }`}
      >
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={streetValue}
          onChange={streetChangedHandler}
          onBlur={streetBlurHandler}
        />
        {streetHasError && (
          <p className="error-text">Street must not be empty</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          postalHasError ? classes.invalid : ""
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={postalValue}
          onChange={postalChangedHandler}
          onBlur={postalBlurHandler}
        />
        {postalHasError && (
          <p className="error-text">Postal must be 5 digits long</p>
        )}
      </div>
      <div
        className={`${classes.control} ${cityHasError ? classes.invalid : ""}`}
      >
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={cityValue}
          onChange={cityChangedHandler}
          onBlur={cityBlurHandler}
        />
        {cityHasError && <p className="error-text">City must not be empty</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button
          className={classes.submit}
          onClick={confirmHandler}
          disabled={!formIsValid}
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
