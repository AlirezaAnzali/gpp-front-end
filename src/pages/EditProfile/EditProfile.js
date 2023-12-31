import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./EditProfile.scss"
import { BASE_URL } from "../../utils/api-utils";

const baseUrl = BASE_URL;
const profileUrl = `${baseUrl}/profile`;

function EditProfile() {

  const navigate = useNavigate();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState({
    name: location.state.name,
    email: location.state.email,
    age: location.state.age,
    gender: location.state.gender,
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmNewPasswordChange = (event) => {
    setConfirmNewPassword(event.target.value);
  };

  const handleEditNameChange = (event) => {
    setUserInfo((prevState) => ({
      ...prevState,
      name: event.target.value,
    }));
  };

  const handleEditAgeChange = (event) => {
    setUserInfo((prevState) => ({
      ...prevState,
      age: event.target.value,
    }));
  };

  const handleEditGenderChange = (event) => {
    setUserInfo((prevState) => ({
      ...prevState,
      gender: event.target.value,
    }));
  };

  const handlePasswordLinkClick = (event) => {
    event.preventDefault();
    setIsChangingPassword(!isChangingPassword);
  };

  const validatePassword = () => {
    if (newPassword !== confirmNewPassword) {
      toast.error("New password and confirm new password do not match", {
        style: {
          borderRadius: "10px",
          background: "#4b4b4b",
          color: "#E5E5E5",
        },
      });
      return false;
    }
    if (
      newPassword.length < 6 ||
      !/\d/.test(newPassword) ||
      !/[a-zA-Z]/.test(newPassword)
    ) {
      toast.error(
        "New password must be at least 6 characters long and contain both letters and numbers",
        {
          style: {
            borderRadius: "10px",
            background: "#4b4b4b",
            color: "#E5E5E5",
          },
        }
      );
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = sessionStorage.getItem("token");
    let requestBody = { ...userInfo, currentPassword };
    if (
      newPassword &&
      confirmNewPassword
    ) {
      if (!validatePassword()) {
        return;
      }
      requestBody = { ...requestBody, newPassword };
    }
    axios
      .put(profileUrl, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        navigate("/user-profile");
        toast.success("Your information edited successfully!", {
          style: {
            borderRadius: "10px",
            background: "#4b4b4b",
            color: "#E5E5E5",
          },
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          // Handle authentication error
          toast.error("Incorrect current password", {
            style: {
              borderRadius: "10px",
              background: "#4b4b4b",
              color: "#E5E5E5",
            },
          });
        } else {
          // Handle other errors
          console.error(error);
          toast.error("An error occurred", {
            style: {
              borderRadius: "10px",
              background: "#4b4b4b",
              color: "#E5E5E5",
            },
          });
        }
      });
  };

  return (
    <div className="edit-profile-page">
      <h1 className="edit-profile-page__title">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="edit-profile-page__form">
        <div className="edit-profile-page__top">
          <label className="edit-profile-page__label">
            Name:
            <input
              type="text"
              value={userInfo.name}
              onChange={handleEditNameChange}
              required
              pattern="[A-Za-z\s\-]+"
              title="Name should only contain letters, spaces, and hyphens"
              className="edit-profile-page__input"
            />
          </label>
          <label className="edit-profile-page__label">
            Age:
            <input
              type="number"
              value={userInfo.age}
              onChange={handleEditAgeChange}
              required
              min="18"
              max="100"
              className="edit-profile-page__input"
            />
          </label>
          <label className="edit-profile-page__label">
            Gender:
            <select
              value={userInfo.gender}
              onChange={handleEditGenderChange}
              required
              className="edit-profile-page__select"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <br />
          <br />
        </div>
        <div className="edit-profile-page__password">
          <button className="link" onClick={handlePasswordLinkClick}>
            Change Password
          </button>
          <br />
          <br />
          {isChangingPassword && (
            <div className="edit-profile-page__password-fields">
              <label className="edit-profile-page__label">
                Current Password:
                <input
                  type="password"
                  value={currentPassword}
                  onChange={handleCurrentPasswordChange}
                  required
                  className="edit-profile-page__input"
                />
              </label>
              <label className="edit-profile-page__label">
                New Password:
                <input
                  type="password"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  required
                  className="edit-profile-page__input"
                />
              </label>
              <label className="edit-profile-page__label">
                Confirm New Password:
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={handleConfirmNewPasswordChange}
                  required
                  className="edit-profile-page__input"
                />
              </label>
            </div>
          )}
          <br />
          <div className="edit-profile-page__bottom">
            <button type="submit" className="edit-profile-page__button btn">
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate("/user-profile")}
              className="edit-profile-page__button btn"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
