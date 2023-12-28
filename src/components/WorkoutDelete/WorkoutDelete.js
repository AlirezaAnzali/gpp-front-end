import "./WorkoutDelete.scss";

function WorkoutDelete({ workout, onDelete, onClose }) {
  const { planName, goal, timestamp, progress } = workout;

  return (
    <div className="workout-delete">
      <div className="workout-delete-clarification">
        <h3 className="workout-delete-clarification-header">
          Are you sure you want to delete <span>"{planName}"</span> from your
          profile?
        </h3>
        <p className="workout-delete-clarification-text">
          You started this plan on {new Date(timestamp).toLocaleDateString()}{" "}
          with a goal of "{goal}". Currently, you have made {progress}%
          progress. Clicking the "Delete" button will permanently remove it, and
          you won't be able to recover it.
        </p>
      </div>
      <div className="workout-delete-button-container">
        <button className="btn delete-btn" onClick={() => onDelete(workout)}>
          Delete
        </button>
        <button className="btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default WorkoutDelete;
