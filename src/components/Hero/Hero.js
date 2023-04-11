import { useState, useEffect } from "react";
import "./Hero.scss";
import pic1 from "../../assets/images/pic1.jpg";
import pic2 from "../../assets/images/pic2.jpg";
import pic3 from "../../assets/images/pic3.jpg";

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [timer, setTimer] = useState(null);

  const images = [
    {
      src: pic1,
      title: "Unleash Your Inner Athlete",
      text: "Sculpt Your Dream Body with Our Revolutionary Fitness Programs",
    },
    {
      src: pic2,
      title: "Transform your body",
      text: "Achieve your fitness goals with us",
    },
    {
      src: pic3,
      title: "Sign up and join us today",
      text: "Crush Your Fitness Goals and Transform Your Body with Our Expert Guidance",
    },
  ];

  useEffect(() => {
    setTimer(
      setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000)
    );

    // Clean up the timer when the component unmounts
    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleDotClick = (i) => {
    setIndex(i);
    clearInterval(timer);
  };

  return (
    <div className="Hero">
      {images.map((image, i) => (
        <div
          key={i}
          className={`Hero__image ${i === index ? "Hero__image--active" : ""}`}
          style={{ backgroundImage: `url(${image.src})` }} // add url() function
        >
          <div className="Hero__content">
            <h1 className="Hero__title">{image.title}</h1>
            <p className="Hero__text">{image.text}</p>
          </div>
        </div>
      ))}
      <div className="Hero__dots">
        {images.map((image, i) => (
          <div
            key={i}
            className={`Hero__dot ${i === index ? "Hero__dot--active" : ""}`}
            onClick={() => handleDotClick(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
