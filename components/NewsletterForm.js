import * as React from "react";
import styles from "./NewsletterForm.module.css";
import { Button } from ".";
import { serializeForm } from "../lib/utils";

const NewsletterForm = ({ className = "" }) => {
  const [formState, setFormState] = React.useState("idle");

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
        onSubmit={async (event) => {
          event.preventDefault();

          setFormState("submitting");
          try {
            const response = await fetch("/api/forms", {
              method: "POST",
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
              body: JSON.stringify(serializeForm(event.target)),
            });

            if (response.ok) {
              setFormState("submitted");
            } else {
              console.warn(response);
              throw new Error("submit error");
            }
          } catch (_e) {
            setFormState("error");
          }
        }}
      >
        <input type="hidden" name="title" value="newsletter" />
        <div className={styles.inputWrapper}>
          <label htmlFor="newsletter_email">Email</label>
          <input
            id="newsletter_email"
            name="email"
            type="email"
            required="true"
          />
        </div>
        <Button type="submit" isSubmitting={formState == "isSubmitting"}>
          Sign Up!
        </Button>
        {formState === "error" && (
          <p>
            Oh no! An error has occurred. If this problem continues, please let
            our team know.
          </p>
        )}
      </form>
    </>
  );
};

export default NewsletterForm;
