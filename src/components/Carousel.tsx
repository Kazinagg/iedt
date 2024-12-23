import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from './Carousel.module.css';


const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};


const images = [
    "/src/assets/00566896_1.jpg",
    "/src/assets/00566896_1.jpg",
    "/src/assets/00566896_1.jpg",
    "/src/assets/00566896_1.jpg",
    "/src/assets/00566896_1.jpg"
];

const CarouselComponent = () => {

  return (
      <Carousel
          responsive={responsive}
          className={styles.carousel}
          itemClass={styles.carouselItem}
      >
          {images.map((image, index) => (
              <div key={index} className={styles.imageContainer}>
                  <img src={image} alt={`Carousel Item ${index}`} className={styles.image}/>
              </div>
          ))}
      </Carousel>
  )

}


export default CarouselComponent;