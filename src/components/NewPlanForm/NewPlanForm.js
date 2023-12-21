import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./NewPlanForm.scss";
import axios from "axios";

const baseUrl = "http://localhost:8080";
const workoutUrl = `${baseUrl}/workouts`;

function NewPlanForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [planName, setPlanName] = useState("");
  const [goal, setGoal] = useState("");
  const [muscleFocus, setMuscleFocus] = useState("");
  const [workoutDays, setWorkoutDays] = useState("");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const navigate = useNavigate();
  const location = useLocation();

  const handlePlanNameChange = (e) => {
    setPlanName(e.target.value);
  };

  const handleGoalChange = (e) => {
    setGoal(e.target.value);
  };

  const handleMuscleGroupChange = (e) => {
    setMuscleFocus(e.target.value);
  };

  const handleWorkoutDaysChange = (e) => {
    setWorkoutDays(e.target.value);
  };
  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const isFormValid = () => {
    // Basic form validation logic
    return (
      planName.trim() !== "" &&
      goal.trim() !== "" &&
      (goal !== "gain-muscle" || muscleFocus.trim() !== "") &&
      workoutDays >= 3 &&
      workoutDays <= 5 &&
      weight >= 40
    );
  };

  const userId = location.state.id;
  const userName = location.state.name;

  const handleSubmit = (e) => {
    const weightInKg = weightUnit === "lb" ? weight / 2.20462 : weight;
    e.preventDefault();
    if (!isFormValid()) {
      alert(
        "Please fill in all required fields and ensure values are within the specified ranges."
      );
      return;
    }
    const token = sessionStorage.getItem("token");
    axios
      .post(
        workoutUrl,
        {
          userId,
          planName,
          goal,
          muscleFocus,
          workoutDays,
          weight: weightInKg,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setIsLoading(false);
        if (!error) {
          try {
            navigate("/user-profile");
            alert("Your workout plan created successfully!");
          } catch (e) {
            console.error(e);
          }
        }
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        setError(error.message);
      });
  };


  return (
    <div className="new-plan-form">
      <h1 className="new-plan-form__title">
        Let's create a new workout plan that's tailored to you, {userName}
      </h1>
      <form onSubmit={handleSubmit} className="new-plan-form__form">
        <div className="new-plan-form__field">
          <label htmlFor="plan-name" className="new-plan-form__label">
            What name would you like to give your new workout program?
          </label>
          <input
            type="text"
            id="plan-name"
            value={planName}
            onChange={handlePlanNameChange}
            className="new-plan-form__input"
            required
          />
        </div>
        <div className="new-plan-form__field">
          <label className="new-plan-form__label">
            Choose your weight unit:
          </label>
          <label className="new-plan-form__label">
            <input
              type="radio"
              value="kg"
              checked={weightUnit === "kg"}
              onChange={() => setWeightUnit("kg")}
            />
            Kilograms (kg)
          </label>
          <label className="new-plan-form__label">
            <input
              type="radio"
              value="lb"
              checked={weightUnit === "lb"}
              onChange={() => setWeightUnit("lb")}
            />
            Pounds (lb)
          </label>
        </div>
        <div className="new-plan-form__field">
          <label htmlFor="weight" className="new-plan-form__label">
            Enter your weight ({weightUnit}):
          </label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={handleWeightChange}
            className="new-plan-form__input"
            min="40"
          />
        </div>
        <div className="new-plan-form__field">
          <label htmlFor="goal" className="new-plan-form__label">
            Take a look at our list of fitness goals and select the one that
            resonates with you.
          </label>
          <select
            id="goal"
            value={goal}
            onChange={handleGoalChange}
            className="new-plan-form__select"
            required
          >
            <option value="">
              Choose a goal that aligns with your fitness aspirations.
            </option>
            <option value="weight-loss">Weight Loss</option>
            <option value="gain-muscle">Gain Muscle</option>
            <option value="cardio-fitness">Cardiovascular Fitness</option>
          </select>
        </div>
        {goal === "gain-muscle" && (
          <div className="new-plan-form__field">
            <label htmlFor="muscle-group" className="new-plan-form__label">
              Muscle Group
            </label>
            <select
              id="muscle-group"
              value={muscleFocus}
              onChange={handleMuscleGroupChange}
              className="new-plan-form__select"
            >
              <option value="">Select a muscle group</option>
              <option value="Chest">Chest</option>
              <option value="Leg">Leg</option>
              <option value="Back">Back</option>
              <option value="Abs">Abs</option>
              <option value="Bicep">Bicep</option>
              <option value="Tricep">Tricep</option>
              <option value="Shoulder">Shoulder</option>
              <option value="Forearm">Forearm</option>
            </select>
          </div>
        )}
        <div className="new-plan-form__field">
          <label htmlFor="workout-days" className="new-plan-form__label">
            How many times a week would you like to work out? Let us know so we
            can design a plan that fits your schedule. (3 to 5)
          </label>
          <input
            type="number"
            id="workout-days"
            value={workoutDays}
            onChange={handleWorkoutDaysChange}
            className="new-plan-form__input"
            min="3"
            max="5"
          />
        </div>
        <button type="submit" className="new-plan-form__submit-button">
          Create your plan and start your fitness journey here!
        </button>
        <p className="last-sentence">
          Once created, you can view your customized plan in your profile.
        </p>
      </form>
    </div>
  );
}

export default NewPlanForm;

