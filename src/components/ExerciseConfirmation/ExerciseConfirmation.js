import { useState } from "react";
import toast from "react-hot-toast";
import "./ExerciseConfirmation.scss";

function ExerciseConfirmation({ onConfirm, onClose, newExercise }) {
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");


  const handleSetsChange = (event) => {
    const value = event.target.value;
    setSets(value);
  };

  const handleRepsChange = (event) => {
    const value = event.target.value;
    setReps(value);
  };

  const handleConfirm = () => {
    // Validate sets and reps
    const setsValue = parseInt(sets, 10);
    const repsValue = parseInt(reps, 10);

    if (isNaN(setsValue) || isNaN(repsValue)) {
      toast("Sets and Reps should be numbers", {
        icon: "⚠️",
        style: {
          borderRadius: "10px",
          background: "#4b4b4b",
          color: "#E5E5E5",
        },
      });
      return;
    }

    if (setsValue < 1 || setsValue > 6 || repsValue < 4 || repsValue > 20) {
      toast("Sets should be between 1 and 6, and reps between 4 and 20.", {
        icon: "⚠️",
        style: {
          borderRadius: "10px",
          background: "#4b4b4b",
          color: "#E5E5E5",
        },
      });
      return;
    }

    // Send the confirmed exercise details to the parent component
    onConfirm({
      ...newExercise,
      sets: sets,
      reps: reps,
    });
  };

  return (
    <div className="exercise-confirmation">
      <h2>Confirm New Exercise</h2>
      <div className="confirmation-content">
        <p>
          <strong>Exercise:</strong> {newExercise.name}
        </p>
        <p>
          <strong>Description:</strong> {newExercise.description}
        </p>
        <h3>
          <strong>How Many Sets and Reps?</strong>
        </h3>
        <div className="input-container">
          <label htmlFor="sets">Sets:</label>
          <input
            type="text" // Allow any input
            id="sets"
            value={sets}
            onChange={handleSetsChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="reps">Reps:</label>
          <input
            type="text" // Allow any input
            id="reps"
            value={reps}
            onChange={handleRepsChange}
          />
        </div>
      </div>
      <div className="button-container">
        <button className="btn" onClick={handleConfirm}>
          Confirm
        </button>
        <button className="btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ExerciseConfirmation;
