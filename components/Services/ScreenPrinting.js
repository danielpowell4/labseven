import { Button } from "/components";

const ScreenPrinting = () => {
  return (
    <section>
      <div>
        <div>Header Image</div>
        <div>
          <h2>Screen Printing</h2>
          <p>
            {`Serving Denver and beyond since 2006, Lab Seven offers fresh takes on
        traditional screen printing methods. We're up to speed on current
        print-industry trends, and only use top of the line equipment and
        materials in our Englewood, Colorado production headquarters. We're
        constantly improving our formulas to offer bright, soft, and stunning
        prints that you'll be as excited to share as we are to print! Stop
        buying cheap throwaway gear, and print shirts you'll actually want to
        wear.`}
          </p>
          <p>
            {`We currently offer both plastisol and water-based printing, and will be
        re-introducing discharge screen-printing Summer of 2021.`}
          </p>
          <Button>Get a Quote</Button>
          <Button>Call Now (Outline)</Button>
        </div>
        <div>
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
            <input name="serviceName" type="hidden" value="Screen Printing" />
            {[
              { name: "name", label: "Name", type: "text" },
              { name: "email", label: "Email", type: "email" },
              {},
            ].map(({ name, label, type }) => {
              const id = `screenPrinting__${name}`;
              return (
                <div key={id}>
                  <label htmlFor={id}>{label}</label>
                  <input id={id} name={name} type={type} />
                </div>
              );
            })}
            <div>
              <label htmlFor="screenPrinting__file">Attach Logo</label>
              <input id="screenPrinting__file" name="file" type="file" />
            </div>
            <Button type="submit">Upload Your Logo!</Button>
          </form>
        </div>
      </div>
      <div>
        <div>Image 2</div>
        <div>Image 3</div>
        <div>Image 4</div>
      </div>
    </section>
  );
};

export default ScreenPrinting;
