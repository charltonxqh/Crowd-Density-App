/**
 * @fileoverview AboutUsBottomImage component renders the bottom image section of the About Us page.
 * Displays a background image of the MRT Bridge.
 * @author Meagan Eng Pei Ying, Choo Yi Ken
 */

import "../AboutUsUI/AboutUs.css";

/**
 * AboutUsBottomImage component that displays the bottom section of the About Us page with an image.
 *
 * @component
 */
const AboutUsBottomImage = () => {
  return (
    <section className="image-section">
      <img
        src="/images/how-many-days-in-singapore.jpg"
        alt="MRT Bridge"
        className="bg-image"
      />
    </section>
  );
};

export default AboutUsBottomImage;
