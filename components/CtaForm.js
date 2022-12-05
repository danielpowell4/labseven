import styles from "./CtaForm.module.css";
import { Button } from ".";

const CtaForm = () => {
  return (
    <form
      className={styles.CtaForm}
      onSubmit={(event) => {
        event.preventDefault();
        alert("Form submitted!");
      }}
    >
      {[
        { type: "text", name: "full_name", label: "Full Name" },
        { type: "email", name: "email", label: "Email" },
        {
          type: "tel",
          name: "phone_number",
          label: "Phone Number",
          styles: { flexBasis: "auto" },
        },
        {
          type: "text",
          name: "zip_code",
          label: "Zip Code",
          styles: { flexBasis: 160 },
        },
        {
          type: "text",
          name: "organization",
          label: "Company / Organization",
        },
      ].map((field) => {
        return (
          <div
            key={field.name}
            className={styles.inputWrapper}
            style={field.styles}
          >
            <label htmlFor={field.id}>{field.label}</label>
            <input type={field.type} name={field.name} id={field.id} />
          </div>
        );
      })}
      <div className={styles.CtaForm__actions}>
        <Button type={"submit"}>Schedule a Call!</Button>
      </div>
    </form>
  );
};

export default CtaForm;
