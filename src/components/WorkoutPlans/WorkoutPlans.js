import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./WorkoutPlans.scss";

function WorkoutPlans({ userInfo }) {
  const baseUrl = "http://localhost:8080";
  const workoutsUrl = `${baseUrl}/plans`;
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState([]);

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
  }, []);

  const renderWorkouts = () => {
    if (workouts.length === 0) {
      return (
        <div className="no-workouts">
          You have no workout plan yet. Get your first workout plan today,{" "}
          {userInfo.name}!
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
              const endDate = new Date(
                workout.timestamp + workout.weeks * 7 * 24 * 60 * 60 * 1000
              ).toLocaleDateString();
              return (
                <li
                  onClick={() => onGotoWorkoutPlan(workout)}
                  className="workout-plans-item"
                  key={workout.id}
                >
                  <div className="workout-info">
                    <div className="workout-name">{workout.planName}</div>
                    <div className="workout-goal">
                      Your goal:
                      <br />
                      {workout.goal}
                    </div>
                    <br />
                    <div className="workout-date">
                      Date:
                      <br />
                      {startDate} - {endDate}
                    </div>
                  </div>
                  <div className="workout-view">
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
    navigate("/workout-plan", {
      state: {
        id: userInfo.id,
        name: userInfo.name,
        workout: workout,
      },
    });
  };

  return <div className="workout-plans-container">{renderWorkouts()}</div>;
}

export default WorkoutPlans;