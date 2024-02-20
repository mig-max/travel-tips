import Carousel from "nuka-carousel";
import madridImage from '../../assets/madrid-min.jpg'
import portoImage from '../../assets/porto-min.jpg';
import copenhagenImage from '../../assets/copenhagen-min.jpg'
import romeImage from '../../assets/rome-min.jpg'
import londonImage from '../../assets/london-min.jpg'
import gijonImage from '../../assets/gijon-min.jpg'
import berlinImage from '../../assets/berlin-min.jpg'
import parisImage from '../../assets/paris-min.jpg'
import pragueImage from '../../assets/prague-min.jpg'
import warsawImage from '../../assets/warsaw-min.jpg'
import viennaImage from '../../assets/vienna-min.jpg'
import bratislavaImage from '../../assets/bratislava-min.jpg'
import amsterdamImage from '../../assets/amesterdam-min.jpg'
import bruggesImage from '../../assets/brugges-min.jpg'

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
