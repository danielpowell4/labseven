import { Button } from "components";

const StickersDecals = () => {
  return (
    <section>
      <div>Header Image</div>
      <div>
        <h2>Stickers & Decals</h2>
        <p>
          Who doesn't love stickers? Lab Seven is proud to offer full color
          (glossy or matte) die cut vinyl stickers, decals, and transfers.
          <strong>Die-cut stickers can be cut in any shape you'd like</strong>,
          and offer a fun and affordable way to raise brand awareness!
        </p>
        <p>
          We currently offer both <strong>die cut stickers</strong> (great for
          water bottles and laptops) and <strong>vinyl transfer decals</strong>{" "}
          (great for windows or company vehicles and work truck decals).
        </p>
        <div>Long Image 1</div>
        <div>Long Image 2</div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("you clicked sticker form");
        }}
      >
        <input name="__title" type="hidden" value="services" />
        <input name="serviceName" type="hidden" value="Stickers & Decals" />
        <div>
          <label htmlFor="sticker_width">Size:</label>
          <div>
            <input
              id="sticker_width"
              name="width"
              type="number"
              step="0.05"
              placeholder="Width (in.)"
            />
            x
            <input
              id="sticker_height"
              name="height"
              type="number"
              step="0.05"
              placeholder="Height (in.)"
            />
          </div>
        </div>
        <div>
          <label htmlFor="sticker_quantity">Quantity:</label>
          <input
            id="sticker_quantity"
            name="quantity"
            type="number"
            step="1"
            min="50"
            placeholder="(50 Ct Minimum)"
          />
        </div>
        <hr />
        <div>
          <h4>$0.00 each</h4>
          <h4>$0.00 total</h4>
        </div>
        <hr />
        <div>
          <h3>Ready to order?</h3>
          <div>
            <label htmlFor="sticker_name">Name:</label>
            <input
              type="text"
              id="sticker_name"
              name="name"
              placeholder="Chuck Sterling"
            />
          </div>
          <div>
            <label htmlFor="sticker_email">Email:</label>
            <input
              type="email"
              id="sticker_name"
              name="name"
              placeholder="you@goodplace.com"
            />
          </div>
          <div>
            <label htmlForm="sticker_logo">Attach Logo</label>
            <input type="file" id="sticker_logo" name="attachments" />
          </div>
          <Button type="submit">Get Started</Button>
        </div>
      </form>
    </section>
  );
};

export default StickersDecals;
