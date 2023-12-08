import "./ExerciseSelection.scss";
import { useState } from "react";

function ExerciseSelection({
  exercises,
  onSelect,
  selectedExercise
}) {
  // Filter exercises based on the selected exercise's muscles property
  const filteredExercises = exercises.filter(
    (exercise) =>
      exercise.muscles === selectedExercise.muscles &&
      exercise.id !== selectedExercise.id
  );

  const [selectedId, setSelectedId] = useState(selectedExercise.id);

  const handleRadioChange = (event) => {
    setSelectedId(event.target.value);
  };

  const handleSelectClick = () => {
    const newExercise = exercises.find((exercise) => exercise.id === selectedId);
    onSelect(newExercise);
  };

  return (
    <div className="exercise-selection">
      <h2>Select Another Exercise</h2>
      <form>
        {filteredExercises.map((exercise) => (
          <div key={exercise.id}>
            <input
              type="radio"
              id={exercise.id}
              name="selectedExercise"
              value={exercise.id}
              onChange={handleRadioChange}
              checked={selectedId === exercise.id}
            />
            <label htmlFor={exercise.id}>{exercise.name}</label>
          </div>
        ))}
        <div className="button-container">
          <button className="btn" type="button" onClick={handleSelectClick}>
            Select
          </button>
        </div>
      </form>
    </div>
  );
}

export default ExerciseSelection;
