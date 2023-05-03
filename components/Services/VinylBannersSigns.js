import { camelize } from "lib/utils";
import { Button } from "components";

const choices = [
  {
    label: "Material",
    options: [
      { label: "13 oz. Standard", value: "13 oz. Standard" },
      { label: "18 oz. Heavy Duty", value: "18 oz. Heavy Duty" },
      {
        label: "10 oz. Wind Resistant Mesh",
        value: "10 oz. Wind Resistant Mesh",
      },
    ],
  },
  {
    label: "Single / Double Sided Printing",
    options: [
      { label: "Single Sided", value: "Single Sided" },
      { label: "Double Sided", value: "Double Sided" },
    ],
  },
  {
    label: "Hem & Grommet",
    options: [
      { label: `24" Grommets (Free)`, value: `24" Grommets (Free)` },
      { label: "No Grommets (Free)", value: "No Grommets (Free)" },
    ],
  },
];

const VinylBannersSigns = () => {
  return (
    <section>
      <div>Header Image</div>
      <div>
        <h2>Vinyl Banners & Signs</h2>
        <p>
          Need road-side signage to promote an event, sale, or business? Vinyl
          banners are some of the most eye-catching and affordable promotional
          products available. Perfect for live events, churches, school sports,
          roofers and construction companies, or your mobile business looking
          for a simple and effective curbside display. Check out the pricing
          calculator to see how affordable old-school advertising can be for
          you!
        </p>
        <div>Image 1</div>
        <div>Image 2</div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("you clicked banner form");
        }}
      >
        <input type="hidden" name="__title" value="bannerAndSigns" />
        <input name="__title" type="hidden" value="services" />
        <input name="serviceName" type="hidden" value="Vinyl Banners & Signs" />
        <div>
          <label htmlFor="banner_width">Size:</label>
          <div>
            <input
              id="banner_width"
              name="width"
              type="number"
              step="0.05"
              placeholder="Width (in.)"
            />
            x
            <input
              id="banner_height"
              name="height"
              type="number"
              step="0.05"
              placeholder="Height (in.)"
            />
          </div>
        </div>
        {choices.map(({ label, options }) => {
          const id = `banner_${camelize(label)}`;

          return (
            <div key={label}>
              <label>{label}</label>
              {options.map(({ label: optLabel, value }) => {
                const optId = `${id}_${camelize(label)}`;
                return (
                  <div key={optId}>
                    <input type="radio" name={label} value={value} id={optId} />
                    <label htmlFor={optId}>{optLabel}</label>
                  </div>
                );
              })}
            </div>
          );
        })}
        <hr />
        <div>
          <h4>$0.00 each</h4>
        </div>
        <hr />
        <div>
          <h3>Ready to order?</h3>
          <div>
            <label htmlFor="banner_name">Name:</label>
            <input
              type="text"
              id="banner_name"
              name="name"
              placeholder="Chuck Sterling"
            />
          </div>
          <div>
            <label htmlFor="banner_email">Email:</label>
            <input
              type="email"
              id="banner_name"
              name="name"
              placeholder="you@goodplace.com"
            />
          </div>
          <div>
            <label htmlForm="banner_logo">Attach Logo</label>
            <input type="file" id="banner_logo" name="attachments" />
          </div>
          <Button type="submit">Get Started</Button>
        </div>
      </form>
    </section>
  );
};

export default VinylBannersSigns;
