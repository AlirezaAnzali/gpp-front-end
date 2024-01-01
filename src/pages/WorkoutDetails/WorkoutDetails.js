import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ExerciseModal from "../../components/ExerciseModal/ExerciseModal";
import ExerciseDetail from "../../components/ExerciseDetail/ExerciseDetail";
import ExerciseSelection from "../../components/ExerciseSelection/ExerciseSelection";
import ExerciseConfirmation from "../../components/ExerciseConfirmation/ExerciseConfirmation";
import toast from "react-hot-toast";
import axios from "axios";
import "./WorkoutDetails.scss";
import { BASE_URL } from "../../utils/api-utils";

const baseUrl = BASE_URL;
const exercisesUrl = `${baseUrl}/exercises`;
const workoutsUrl = `${baseUrl}/workouts`;

function WorkoutDetails() {
  const location = useLocation();
  const [workout, setWorkout] = useState(
    location.state ? location.state.workout : null
  );

  const [exercises, setExercises] = useState(null);

  const [exerciseModalIsVisible, setExerciseModalIsVisible] = useState(false);
  const [selectionModalIsVisible, setSelectionModalIsVisible] = useState(false);
  const [confirmationModalIsVisible, setConfirmationModalIsVisible] =
    useState(false);

  const [selectedExercise, setSelectedExercise] = useState(null);
  const [newExercise, setNewExercise] = useState(null);
  const [displayWeightInPounds, setDisplayWeightInPounds] = useState(false);

  function showExerciseModalHandler(exercise) {
    setSelectedExercise(exercise);
    setExerciseModalIsVisible(true);
  }

  function hideExerciseModalHandler() {
    setExerciseModalIsVisible(false);
  }

  function hideSelectionModalHandler(event) {
    setSelectionModalIsVisible(false);
  }

  function hideConfirmationModalHandler(event) {
    setConfirmationModalIsVisible(false);
  }

  function newExerciseSelection (event) {
    setExerciseModalIsVisible(false);
    setSelectionModalIsVisible(true);
  }

  function handleExerciseSelection(newExercise) {
    setSelectionModalIsVisible(false);
    setNewExercise(newExercise);
    setConfirmationModalIsVisible(true);
  }

  function handleExerciseConfirmation(confirmedExercise) {
    setConfirmationModalIsVisible(false);

    axios
      .put(`${workoutsUrl}/${workout.id}/changeAnExercise`, {
        confirmedExercise,
        selectedExercise,
      })
      .then((response) => {
        const updatedWorkout = response.data.workoutPlan;
        setWorkout(updatedWorkout); // Update the component state
        toast.success(response.data.message, {
          style: {
            borderRadius: "10px",
            background: "#4b4b4b",
            color: "#E5E5E5",
          },
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred while updating the workout plan.", {
          style: {
            borderRadius: "10px",
            background: "#4b4b4b",
            color: "#E5E5E5",
          },
        });
      });


    setNewExercise(null);
    setSelectedExercise(null);
  }


  useEffect(() => {
    const token = sessionStorage.getItem("token");
    axios
      .get(exercisesUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setExercises(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Handler for checkbox change
  function handleCheckboxChange(exerciseId, weekIndex) {
    // Send a POST request to update checkedExercises on the server
    axios
      .post(`${workoutsUrl}/${workout.id}/updateCheckedExercises`, {
        exerciseId,
        weekIndex,
        checked: !workout.checkedExercises.includes(
          `${exerciseId}-${weekIndex}`
        ),
      })
      .then((response) => {
        const updatedWorkout = response.data.workoutPlan;
        setWorkout(updatedWorkout); // Update the component state
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Render exercise list with checkboxes
  function renderExerciseRow(exercise) {
    return (
      <ul key={exercise.id} className="exercise">
        <li
          data-label="Exercise"
          className="exercise__name"
          onClick={() => showExerciseModalHandler(exercise)}
        >
          {exercise.name}
        </li>
        <li data-label="Muscle" className="exercise__muscle">
          {exercise.muscles}
        </li>
        <li data-label="Target Muscles" className="exercise__target">
          {exercise.muscleTarget}
        </li>
        <li data-label="Sets X Reps" className="exercise__set">
          {exercise.sets} X {exercise.reps}
        </li>
        {[...Array(workout.weeks)].map((_, k) => (
          <li key={k} className="exercise__check" data-label={`Week ${k + 1}`}>
            <input
              type="checkbox"
              className="exercise__checkbox"
              checked={workout.checkedExercises.includes(`${exercise.id}-${k}`)}
              onChange={() => handleCheckboxChange(exercise.id, k)}
            />
            <label className="exercise__checkbox__label"></label>
          </li>
        ))}
      </ul>
    );
  }

  // Render day sub-header with exercise lists
  function renderDayExercises(day, j) {
    return (
      <div key={day.dayName} className="dayExercises">
        <h2 className="dayExercises__title">{day.dayName}</h2>
        <div className="list">
          <ul className="dayExercises__header">
            <li className="dayExercises__header__name">Exercise</li>
            <li className="dayExercises__header__muscle">Muscle</li>
            <li className="dayExercises__header__target">Target Muscles</li>
            <li className="dayExercises__header__set">Sets X Reps</li>
            {[...Array(workout.weeks)].map((_, i) => (
              <li
                key={i}
                className={`dayExercises__header__checkbox checkbox-${i + 1}`}
              >
                Week {i + 1}
              </li>
            ))}
          </ul>
          {day.exercises.map((exercise) => renderExerciseRow(exercise, j))}
        </div>
      </div>
    );
  }

  // Render component
  return (
    <>
      {exerciseModalIsVisible && (
        <ExerciseModal onClose={hideExerciseModalHandler}>
          <ExerciseDetail
            exercise={selectedExercise}
            onEdit={newExerciseSelection}
          />
        </ExerciseModal>
      )}
      {selectionModalIsVisible && (
        <ExerciseModal onClose={hideSelectionModalHandler}>
          <ExerciseSelection
            exercises={exercises}
            onSelect={handleExerciseSelection}
            selectedExercise={selectedExercise}
            onClose={hideSelectionModalHandler}
          />
        </ExerciseModal>
      )}
      {confirmationModalIsVisible && (
        <ExerciseModal onClose={hideConfirmationModalHandler}>
          <ExerciseConfirmation
            onConfirm={handleExerciseConfirmation}
            onClose={hideConfirmationModalHandler}
            newExercise={newExercise}
          />
        </ExerciseModal>
      )}
      <div className="workout">
        <div className="workout__top">
          <div className="workout__top__image">
            <div className="workout__top__content">
              <div className="workout__top__content__top">
                <div className="workout__top__content__top__title">
                  <h1 className="workout__top__content__top__title__text">
                    {workout.planName}
                  </h1>
                </div>
                <div className="workout__top__content__top__progress">
                  <label
                    className="workout__top__content__top__progress-title"
                    htmlFor="progress"
                  >
                    Progress:
                  </label>
                  <progress
                    className="workout__top__content__top__progress-bar"
                    id="progress"
                    max={workout.allExercises.length * workout.weeks}
                    value={workout.checkedExercises.length}
                  />
                  <div className="workout__top__content__top__progress-label">
                    {workout.progress} %
                  </div>
                </div>
              </div>
              <div className="workout__top__content__text">
                <p className="workout__top__content__text__goal">
                  Your Goal: {workout.goal}
                </p>
                <div className="workout__top__content__text__weight">
                  <span className="workout__top__content__text__weight__label">
                    Your Weight:
                  </span>
                  <span className="workout__top__content__text__weight__value">
                    {displayWeightInPounds
                      ? ` ${(workout.weight * 2.20462).toFixed(2)} `
                      : ` ${workout.weight} `}
                  </span>
                  <select
                    id="weight-unit-dropdown"
                    value={displayWeightInPounds ? "lb" : "kg"}
                    onChange={(e) =>
                      setDisplayWeightInPounds(e.target.value === "lb")
                    }
                  >
                    <option value="kg">Kilograms (kg)</option>
                    <option value="lb">Pounds (lb)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="workout__bottom">
          {workout.exercises.map((day, i) => renderDayExercises(day, i))}
        </div>
      </div>
    </>
  );
}

export default WorkoutDetails;
