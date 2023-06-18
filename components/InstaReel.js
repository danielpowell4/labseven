import Image from "next/image";
import styles from "./InstaReel.module.css";

import boon from "public/assets/Instagram/boon.png";
import breckenridgeOpeningDay from "public/assets/Instagram/breckenridge-opening-day.png";
import chosenHoodie from "public/assets/Instagram/chosen-hoodie.png";
import coconutsBarAndGrill from "public/assets/Instagram/coconuts-bar-and-grill.png";
import compassDragon from "public/assets/Instagram/compas-dragon.png";
import deadHippieBrewing from "public/assets/Instagram/dead-hippie-brewing.png";
import denverBroncos from "public/assets/Instagram/denver-broncos.png";
import denverNuggets from "public/assets/Instagram/denver-nuggets.png";
import hippieBus from "public/assets/Instagram/hippie-bus.png";
import hokeyPokeyRanchCo from "public/assets/Instagram/hokey-pokey-ranch-co.png";
import intricateDesign from "public/assets/Instagram/intricate-design.png";
import loveLifeDesign from "public/assets/Instagram/love-life-design.png";
import marsRobot from "public/assets/Instagram/mars-robot.png";
import monkeyDragon from "public/assets/Instagram/monkey-dragon.png";
import neonHamburger from "public/assets/Instagram/neon-hamburger.png";
import spiceTradeBrewing from "public/assets/Instagram/spice-trade-brewing.png";
import stuggartAutoBodyShop from "public/assets/Instagram/stuggart-auto-body-shop.png";
import tieDyeAntlers from "public/assets/Instagram/tie-dye-antlers.png";
import westernHeritage from "public/assets/Instagram/western-heritage.png";

const imageCollection = [
  { src: loveLifeDesign, alt: "Love Life Design" },
  { src: deadHippieBrewing, alt: "Dead Hippie Brewing" },
  { src: neonHamburger, alt: "Neon Hamburger" },
  { src: coconutsBarAndGrill, alt: "Coconuts Bar And Grill" },
  { src: hokeyPokeyRanchCo, alt: "Hokey Pokey Ranch Co" },
  { src: tieDyeAntlers, alt: "Tie Dye Antlers" },
  { src: chosenHoodie, alt: "Chosen Hoodie" },
  { src: westernHeritage, alt: "Western Heritage" },
  { src: compassDragon, alt: "Compass Dragon" },
  { src: monkeyDragon, alt: "Monkey Dragon" },
  { src: denverNuggets, alt: "Denver Nuggets" },
  { src: hippieBus, alt: "Hippie Bus" },
  { src: boon, alt: "boon" },
  { src: spiceTradeBrewing, alt: "Spice Trade Brewing" },
  { src: marsRobot, alt: "Mars Robot" },
  { src: breckenridgeOpeningDay, alt: "Breckenridge Opening Day" },
  { src: denverBroncos, alt: "Denver Broncos" },
  { src: stuggartAutoBodyShop, alt: "Stuggart Auto Body Shop" },
  { src: intricateDesign, alt: "Intricate Design" },
];

const InstaReel = ({ className = "" }) => {
  return (
    <div className={`${className} ${styles.InstaReel}`}>
      {imageCollection.map(({ src, alt }) => (
        <div key={alt} className={styles.InstaReel__item}>
          <Image src={src} alt={alt} />
        </div>
      ))}
    </div>
  );
};

export default InstaReel;
