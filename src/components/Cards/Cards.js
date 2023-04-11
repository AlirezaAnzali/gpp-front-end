import "./Cards.scss";
import Card from "../Card/Card"
import svg1 from "../../assets/images/Customizable.svg"
import svg2 from "../../assets/images/Progress.svg"
import svg3 from "../../assets/images/Personal.svg"
import svg4 from "../../assets/images/Varied.svg"

const Cards = () => {
    const data = [
      {
        image: svg1,
        title: "Customizable Workouts",
        text: "Plan, schedule, and track workouts in one place. Achieve fitness goals faster with our customizable workouts.",
      },
      {
        image: svg2,
        title: "Progress Tracking",
        text: "Track progress, stay motivated, and achieve fitness goals. Log workouts and see how far you've come.",
      },
      {
        image: svg3,
        title: "Personalized Recommendations",
        text: "Get personalized recommendations based on fitness level, goals, and preferences. Stay engaged and achieve goals faster.",
      },
      {
        image: svg4,
        title: "Varied Workout Options",
        text: "Get a variety of workouts, including strength training, cardio, yoga, and more. Stay engaged, challenged, and prevent workout plateaus.",
      },
    ];
  return (
    <div className="cards">
      {data.map((item, index) => (
        <Card key={index} item={item} />
      ))}
    </div>
  );
};

export default Cards;
