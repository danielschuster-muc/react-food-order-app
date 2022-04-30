import { useContext, useState } from "react";

import CartContext from "../../context/cart-context";

import Modal from "../ui/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

import useHttp from "../../hooks/use-http";

import styles from "./Cart.module.css";
const Cart = (props) => {
  const ctx = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);

  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;

  const addItemHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  const removeItemHandler = (id) => {
    ctx.removeItem(id);
  };

  const cardItems = (
    <ul className={styles["cart-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAdd={addItemHandler.bind(null, item)}
          onRemove={removeItemHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const orderHandler = () => {
    setShowCheckout((prevState) => !prevState);
  };

  const modalActions = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {ctx.items.length > 0 && (
        <button className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const [didSubmit, setDidSubmit] = useState(false);
  const { isSubmitting, error, sendRequest: sendOrderRequest } = useHttp();

  const createOrder = () => {
    ctx.clearCart();
  };

  const submitOrderHandler = async (userData) => {
    sendOrderRequest(
      {
        url: process.env.REACT_APP_FIREBASE_URL + "orders.json",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { user: userData, orderedItems: ctx.items },
      },
      createOrder.bind(null, userData)
    );
    setDidSubmit(true);
  };

  const cartModelContent = (
    <>
      {cardItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showCheckout && (
        <Checkout onCancel={props.onClose} onSubmitOrder={submitOrderHandler} />
      )}
      {!showCheckout && modalActions}
    </>
  );

  const closeBtn = (
    <div className={styles.actions}>
      <button className={styles.button} onClick={props.onClose}>
        Close
      </button>
    </div>
  );
  const errorModalContent = (
    <>
      <p>{error}</p>
      {closeBtn}
    </>
  );
  const isSubmittingModalContent = (
    <>
      <p>Sending order data...</p>
      {closeBtn}
    </>
  );

  const didSubmitModalContent = (
    <>
      <p>Successfully sent the order!</p>
      {closeBtn}
    </>
  );

  return (
    <Modal onClose={props.onClose}>
      {error && errorModalContent}
      {!error && isSubmitting && isSubmittingModalContent}
      {!error && !isSubmitting && !didSubmit && cartModelContent}
      {!error && !isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
