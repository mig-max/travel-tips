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

import { useNavigate } from "react-router-dom";



import './ImageCarousel.css';
import "@fontsource/poppins";



function ImageCarousel() {

    const navigate = useNavigate();
  return (

    <div className="nuka-carousel">

      <Carousel className="nuka" speed={1000} heightMode={"max"} height={300} autoplay={true} autoplayInterval={3000} dragging={"true"} wrapAround={"true"} pauseOnHover={"false"} >

        <img src={madridImage} alt="Madrid" onClick={() => navigate("/destinations/1")} />   
        <img src={portoImage} alt="Porto" onClick={() => navigate("/destinations/2")} />
        <img src={copenhagenImage} alt="Copenhagen" onClick={() => navigate("/destinations/3")} />
        <img src={romeImage} alt="Rome" onClick={() => navigate("/destinations/4")} />
        <img src={londonImage} alt="London" onClick={() => navigate("/destinations/5")} />
        <img src={gijonImage} alt="Gijon" onClick={() => navigate("/destinations/6")} />
        <img src={berlinImage} alt="Berlin"onClick={() => navigate("/destinations/7")} />
        <img src={parisImage} alt="Paris" onClick={() => navigate("/destinations/8")} />
        <img src={pragueImage} alt="Prague" onClick={() => navigate("/destinations/9")} />
        <img src={warsawImage} alt="Warsaw" onClick={() => navigate("/destinations/10")} />
        <img src={viennaImage} alt="Vienna" onClick={() => navigate("/destinations/11")} />
        <img src={bratislavaImage} alt="Bratislava" onClick={() => navigate("/destinations/12")} />
        <img src={amsterdamImage} alt="Amsterdam" onClick={() => navigate("/destinations/13")} />
        <img src={bruggesImage} alt="Brugges" onClick={() => navigate("/destinations/14")} />
        
      </Carousel>
    </div>
  );
}

export default ImageCarousel;
