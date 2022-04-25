import { useContext, useEffect, useState } from "react";

import CardContext from "../../context/cart-context";
import CartIcon from "../cart/CartIcon";

import styles from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);
  const ctx = useContext(CardContext);
  const { items } = ctx;

  const numberOfItems = items.reduce(
    (currentNumber, item) => currentNumber + item.amount,
    0
  );

  const btnClasses = `${styles.button} ${
    buttonIsHighlighted ? styles.bump : ""
  }`;

  useEffect(() => {
    if (items.length === 0) return;
    setButtonIsHighlighted(true);

    const timeout = setTimeout(() => {
      setButtonIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfItems}</span>
    </button>
  );
};

export default HeaderCartButton;
