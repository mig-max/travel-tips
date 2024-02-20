import Carousel from "nuka-carousel";
import madridImage from "../../assets/madrid.jpg";
import portoImage from "../../assets/porto.jpg";
import copenhagenImage from "../../assets/copenhagen.jpg";
import romeImage from "../../assets/rome.jpg";
import londonImage from "../../assets/london.jpg";
import gijonImage from "../../assets/gijon.jpg";
import berlinImage from "../../assets/berlin.jpg";
import parisImage from "../../assets/paris.jpg";
import pragueImage from "../../assets/prague.jpg";
import warsawImage from "../../assets/warsaw.jpg";
import viennaImage from "../../assets/vienna.jpg";
import bratislavaImage from "../../assets/bratislava.jpg";
import amsterdamImage from "../../assets/amsterdam.jpg";
import bruggesImage from "../../assets/brugges.jpg";

function ImageCarousel() {
  return (
    <div className="nuka-carousel">
      <Carousel autoplay={true} autoplayInterval={6000}>
        <img src={madridImage} alt="Madrid" />
        <img src={portoImage} alt="Porto" />
        <img src={copenhagenImage} alt="Copenhagen" />
        <img src={romeImage} alt="Rome" />
        <img src={londonImage} alt="London" />
        <img src={gijonImage} alt="Gijon" />
        <img src={berlinImage} alt="Berlin" />
        <img src={parisImage} alt="Paris" />
        <img src={pragueImage} alt="Prague" />
        <img src={warsawImage} alt="Warsaw" />
        <img src={viennaImage} alt="Vienna" />
        <img src={bratislavaImage} alt="Bratislava" />
        <img src={amsterdamImage} alt="Amsterdam" />
        <img src={bruggesImage} alt="Brugges" />
      </Carousel>
    </div>
  );
}

export default ImageCarousel;
