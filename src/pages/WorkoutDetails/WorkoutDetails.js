import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
// import axios from "axios";

import "./WorkoutDetails.scss";

// const baseUrl = "http://localhost:8080";
// const exercisesUrl = `${baseUrl}/exercises`;

function WorkoutDetails() {
  const location = useLocation();
  const workout = location.state ? location.state.workout : null;
  console.log(workout);
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

  const [checkedExercises, setCheckedExercises] = useState([]);

  // Helper function to handle exercise completion
  function handleExerciseCompletion(exerciseId, weekIndex) {
    const updatedCheckedExercises = [...checkedExercises];
    if (updatedCheckedExercises[weekIndex]) {
      updatedCheckedExercises[weekIndex][exerciseId] =
        !updatedCheckedExercises[weekIndex][exerciseId];
    } else {
      updatedCheckedExercises[weekIndex] = { [exerciseId]: true };
    }
    setCheckedExercises(updatedCheckedExercises);
  }

  // Render exercise row with checkboxes
  function renderExerciseRow(exercise, weekIndex) {
    const exerciseId = exercise.id;
    const isChecked =
      checkedExercises[weekIndex] && checkedExercises[weekIndex][exerciseId];
    return (
      <tr key={exerciseId} className="exerciseRow">
        <td className="exerciseRow__name">{exercise.name}</td>
        <td className="exerciseRow__muscles">{exercise.muscles}</td>
        <td className="exerciseRow__muscleTarget">{exercise.muscleTarget}</td>
        <td className="exerciseRow__setsReps">
          {exercise.sets} X {exercise.reps}
        </td>
        {[...Array(workout.weeks)].map((_, i) => (
          <td key={i} className="exerciseRow__checkbox">
            <input
              type="checkbox"
              checked={isChecked && checkedExercises[i][exerciseId]}
              onChange={() => handleExerciseCompletion(exerciseId, i)}
              className="exerciseRow__checkboxInput"
            />
            <label className="exerciseRow__checkboxLabel"></label>
          </td>
        ))}
      </tr>
    );
  }

  // Render day sub-header with exercise table
  function renderDayExercises(day, i) {
    return (
      <div key={day.dayName} className="dayExercises">
        <h2 className="dayExercises__header">{day.dayName}</h2>
        <table className="dayExercises__table">
          <thead>
            <tr className="dayExercises__tableHead">
              <th className="dayExercises__tableHeader">Exercise</th>
              <th className="dayExercises__tableHeader">Muscles</th>
              <th className="dayExercises__tableHeader">Muscle Target</th>
              <th className="dayExercises__tableHeader">Sets X Reps</th>
              {[...Array(workout.weeks)].map((_, i) => (
                <th key={i} className="dayExercises__tableHeader">
                  Week {i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {day.exercises.map((exercise) => renderExerciseRow(exercise, i))}
          </tbody>
        </table>
      </div>
    );
  }

  // Calculate progress ratio
const allExercises = workout.exercises.flatMap((day) => day.exercises);
const totalExercisesCount = allExercises.length * workout.weeks;
const checkedExercisesCount = checkedExercises.reduce(
  (acc, curr) => acc + Object.keys(curr || {}).length,
  0
);
const progressRatio = checkedExercisesCount / totalExercisesCount || 0;

  // Render component
  return (
    <div className="workout">
      <h1 className="workout__title">{workout.planName}</h1>
      <p className="workout__goal">Your Goal: {workout.goal}</p>
      <p className="workout__weight">Your Weight: {workout.weight}</p>
      <label htmlFor="progress">Progress:</label>
      <progress
        id="progress"
        max={totalExercisesCount}
        value={checkedExercisesCount}
      />
      <div className="progress-label">{Math.round(progressRatio * 100)}%</div>
      {workout.exercises.map((day, i) => renderDayExercises(day, i))}
    </div>
  );
}

export default WorkoutDetails;
