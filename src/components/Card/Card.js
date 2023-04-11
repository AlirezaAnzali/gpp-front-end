import "./Card.scss";

const Card = ({ item }) => {
  const { image, title, text } = item;
  return (
    <div className="card">
      <div className="card__container">
        <img className="card__img" src={image} alt={`${title} icon`} />
      </div>
      <div className="card__first">
        <h3 className="card__title">{title}</h3>
        <p className="card__text">{text}</p>
      </div>
    </div>
  );
};

export default Card;
