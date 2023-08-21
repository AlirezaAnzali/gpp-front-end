import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
// import axios from "axios";

import "./WorkoutDetails.scss";

// const baseUrl = "http://localhost:8080";
// const exercisesUrl = `${baseUrl}/exercises`;

function WorkoutDetails() {
  const location = useLocation();
  const workout = location.state ? location.state.workout : null;
  // console.log(workout);

  // Calculate total exercises count across all weeks
  const totalExercisesCount =
    workout.exercises.reduce((total, day) => total + day.exercises.length, 0) *
    workout.weeks; // Multiply by the number of weeks

  // State to keep track of checked exercises
  const [checkedExercises, setCheckedExercises] = useState(new Set());

  // const [exercises, setExercises] = useState([]);

  // useEffect(() => {
  //   const token = sessionStorage.getItem("token");
  //   axios
  //     .get(exercisesUrl, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((response) => {
  //       setExercises(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  // Handler for checkbox change
  function handleCheckboxChange(exerciseId, weekIndex) {
    setCheckedExercises((prevCheckedExercises) => {
      const updatedCheckedExercises = new Set(prevCheckedExercises);

      // Create a unique key for exercise-week combination
      const key = `${exerciseId}-${weekIndex}`;

      if (updatedCheckedExercises.has(key)) {
        updatedCheckedExercises.delete(key);
      } else {
        updatedCheckedExercises.add(key);
      }
      return updatedCheckedExercises;
    });
  }

  // Calculate progress ratio
  const checkedExercisesCount = checkedExercises.size;
  const progressRatio = Math.round(
    (checkedExercisesCount / totalExercisesCount) * 100
  );

  // Render exercise list with checkboxes
  function renderExerciseRow(exercise) {
    return (
      <ul key={exercise.id} className="exercise">
        <li data-label="Exercise" className="exercise__name">
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
              checked={checkedExercises.has(`${exercise.id}-${k}`)}
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
                  max={totalExercisesCount}
                  value={checkedExercisesCount}
                />
                <div className="workout__top__content__top__progress-label">
                  {progressRatio} %
                </div>
              </div>
            </div>
            <div className="workout__top__content__text">
              <p className="workout__top__content__text__goal">
                Your Goal: {workout.goal}
              </p>
              <p className="workout__top__content__text__weight">
                Your Weight: {workout.weight} kg
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="workout__bottom">
        {workout.exercises.map((day, i) => renderDayExercises(day, i))}
      </div>
    </div>
  );
}

export default WorkoutDetails;
