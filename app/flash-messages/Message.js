"use client";

import { useEffect, useRef } from "react";

import styles from "./Message.module.css";

import { Button } from "components";

const Message = ({ type, message }) => {
  const messageRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      messageRef.current.remove();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={styles.flash}
      style={{ "--accentColor": `var(--${type})` }}
      ref={messageRef}
    >
      <span>{message}</span>
      <Button onClick={(event) => event.target.parentElement.remove()}>
        Remove
      </Button>
    </div>
  );
};

export default Message;
