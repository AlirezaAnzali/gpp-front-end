import { useNavigate } from "react-router-dom";
import "./NewPlan.scss";

function NewPlan({ userInfo }) {
  const navigate = useNavigate();
  const onGetANewWorkout = () => {
    navigate("/new-plan", {
      state: {
        id: userInfo.id,
        name: userInfo.name,
      },
    });
  };


  return (
    <div className="new-plan-container">
      <button onClick={onGetANewWorkout} className="generate-plan-btn">
        <div class="button-text">
          <svg
            stroke="currentColor"
            fill="none"
            stroke-width="1.5"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-3 w-3"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline points="1 4 1 10 7 10"></polyline>
            <polyline points="23 20 23 14 17 14"></polyline>
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
          </svg>
          Generate New Workout Plan
        </div>
      </button>
    </div>
  );
}

export default NewPlan;
