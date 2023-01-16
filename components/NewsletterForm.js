import * as React from "react";
import styles from "./NewsletterForm.module.css";
import { Button } from ".";
import { useSubmit } from "../lib/customHooks";

const NewsletterForm = ({ className = "" }) => {
  const [formState, onSubmit] = useSubmit();

  if (formState === "submitted") {
    return (
      <p>{`Thank you! Get ready to wow your customers with quality apparel and promotional products!`}</p>
    );
  }

  return (
    <>
      <p>
        Get exclusive design tips, product announcements, and seasonal
        promotions.
      </p>
      <form
        className={`${styles.className} ${styles.NewsletterForm}`}
        onSubmit={onSubmit}
      >
        <input type="hidden" name="__title" value="newsletter" />
        <div className={styles.inputWrapper}>
          <label htmlFor="newsletter_email">Email</label>
          <input
            id="newsletter_email"
            name="email"
            type="email"
            required="true"
          />
        </div>
        <Button type="submit" isSubmitting={formState === "submitting"}>
          Sign Up!
        </Button>
        {formState === "error" && (
          <p style={{ color: "var(--danger)" }}>
            Oh no! An error occurred. If this problem continues please let our
            team know.
          </p>
        )}
      </form>
    </>
  );
};

export default NewsletterForm;
