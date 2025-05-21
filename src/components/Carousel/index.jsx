import React, { useState, useRef } from "react";
import Arrow from "../../assets/forward_arrow.svg";

function Carousel({ slides }) {
  const length = slides.length;

  // Création d'un tableau d'images ou on ajoute la dernière image au début et la première à la fin
  // pour permettre de faire défiler les images en boucle
  const extendedSlides = [slides[length - 1], ...slides, slides[0]];

  // On commence à l'index 1 (première vraie image)
  const [currentSlide, setCurrentSlide] = useState(1);
  // Vérifie si une transition CSS est en cours
  const [transition, setTransition] = useState(false);
  // Référence pour le conteneur des images
  const containerRef = useRef(null);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setTransition(true);
  };

  const previousSlide = () => !transition && goToSlide(currentSlide - 1);
  const nextSlide = () => !transition && goToSlide(currentSlide + 1);

  // Quand la transition se termine, on saute sans animation sur la vraie première / dernière image
  const endTransition = () => {
    setTransition(false);
    // Si on est sur la slide dupliquée au début, On saute à la vraie dernière slide
    if (currentSlide === 0) {
      setCurrentSlide(length);
      containerRef.current.style.transition = "none";
      containerRef.current.style.transform = `translateX(${-length * 100}%)`;
      setTimeout(() => {
        containerRef.current.style.transition = "";
      }, 20);
      // Si on est sur la slide dupliquée à la fin, On saute à la vraie première slide
    } else if (currentSlide === length + 1) {
      setCurrentSlide(1);
      containerRef.current.style.transition = "none";
      containerRef.current.style.transform = `translateX(-100%)`;
      setTimeout(() => {
        containerRef.current.style.transition = "";
      }, 20);
    }
  };

  // Met à jour le style à chaque changement de slide pour déplacer le conteneur et applique une transition
  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(${
        -currentSlide * 100
      }%)`;
      if (transition) {
        containerRef.current.style.transition = "transform 0.5s";
      }
    }
  }, [currentSlide, transition]);

  return (
    <div className="carousel">
      <div
        className="carousel__container"
        ref={containerRef}
        onTransitionEnd={endTransition}
        style={{
          width: `${extendedSlides.length * 100}%`,
          display: "flex",
        }}
      >
        {/* On affiche chaque image dans une balise img */}
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
      {/* Si il y a plus d'une image, on affiche les flèches */}
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
