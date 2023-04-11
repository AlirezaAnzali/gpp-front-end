import pic404 from "../../assets/images/404.png";
import "./NotFound.scss";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container">
      <div className="not-found">
        <img className="not-found__image" src={pic404} alt="404 not found" />
        <p className="not-found__text">
          We're sorry, but the page you requested could not be found.
        </p>
        <p className="not-found__text">Please check the URL and try again.</p>
        <Link to="/">
          <button className="not-found__button">
            GO BACK TO THE HOME PAGE
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
