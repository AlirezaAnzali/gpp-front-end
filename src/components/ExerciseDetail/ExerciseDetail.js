import "./ExerciseDetail.scss";

function ExerciseDetail ({ exercise, onEdit }){
    const { name, description, muscles, muscleTarget } = exercise;

    return (
      <div className="exercise-detail">
        <div className="exercise-detail-header">
          <h2>{name}</h2>
        </div>
        <div className="exercise-detail-content">
          <p>
            <strong>Description:</strong> {description}
          </p>
          <p>
            <strong>Major Muscle:</strong> {muscles}
          </p>
          <p>
            <strong>Muscle Target:</strong> {muscleTarget}
          </p>
        </div>
        <div className="button-container">
          <button className="btn edit-btn" onClick={onEdit}>
            Edit
          </button>
        </div>
      </div>
    );
}

export default ExerciseDetail;