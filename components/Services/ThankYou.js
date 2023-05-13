import { Button } from "/components";

const ThankYou = () => {
  return (
    <>
      <h4>Awesome!</h4>
      <p>
        Our sales team will reach out to discuss your project. Thank you for
        giving us the opportunity to earn your business!
      </p>
      <p>
        <strong>We are excited to work with you!</strong>
      </p>
      <br />
      <p>Still have questions or just can't wait?</p>
      <Button
        className="ButtonAlternate"
        onClick={() => alert("tell guy and get this button to work")}
      >
        Call Now
      </Button>
    </>
  );
};

export default ThankYou;
