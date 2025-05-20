import React, { useState, useRef } from "react";
import Arrow from "../../assets/forward_arrow.svg";

function Carousel({ slides }) {
  const length = slides.length;

  // On duplique la dernière image au début et la première à la fin
  const extendedSlides = [slides[length - 1], ...slides, slides[0]];

  // On commence à l'index 1 (première vraie image)
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsTransitioning(true);
  };

  const previousSlide = () => !isTransitioning && goToSlide(currentSlide - 1);
  const nextSlide = () => !isTransitioning && goToSlide(currentSlide + 1);

  // Quand la transition se termine, on saute sans animation si on est sur une image dupliquée
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentSlide === 0) {
      setCurrentSlide(length);
      containerRef.current.style.transition = "none";
      containerRef.current.style.transform = `translateX(${-length * 100}%)`;
      // Force le repaint pour réactiver la transition
      setTimeout(() => {
        containerRef.current.style.transition = "";
      }, 20);
    } else if (currentSlide === length + 1) {
      setCurrentSlide(1);
      containerRef.current.style.transition = "none";
      containerRef.current.style.transform = `translateX(-100%)`;
      setTimeout(() => {
        containerRef.current.style.transition = "";
      }, 20);
    }
  };

  // Met à jour le style à chaque changement de slide
  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(${
        -currentSlide * 100
      }%)`;
      if (isTransitioning) {
        containerRef.current.style.transition = "transform 0.5s";
      }
    }
  }, [currentSlide, isTransitioning]);

  return (
    <div className="carousel">
      <div
        className="carousel__container"
        ref={containerRef}
        onTransitionEnd={handleTransitionEnd}
        style={{
          width: `${extendedSlides.length * 100}%`,
          display: "flex",
        }}
      >
        {extendedSlides.map((slide, index) => (
          <img
            className="carousel__container--pictures"
            key={index}
            src={slide}
            alt=""
            style={{ width: `${100 / extendedSlides.length}%`, flexShrink: 0 }}
          />
        ))}
      </div>
      {length > 1 && (
        <div className="carousel__arrows">
          <button className="carousel__arrows--buttons" onClick={previousSlide}>
            <img
              className="arrow arrow--backward"
              src={Arrow}
              alt="Précédent"
            />
          </button>
          <p className="carousel__arrows--number">
            {((currentSlide - 1 + length) % length) + 1}/{length}
          </p>
          <button className="carousel__arrows--buttons" onClick={nextSlide}>
            <img className="arrow" src={Arrow} alt="Suivant" />
          </button>
        </div>
      )}
    </div>
  );
}

export default Carousel;
