import styles from "./NewsletterForm.module.css";
import { Button } from ".";

const NewsletterForm = ({ className = "" }) => {
  return (
    <form
      className={`${styles.className} ${styles.NewsletterForm}`}
      onSubmit={(event) => {
        event.preventDefault();
        alert("Newsletter signup!");
      }}
    >
      <div className={styles.inputWrapper}>
        <label htmlFor="newsletter_email">Email</label>
        <input type="email" name="email" id="newsletter_email" />
      </div>
      <Button type="submit">Sign Up!</Button>
    </form>
  );
};

export default NewsletterForm;
