import "./Header.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BASE_URL } from "../../utils/api-utils";

const baseUrl = BASE_URL;
const logoutUrl = `${baseUrl}/logout`;

const Header = ({ handleSignInClick, isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const onSignOut = () => {
    const token = sessionStorage.getItem("token");
    axios
      .post(
        logoutUrl,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        // Remove the token from session storage
        sessionStorage.removeItem("token");
        // Redirect the user to the login page
        toast.success("You signed out successfully!", {
          style: {
            borderRadius: "10px",
            background: "#4b4b4b",
            color: "#E5E5E5",
          },
        });
        setIsLoggedIn(false);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <header className="header">
      <Link to={"/"} className="header__logo__link">
        <div className="header__logo-container">
          <img src={logo} alt="Logo" className="header__logo" />
          <h1 className="header__app-name">GymPlanPro</h1>
        </div>
      </Link>
      <div className="header__right">
        {isLoggedIn ? (
          <>
            <Link
              to={
                window.location.pathname === "/user-profile"
                  ? "/"
                  : "/user-profile"
              }
              className="header__link link"
            >
              {window.location.pathname === "/user-profile"
                ? "Home"
                : "My Profile"}
            </Link>
            <button className="header__sign-out-button btn" onClick={onSignOut}>
              Sign Out
            </button>
          </>
        ) : (
          <button
            onClick={handleSignInClick}
            className="header__sign-up-button btn"
          >
            Sign up / Sign in
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
