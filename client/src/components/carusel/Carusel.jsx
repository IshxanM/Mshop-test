import Carousel from "react-bootstrap/Carousel";
import Image1 from "../../assets/img/banner/image1.jpg";
import Image2 from "../../assets/img/banner/img2.jpg";
import Image3 from "../../assets/img/banner/headerha.webp";
import "./carusel.css";
const Carusel = () => {
  return (
    <Carousel className="carusel__body">
      <Carousel.Item className="carusel__item" interval={1000}>
        <img className="carusel__img" src={Image1} alt="" />
      </Carousel.Item>
      <Carousel.Item className="carusel__item" interval={500}>
        <img className="carusel__img" src={Image2} alt="" />
      </Carousel.Item>
      <Carousel.Item className="carusel__item">
        <img className="carusel__img" src={Image3} alt="" />
      </Carousel.Item>
    </Carousel>
  );
};

export default Carusel;
