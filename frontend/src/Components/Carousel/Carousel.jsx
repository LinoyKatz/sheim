import Carousel from "react-bootstrap/Carousel";

import "./carousel.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ClothesPink from "../../media/clothes-pinkBGC.png";
import ProductsWhite from "../../media/products-whiteBGC.png";
import Lingerie from "../../media/lingerie.png";

function IndividualIntervalsExample() {
  return (
    <div className="caroosela">
      <Carousel>
        <Carousel.Item interval={1000}>
          <img className="d-block w-100" src={ClothesPink} alt="First slide" />
          <Carousel.Caption>
            <p className="head-carousel">50% OFF for members!</p>
            <p>all women products</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            className="d-block w-100"
            src={ProductsWhite}
            alt="Second slide"
          />
          <Carousel.Caption>
            <p className="head-carousel">New and special designs!</p>
            <p>buy now!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={Lingerie} alt="Third slide" />
          <Carousel.Caption>
            <p className="head-carousel3">60% OFF for members</p>
            <p className="p-carousel3">Lingerie</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default IndividualIntervalsExample;
