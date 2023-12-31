import "./Profile.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import men from "../../assets/images/men.jpg";
import women from "../../assets/images/women.png"
import none from "../../assets/images/general.svg";
import NewPlan from "../../components/NewPlan/NewPlan";
import WorkoutPlans from "../../components/WorkoutPlans/WorkoutPlans";
import ProfileModalForm from "../../components/ProfileModalForm/ProfileModalForm";
import ExerciseModal from "../../components/ExerciseModal/ExerciseModal";
import { BASE_URL } from "../../utils/api-utils";

const baseUrl = BASE_URL;
const profileUrl = `${baseUrl}/profile`;

function Profile({ isLoggedIn }) {

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [exerciseModalIsVisible, setExerciseModalIsVisible] = useState(false);

  function showExerciseModalHandler(exercise) {
    setExerciseModalIsVisible(true);
  }

  function hideExerciseModalHandler() {
    setExerciseModalIsVisible(false);
  }

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    axios
      .get(profileUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserInfo(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        navigate("/");
      });
  }, [navigate]);

  useEffect(() => {
    if (userInfo.age === null || userInfo.gender === null) {
      showExerciseModalHandler();
    }
  }, [userInfo]);

  const { name, email, age, gender } = userInfo;

  const onEditProfile = () => {
    navigate("/user-profile/edit", {
      state: {
        name: userInfo.name,
        email: userInfo.email,
        age: userInfo.age,
        gender: userInfo.gender,
      },
    });
  };

  const handleModalSubmit = ({ age, gender }) => {
    const token = sessionStorage.getItem("token");
    axios
      .put(
        profileUrl,
        { age, gender },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setExerciseModalIsVisible(false);
        setUserInfo({ ...userInfo, age, gender });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="profile">
        {exerciseModalIsVisible && (
          <ExerciseModal onClose={hideExerciseModalHandler}>
            <ProfileModalForm onSubmit={handleModalSubmit} />
          </ExerciseModal>
        )}
        <div className="profile__left">
          <div className="profile__user">
            <div className="profile__image-container">
              <img
                className="profile__picture"
                src={
                  gender === "Male" ? men : gender === "Female" ? women : none
                }
                alt={gender}
              />
            </div>
            <div className="profile__info">
              <h2 className="profile__name">{name}</h2>
              <p className="profile__email">{email}</p>
              <p className="profile__gender">{gender}</p>
              <p className="profile__age">{age} years old</p>
            </div>
          </div>
          <div className="profile__actions">
            <a className="profile__edit link" onClick={onEditProfile}>
              Edit Profile
            </a>
          </div>
        </div>
        <div className="profile__right">
          <WorkoutPlans userInfo={userInfo} />
          <NewPlan userInfo={userInfo} />
        </div>
      </div>
    );
  }
}

export default Profile;
