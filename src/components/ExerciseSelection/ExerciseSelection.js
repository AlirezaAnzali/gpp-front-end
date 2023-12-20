import "./ExerciseSelection.scss";
import { useState } from "react";

function ExerciseSelection({
  exercises,
  onSelect,
  selectedExercise
}) {
  const [validationError, setValidationError] = useState(null); // State for validation error
  // Filter exercises based on the selected exercise's muscles property
  const filteredExercises = exercises.filter(
    (exercise) =>
      exercise.muscles === selectedExercise.muscles &&
      exercise.id !== selectedExercise.id
  );

  const [selectedId, setSelectedId] = useState(null);

  const handleRadioChange = (event) => {
    setSelectedId(event.target.value);
  };

  const handleSelectClick = () => {
    if (!selectedId) {
      setValidationError("Please select an exercise before clicking 'Select'.");
      return;
    }

    // Reset validation error
    setValidationError(null);

    const newExercise = exercises.find((exercise) => exercise.id === selectedId);
    onSelect(newExercise);
  };

  return (
    <div className="exercise-selection">
      <h2>Select Another {selectedExercise.muscles} Exercise</h2>
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
          {validationError && (
            <p className="validation-error">{validationError}</p>
          )}
          <button className="btn" type="button" onClick={handleSelectClick}>
            Select
          </button>
        </div>
      </form>
    </div>
  );
}

export default ExerciseSelection;
