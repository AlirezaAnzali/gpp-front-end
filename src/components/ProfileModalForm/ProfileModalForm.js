import "./ProfileModalForm.scss";
import { useState } from "react";

function ProfileModalForm({ onSubmit }) {
  const [userAge, setUserAge] = useState("");
  const [userGender, setUserGender] = useState("");

  const handleAgeChange = (event) => {
    setUserAge(event.target.value);
  };

  const handleGenderChange = (event) => {
    setUserGender(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ age: userAge, gender: userGender });
  };

  return (
    <div className="modal-form">
      <h2>Choose your age and gender:</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Age:
          <input
            type="number"
            value={userAge}
            onChange={handleAgeChange}
            required
          />
        </label>
        <label>
          Gender:
          <select value={userGender} onChange={handleGenderChange} required>
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary">Non-binary</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ProfileModalForm;
