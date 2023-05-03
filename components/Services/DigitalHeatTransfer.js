import { Button, LinkButton } from "components";

const DigitalHeatTransfer = () => {
  return (
    <section>
      <div>Header Image</div>
      <div>
        <h2>Digital Heat Transfer</h2>
        <p>
          Don't let the limitations of traditional screen printing stop you from
          making your vision a reality! Our digital heat transfer decoration
          method allows us to print virtually any garment in any number of
          colors. Great for names and numbers on sports jerseys, full color face
          mask printing, or getting intricate details on textured garments (like
          tote bags or nylon jackets),{" "}
          <strong>if we can't print it, we can 'press' it!</strong>
        </p>
        <LinkButton href="#">Call Now to Learn More</LinkButton>
        <div>Image 1</div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert(`clicked ${e.targer.innerHTML}`);
        }}
      >
        <header>
          <div>Image</div>
          <h3>Get Your Free Digital Proof!</h3>
        </header>
        <strong>Curious about the final product?</strong>
        <p>
          Just upload your logo, drawing, or finished design and a Lab Seven
          artist will be in touch with a complimentary digital proof!
        </p>
        <input name="__title" type="hidden" value="services" />
        <input name="serviceName" type="hidden" value="Digital Heat Transfer" />
        {[
          { name: "name", label: "Name", type: "text" },
          { name: "email", label: "Email", type: "email" },
          {},
        ].map(({ name, label, type }) => {
          const id = `digitalHeatTransfer__${name}`;
          return (
            <div key={id}>
              <label htmlFor={id}>{label}</label>
              <input id={id} name={name} type={type} />
            </div>
          );
        })}
        <div>
          <label htmlFor="digitalHeatTransfer__file">Attach Logo</label>
          <input id="digitalHeatTransfer__file" name="file" type="file" />
        </div>
        <Button type="submit">Upload Your Logo!</Button>
      </form>
    </section>
  );
};

export default DigitalHeatTransfer;
