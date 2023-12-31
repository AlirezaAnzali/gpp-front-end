import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgressbar } from "react-circular-progressbar";
import toast from "react-hot-toast";
import WorkoutDelete from "../WorkoutDelete/WorkoutDelete";
import ExerciseModal from "../ExerciseModal/ExerciseModal";
import "./WorkoutPlans.scss";
import { BASE_URL } from "../../utils/api-utils";

const baseUrl = BASE_URL;

function WorkoutPlans({ userInfo }) {
  const workoutsUrl = `${baseUrl}/plans`;
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState([]);
  const [deleteModalIsVisible, setDeleteModalIsVisible] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);


  function showDeleteModalHandler(workout) {
    setDeleteModalIsVisible(true);
    setSelectedWorkout(workout);
  }

  function hideDeleteModalHandler() {
    setDeleteModalIsVisible(false);
  }

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    axios
      .get(workoutsUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setWorkouts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [workoutsUrl]);

  const handleDeleteButtonClick = (workout) => {
    return (e) => {
      e.stopPropagation();
      showDeleteModalHandler(workout);
    };
  };

  const onDeleteWorkout = (selectedWorkout) => {
    const token = sessionStorage.getItem("token");

    axios
      .delete(`${workoutsUrl}/${selectedWorkout.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const updatedWorkouts = response.data.workouts;
        setWorkouts(updatedWorkouts);
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
        toast.error("An error occurred while deleting workout.", {
          style: {
            borderRadius: "10px",
            background: "#4b4b4b",
            color: "#E5E5E5",
          },
        });
      });
    hideDeleteModalHandler();
    setSelectedWorkout(null);
  };

  const renderWorkouts = () => {
    if (workouts.length === 0) {
      return (
        <div className="no-workouts">
          You have no workout plan yet {userInfo.name}. Get your first workout
          plan today!
        </div>
      );
    } else {
      return (
        <>
          <h2 className="workout-plans__title">Your Workout Plans</h2>
          <ul className="workout-plans-list">
            {workouts.map((workout) => {
              const startDate = new Date(
                workout.timestamp
              ).toLocaleDateString();
              // const endDate = new Date(
              //   workout.timestamp + workout.weeks * 7 * 24 * 60 * 60 * 1000
              // ).toLocaleDateString();
              return (
                <li
                  onClick={() => onGotoWorkoutPlan(workout)}
                  className="workout-plans-item"
                  key={workout.id}
                >
                  {deleteModalIsVisible && (
                    <ExerciseModal onClose={hideDeleteModalHandler}>
                      <WorkoutDelete
                        workout={selectedWorkout}
                        onDelete={onDeleteWorkout}
                        onClose={hideDeleteModalHandler}
                      />
                    </ExerciseModal>
                  )}
                  <div className="workout-info">
                    <div className="workout-name">{workout.planName}</div>
                    <div className="workout-goal">
                      <span>Goal</span>
                      <br />
                      {workout.goal}
                    </div>
                    <br />
                    <div className="workout-date">
                      <span>Start Date</span>
                      <br />
                      {startDate}
                    </div>
                    <div className="workout-progress">
                      <CircularProgressbar
                        value={workout.progress}
                        text={`${workout.progress}%`}
                      />
                    </div>
                    <div className="workout-delete-div">
                      <button
                        className="workout-delete-div-button"
                        onClick={handleDeleteButtonClick(workout)}
                      >
                        <svg
                          className="workout-delete-div-button-img"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z"
                            fill="#4b4b4b"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      );
    }
  };

  const onGotoWorkoutPlan = (workout) => {
    if (!deleteModalIsVisible) {
      navigate("/workout-plan", {
        state: {
          id: userInfo.id,
          name: userInfo.name,
          workout: workout,
        },
      });
    }
  };

  return <div className="workout-plans-container">{renderWorkouts()}</div>;
}

export default WorkoutPlans;
